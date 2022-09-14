# Chaciced

## Database Schema Design

![dbdiagram](https://github.com/janjovellanos/Chaliced-Clone/blob/main/images/db-schema.png)

## API Documentation

## All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

## Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/profile
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

## Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Get all Products

Returns all the products.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /products
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products":[
        {
          "id": 1,
          "name": "Salomon XT-4",
          "description": "Nice hiking shoe",
          "size": "US10",
          "price": "$140",
          "userId": 1,
          "categoryId": 3,
          "sold": false,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Images": [
            {
             "id": 1,
             "productId": 1,
             "url": "image's url"
            },
            { "..." }
          ]
        },
        {
          "id": 2,
          "name": "..."
        }
      ]
    }
    ```

## Get all Products being sold by the Current User

Returns all the songs created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/products
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products":[
        {
          "id": 1,
          "name": "Salomon XT-4",
          "description": "Nice hiking shoe",
          "size": "US10",
          "price": "$140",
          "userId": 1,
          "categoryId": 3,
          "sold": false,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Images": [
            {
             "id": 1,
             "productId": 1,
             "url": "image's url"
            },
            { "..." }
          ]          
        },
        {
          "id": 2,
          "name": { "..." }
        }
      ]
    }
    ```

## Get details of a Product from an id

Returns the details of a product specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Salomon XT-4",
      "description": "Nice hiking shoe",
      "size": "US10",
      "price": "$140",
      "userId": 1,
      "categoryId": 3,
      "sold": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Seller": {
        "id": 1,
        "username": "TonyHawk",
        "profileImage": "photo of Tony Hawk"
      },
      "Images": [
         {
           "id": 1,
           "url": "url for product image",
           "productId": 1
         },
         {
           "id": 2,
           "url": "url for 2nd product image",
           "productId": 1
         }
      ]
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

## List (Create) a Product for sale

Creates and returns a new product.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: POST
  * URL: /products
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Salomon XT-4",
      "description": "Nice hiking shoe",
      "size": "US10",
      "price": "$140",
      "categoryId": 3
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Salomon XT-4",
      "description": "Nice hiking shoe",
      "size": "US10",
      "price": "$140",
      "userId": 1,
      "categoryId": 3,
      "sold": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Product name is required",
        "size": "Size is required",
        "price": "Price is required"
      }
    }
    ```

## Edit a Product

Updates and returns an existing product.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: PUT
  * URL: /products/:productsId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Y2K Umbro Shirt",
      "description": "Great vintage condition",
      "size": "M",
      "price": "$30",
      "categoryId": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Y2K Umbro Shirt",
      "description": "Great vintage condition",
      "size": "M",
      "price": "$30",
      "userId": 1,
      "categoryId": 1,
      "sold": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-23 18:30:17"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Product name is required",
        "size": "Size is required",
        "price": "Price is required"
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

## Unlist (Delete) a Product

Deletes an existing product.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: DELETE
  * URL: /products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Reviews of a specified user

Returns all the reviews for a specified user.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /users/:userId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "sellerId": 1,
          "buyerId": 3,
          "productId": 2,
          "body": "Great customer service & quick shipping!",
          "stars": 5
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Product": {
             "id": 2,
             "name": "Y2K Umbro Shirt",
             "description": "Great vintage condition",
             "size": "M",
             "price": "$30",
          }
        },
        {
          "id": 2,
          "sellerId": 1,
          "buyerId": 2,
          "productId": 1
          "body": "Good deal, will shop again",
          "stars": 5
          "createdAt": "2022-01-31 08:40:12",
          "updatedAt": "2021-01-31 08:40:12",
          "Product": {
             "id": 1,
             "name": "Salomon XT-4",
             "description": "Good hiking shoe",
             "size": "US10",
             "price": "$140",      
          }
        }
      ]
    }
    ```

## Get all Reviews of the Current User

Returns all the reviews of current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "sellerId": 1,
          "buyerId": 3,
          "productId": 2,
          "body": "Great customer service & quick shipping!",
          "stars": 5
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Product": {
             "id": 2,
             "name": "Y2K Umbro Shirt",
             "description": "Great vintage condition",
             "size": "M",
             "price": "$30",
          }
        },
        {
          "id": 2,
          "sellerId": 1,
          "buyerId": 2,
          "productId": 1
          "body": "Good deal, will shop again",
          "stars": 5
          "createdAt": "2022-01-31 08:40:12",
          "updatedAt": "2021-01-31 08:40:12",
          "Product": {
             "id": 1,
             "name": "Salomon XT-4",
             "description": "Good hiking shoe",
             "size": "US10",
             "price": "$140",       
          }
        }
      ]
    }
    ```

## Get details of Review from an id

Returns the details of a review specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "sellerId": 1,
      "buyerId": 3,
      "productId": 2,
      "body": "Great customer service & quick shipping!",
      "stars": 5
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Product": {
         "id": 2,
         "name": "Y2K Umbro Shirt",
         "description": "Great vintage condition",
         "size": "M",
         "price": "$30",
       }
     }
    ```

