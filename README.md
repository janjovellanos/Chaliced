# Chaliced (Grailed)

**Chaliced** is an e-commerce web application for connecting, selling and buying to designer clothing. Chaliced was inspired by Grailed.

**Login, Explore, and Shop now at [chaliced.com](deployment-link)**

***or***

**Run Locally:**</br>
You will need a *.env* file with contents:
* PORT
* DB_FILE
* JWT_SECRET
* JWT_EXPIRES_IN
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

You can obtain the last two &uarr; when you create your own *[AWS](https://aws.amazon.com/) S3 Bucket*


### Home:
<img width="800" alt="login" src="https://github.com/janjovellanos/Chaliced/blob/main/docs/images/chaliced-home.png">

### Shop:
<img width="800" alt="login" src="https://github.com/janjovellanos/Chaliced/blob/main/docs/images/chaliced-shop.gif">

### Sell:
<img width="800" alt="login" src="https://github.com/janjovellanos/Chaliced/blob/main/docs/images/chaliced-sell.png">

### Profile:
<img width="800" alt="login" src="https://github.com/janjovellanos/Chaliced/blob/main/docs/images/chaliced-profile.gif">

### Technologies:
* Express.js
* Node.js
* Csurf.js
* BCrypt.js
* React/Redux
* Sequelize
* AWS S3
* SQLite3 (Development)
* Postgres (Production)

### Features:
* Signup, login, logout, and demo login
* Create, read, update, and delete products
* Create, read, update, and delete reviews
* Create, read, and delete favorited items
* Create and read orders
* Upload image files for products
* Default basic image provided if not presented
* Search for specified apparrel

### Technical Implementation Details:
Chaliced allows specified user manipulation on content by watching the current user and matching their identifier with that of a particular entity's -
```
    if (product?.userId === user?.id) {
        productEditBtns = (
            <>
                <EditProductFormModal />
                <button onClick={() => handleDeleteBtn(productId)}>Delete</button>
            </>
        );
    }
```

### To-Do:
* [ ] Follows
* [ ] Tracking
* [ ] Payment
* [ ] Filter Clothing (Gender, Shirt, Jacket, Pants, Skirts, ...)

[Original Design Docs](https://github.com/janjovellanos/Chaliced/blob/main/docs/README.md)
