const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Product, Image, Favorite, Review, User } = require('../../db/models');
const { multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3');
const router = express.Router();


//get all favorites of specified product
router.get('/:productId/favorites', async (req, res, next) => {
    const { productId } = req.params;

    const product = await Product.findByPk(productId, {
        include: [
            {
                model: Favorite,
                include: [{ model: User, attributes: ['id', 'username', 'profileImage'] }]
            }
        ]
    });
    if (product) {
        const favorites = product.Favorites;
        res.json({ Favorites: favorites })
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//create a favorite on specified product
router.post('/:productId/favorites', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;

    const product = await Product.findByPk(productId, {
        include: [
            {
                model: Favorite, attributes: ['userId']
            }
        ]
    });

    if (product) {
        const favorites = product.dataValues.Favorites
        // check to see if the current user has already favorited
        const userFavorited = favorites.some(fav => fav.dataValues.userId === user.id)
        if (userFavorited) {
            const err = new Error("Cannot favorite again");
            err.status = 409;
            err.title = "Cannot favorite again";
            return next(err)
        } else {
            const newFavorite = await Favorite.create({
                userId: user.id,
                productId: +productId
            });
                res.json(newFavorite);
        }
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//delete a favorite on specified product
router.delete('/:productId/favorites', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;

    const favorite = await Favorite.findOne({
        where: {
            productId: productId,
            userId: user.id
        }
    });

    if (favorite) {
        const deletedFav = favorite;
        await favorite.destroy();
            res.json({
                deletedFav: deletedFav,
                message: 'Successfully deleted',
                statusCode: 200
            })
    } else {
        const err = new Error("Favorite couldn't be found");
        err.status = 404;
        err.title = "Favorite couldn't be found";
        return next(err);
    }
});

//get specified product's images
router.get('/:productId/images', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId, {
        include: Image
    });
    if (product) {
        const images = product.Images
        res.json(images);
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//create/upload an image to a product
router.post('/:productId/images', requireAuth, multipleMulterUpload("urls"), async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;
    let { urls } = req.body;
    if (req.files) urls = await multiplePublicFileUpload(req.files);


    const product = await Product.findByPk(productId)

    if (product) {
        if (product.userId === user.id) {
            urls.forEach(async (url) => {
                await Image.create({
                    url,
                    userId: user.id,
                    productId: +productId
                })
            })
            const newImages = await Product.findByPk(productId, {
                include: Image
            })
            res.status(201);
            res.json(newImages);
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//delete an image of a product by image id
router.delete('/images/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req;

    const image = await Image.findByPk(imageId);

    if (image) {
        if (image.userId === user.id) {
            await image.destroy();
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Image couldn't be found");
        err.status = 404;
        err.title = "Image couldn't be found";
        return next(err);
    }
});

//get product by categoryId
router.get('/category/:categoryId', requireAuth, async (req, res, next) => {
    const { categoryId } = req.params;
    const product = await Product.findAll({
        where: {categoryId: categoryId, sold: false},
        include: [
            { model: Image, attributes: ['id', 'url'] },
            {
                model: User, as: 'Seller',
                attributes: ['id', 'username', 'profileImage'],
            }
        ]
    });

    if (product) {
        const reviews = await Review.findAndCountAll({
            where: {sellerId: product.userId}
        })
        const products = await Product.findAndCountAll({
            where: {userId: product.userId, sold: false}
        })
        product.dataValues.Seller.dataValues.reviewCount = reviews.count
        product.dataValues.Seller.dataValues.productCount = products.count
        res.json(product);
    } else {
        const err = new Error("Category couldn't be found");
        err.status = 404;
        err.title = "Category couldn't be found";
        return next(err);
    }
});

//get specified product
router.get('/:productId', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId, {
        include: [
            { model: Image, attributes: ['id', 'url'] },
            {
                model: User, as: 'Seller',
                attributes: ['id', 'username', 'profileImage'],
                // include: [
                //     {model: Review, attributes: ['id', 'body', 'stars']},
                //     {model: Product, attributes: ['id', 'name', 'price']}
                // ]
            }
        ]
    });

    if (product) {
        // find and attach all reviews and unsold products associated with the Seller
        const reviews = await Review.findAndCountAll({
            where: {sellerId: product.userId}
        })
        const products = await Product.findAndCountAll({
            where: {userId: product.userId, sold: false}
        })
        product.dataValues.Seller.dataValues.reviewCount = reviews.count
        product.dataValues.Seller.dataValues.productCount = products.count
        res.json(product);
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//edit product
router.put('/:productId', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;
    let { name, description, size, price, categoryId } = req.body;

    const product = await Product.findByPk(productId, {
        include: {model: Image, attributes: ['id', 'url']}
    });

    if (product) {
        if (product.userId === user.id) {
            product.update({ name, description, size, price, categoryId });
            res.json(product)
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

//delete specified product
router.delete('/:productId', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;

    const product = await Product.findByPk(productId);

    if (product) {
        if (product.userId === user.id) {
            await product.destroy();
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
})

//create/list a product
router.post('/', requireAuth, async (req, res, next) => {
    const { user } = req;
    let { name, description, size, price, categoryId } = req.body;

    const newProduct = await Product.create({
        userId: user.id,
        name,
        description,
        size,
        price,
        categoryId
    })
    // const newProductWithImages = Product.findByPk(newProduct.id, {include: [{model: Image, attributes: ['id', 'url']}]})
    res.status(201);
    res.json(newProduct);
});


//get all products
router.get('/', requireAuth, async (req, res, next) => {
    const products = await Product.findAll({
        include: [
            {
                model: Image, attributes: ['id', 'url']
                // include: [{ model: Image, attributes: ['id', 'url'] }]
            }
        ]
    });
        res.json(products)
});

module.exports = router;
