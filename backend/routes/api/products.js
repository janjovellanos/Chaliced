const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Product, Image, Favorite, Review, User } = require('../../db/models');

const router = express.Router();

//get specified product
router.get('/:productId', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId, {
        include: [
            { model: Image, attributes: ['id', 'url'] },
            { model: User, as: 'Seller', attributes: ['id', 'username', 'profileImage'] }
        ]
    });

    if (product) {
        res.json(product);
    } else {
        const err = new Error("Product couldn't be found");
        err.status = 404;
        err.title = "Product couldn't be found";
        return next(err);
    }
});

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
        res.json({products})
});

//get all favorites of specified product
// router.get('/:productId/favorites', async (req, res, next) => {
    // const { songId } = req.params;

    // const song = await Song.findByPk(songId, {
    //     include: [
    //         {
    //             model: Comment,
    //             include: [{ model: User, attributes: ['id', 'username'] }]
    //         }
    //     ]
    // });
    // if (song) {
    //     const comments = song.Comments;
    //     res.json({ Comments: comments })
    // } else {
    //     const err = new Error("Song couldn't be found");
    //     err.status = 404;
    //     err.title = "Song couldn't be found";
    //     return next(err);
    // }
// });

//create a favorite on specified product
// router.post('/:productId/favorites', async (req, res, next) => {
    // const { songId } = req.params;
    // const { body } = req.body;
    // const { user } = req;

    // const song = await Song.findByPk(songId);

    // if (song) {
    //     const newComment = await Comment.create({
    //         userId: user.id,
    //         songId,
    //         body
    //     });
    //     res.json(newComment);
    // } else {
    //     const err = new Error("Song couldn't be found");
    //     err.status = 404;
    //     err.title = "Song couldn't be found";
    //     return next(err);
    // }
// })

//create/list a product
// router.post('/', requireAuth, async (req, res, next) => {
    // const { user } = req;
    // let { title, description, albumId, imageUrl, audioUrl } = req.body;

    // if (req.files.imageUrl) {
    //     imageUrl = await singlePublicFileUpload(req.files.imageUrl[0]);
    // }
    // if (req.files.audioUrl) {
    //     audioUrl = await singlePublicFileUpload(req.files.audioUrl[0]);
    // }

    // const newSong = await Song.create({
    //     userId: user.id,
    //     title,
    //     description,
    //     audioUrl,
    //     imageUrl,
    //     albumId
    // })
    // res.status(201);
    // res.json(newSong);
// });

//edit song
// router.put('/:productId', requireAuth, async (req, res, next) => {
    // const { songId } = req.params;
    // const { user } = req;
    // let { title, description, audioUrl, imageUrl } = req.body

    // if (req.files.imageUrl) {
    //     imageUrl = await singlePublicFileUpload(req.files.imageUrl[0]);
    // }
    // if (req.files.audioUrl) {
    //     audioUrl = await singlePublicFileUpload(req.files.audioUrl[0]);
    // }

    // const song = await Song.findByPk(songId);

    // if (song) {
    //     if (song.userId === user.id) {
    //         song.update({ title, description, audioUrl, imageUrl });
    //         res.json(song)
    //     } else {
    //         const err = new Error('Not Authorized');
    //         err.status = 403;
    //         err.title = 'Not Authorized';
    //         return next(err);
    //     }
    // } else {
    //     const err = new Error("Song couldn't be found");
    //     err.status = 404;
    //     err.title = "Song couldn't be found";
    //     return next(err);
    // }
// });

//delete specified song
// router.delete('/:productId', requireAuth, async (req, res, next) => {
    // const { songId } = req.params;
    // const { user } = req;

    // const song = await Song.findByPk(songId);

    // if (song) {
    //     if (song.userId === user.id) {
    //         await song.destroy();
    //         res.json({
    //             message: 'Successfully deleted',
    //             statusCode: 200
    //         })
    //     } else {
    //         const err = new Error('Not Authorized');
    //         err.status = 403;
    //         err.title = 'Not Authorized';
    //         return next(err);
    //     }
    // } else {
    //     const err = new Error("Song couldn't be found");
    //     err.status = 404;
    //     err.title = "Song couldn't be found";
    //     return next(err);
    // }
// })

module.exports = router;