* Error response: Couldn't find a review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Review

Creates and returns a new review.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "Quick shipping",
      "stars": 5,
      "productId": 2
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "sellerId": 1,
      "buyerId": 3,
      "productId": 2,
      "body": "Quick shipping",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Product": {
         "id": 2,
         "name": "Y2K Umbro Shirt",
         "description": "Great vintage condition",
         "size": "M",
         "price": "$30",
       }
     }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "body": "Review body is required",
        "stars": "Review stars is required"
      }
    }
    ```

## Edit a Review

Updates and returns an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /reviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "Great customer service!",
      "stars": 4,
      "productId": 2 ---- ??????
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "sellerId": 1,
      "buyerId": 3,
      "productId": 2,
      "body": "Great customer service!",
      "stars": 4,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Product": {
         "id": 2,
         "name": "Y2K Umbro Shirt",
         "description": "Great vintage condition",
         "size": "M",
         "price": "$30",
       }
     }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "body": "Review body is required",
        "stars": "Review stars is required"
      }
    }
    ```

* Error response: Couldn't find a review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Review

Deletes an existing review.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: DELETE
  * URL: /reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Favorites of a Product by a Product's id

Returns all the favorites that belong to a product specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /products/:productId/favorites
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Favorites": [
        {
          "id": 1,
          "userId": 2,
          "productId": 4,
          "User": {
            "id": 2,
            "username": "Heisenberg"
          }
        },
        {
          "id": 2,
          "userId": 1,
          "productId": 4,
          "User": {
            "id": 2,
            "username": "TonyHawk"
          }
        }     
      ]
    }
    ```
    
## Get all Favorites created by the Current User

Returns all the favorites that belong to the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/favorites
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Favorites": [
        {
          "id": 1,
          "userId": 1,
          "productId": 4,
          "Product": {
            "id": 4,
            "name": "Salomon XT-4",
            "size": "US10",
            "price": "$140"
          }
        },
        {
          "id": 2,
          "userId": 1,
          "productId": 2,
          "Product": {
            "id": 2,
            "name": "Y2K Umbro Shirt",
            "size": "M",
            "price": "$30"
          }
        },    
      ]
    }
    ```

## Create a Favorite (Like) for a Product based on the Products's id

Create and return a new favorite for a product specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /products/:productId/favorites
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "productId": 3,
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Favorite (Unlike)

Delete an existing favorite for a product specified by id.

* Require Authentication: true
* Require proper authorization: Favorite must belong to the current user
* Request
  * Method: DELETE
  * URL: /products/:productId/favorites
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully unfavorited",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```
    
    
    
    
    
## Get all Orders (Bought) that belong to the Current User

Returns all the orders that belong to the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/orders
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Orders": [
        {
          "id": 1,
          "userId": 2,
          "productId": 4,
          "Product": {
            "id": 4,
            "name": "Salomon XT-4",
            "size": "US10",
            "price": "$140"
          }
        },
        {
          "id": 2,
          "userId": 2,
          "productId": 2,
          "Product": {
            "id": 2,
            "name": "Y2K Umbro Shirt",
            "size": "M",
            "price": "$30"
          }
        }     
      ]
    }
    ```
    
## Get all Orders (Sold) that belong to the Current User

Returns all the orders that belong to the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /my/sold
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Orders": [
        {
          "id": 1,
          "userId": 2,
          "productId": 4,
          "Product": {
            "id": 4,
            "name": "Salomon XT-4",
            "size": "US10",
            "price": "$140"
          }
        },
        {
          "id": 2,
          "userId": 4,
          "productId": 2,
          "Product": {
            "id": 2,
            "name": "Y2K Umbro Shirt",
            "size": "M",
            "price": "$30"
          }
        }     
      ]
    }
    ```

## Create (Buy) an Order for a Product based on the Products's id

Create (Buy) and return a new order for a product.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /my/orders
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "productId": 3,
      "Product": {
        "id": 3,
        "name": "John Bull Black Pants",
        "size": "31",
        "price": "$45"
      }      
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```
    
## Get all Images of a Product based on the Product's id

Return all images for a product specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /products/:productId/images
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      "Images": [
         {
           "id": 1,
           "url": "url for product image",
           "productId": 1
         },
         {
           "id": 2,
           "url": "url for 2nd product image",
           "productId": 1
         }
      ]
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```       

## Add an Image to a Product based on the Product's id

Create and return a new image for a product specified by id.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  * Method: POST
  * URL: /products/:productId/images
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "an image url"
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```    
    
## Delete an Image

Delete an existing image.

* Require Authentication: true
* Require proper authorization: Product image must belong to the current user
* Request
  * Method: DELETE
  * URL: /images/:imageId
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Image couldn't be found",
      "statusCode": 404
    }  
