## Minimum Viable Product

**Chaliced** is a web application inspired by Grailed and was built using Express & React.

Chaliced gives users the ability to:

* Create an account & upload a profile image
* Log in and log out
* Test the application as a guest user
* List items they want to sell & upload product images
* Shop items to buy from other sellers
* Add items they want to their Favorites (Wishlist)
* As a buyer, leave reviews on a product for the seller
* Create, read, update, and delete products
* Create, read, update, and delete reviews

## DB Schema
<img width="718" alt="schema" src="https://github.com/janjovellanos/Chaliced/blob/main/docs/images/db-schema.png">

## Implementation Timeline

### Phase 1: DB Schema & Sequelize Setup (1 day)

I will start by exploring possible database schemas using [Dbdiagram.io](https://www.dbdiagram.io/). 
Once a final draft has been decided, I will implement said schema and create the models & migrations, 
as well as the seed data appropriate for this application.

### Phase 2: Backend Setup for User Authorization and API Routes (3 days)

In this phase, I will create all routes needed for the features I will implement and 
require user authorization in routes which should only pertain to the logged in user by making use of
[JWT](https://jwt.io/introduction)'s. I will also handle any validation errors within a POST or PUT requests
using Express' [validator](https://express-validator.github.io/docs/).

[*API Routes*](https://github.com/janjovellanos/Chaliced/blob/main/backend/README.md)

### Phase 3: Frontend Authentication and Setup  (2 days)

Next I will begin setting up a React frontend that will employ the API's routes to handle client requests such as:
* Login, Signup, and Logout
* List, Read, Edit, and Delete Products 
* Create, Read, Edit, and Delete Reviews
  
 I will also manage the application's state by creating a Redux store, constructing the necessary reducers and actions to update & display the app's current state.

### Phase 4: Components (3 days)

In this phase, I will create an app-wide navigation component with links that route to all components needed 
to successfuly sign up, log in/out, and perform CRUD actions on products & reviews. In this phase, I will also style said components to create a layout similar to Grailed.

[*Functional Component List*](link to components)

### Phase 5: File Uploads & Search for Clothes (1 day)

By this phase, both create actions for products and reviews will be functioning and I will update them to accept image
file uploads from the client through [AWS](https://aws.amazon.com/).

*No empty Image!*
I've provided a default image using state on the frontend for all creations. If an image is not provided, the uploaded song/album
will have a neat default.
```
// backend
    let { name, description, size, price, userId, categoryId, imageUrl } = req.body;

    if (req.files.imageUrl) {
        imageUrl = await singlePublicFileUpload(req.files.imageUrl[0]);
    }
    
        const newProduct = await Product.create({
        name,
        description,
        size,
        price,
        userId,
        categoryId,
        imageUrl
    });
```
I will also add functionality to the search bar, allowing users to search for clothes by name.

### Phase 6: Deploy Application

Now, I will deploy the functioning application.

### Bonus Features (TBD)

- [ ] Follows
- [ ] Payment
- [ ] Filter Clothes
