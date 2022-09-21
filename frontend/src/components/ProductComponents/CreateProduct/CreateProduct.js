import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as productActions from "../../../store/product";
import "./CreateProduct.css";

function CreateProductForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([
    'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png'
  ]);
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(productActions.addProduct({ name, size, categoryId, price, description }))
        .then(data => dispatch(productActions.addProductImage(data.id, images[0])))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }
    );
  };

    let uploadedImages = [];
    const addImages = (url) => {
        uploadedImages.push(url);
        setImages(uploadedImages);
    }

  return (
    <>
      <div className="create-listing-header">New Listing</div>
        <ul>
          {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
        </ul>
      <form onSubmit={handleSubmit} className="create-listing-form">
        <div className="create-listing-left">
            <label className="listing-label">
                Item Name
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            <label className="listing-label">
            Size
            </label>
            <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                />
            <label className="listing-label">
            Category
            </label>
            <input
                type="text"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                />
            <label className="listing-label">
            Price
            </label>
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
        </div>
        <div className="create-listing-right">
                <label className="listing-label">
                Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                <label className="listing-label">
                Images
                </label>
                <input
                    type="text"
                    value={images}
                    onChange={(e) => addImages(e.target.value)}
                    required
                    />
            <div className="create-listing-image-container">
                <img src={images[images?.length - 1]}></img>
            </div>
        </div>
        <div>
            <button className="create-listing-btn" type="submit">List</button>
        </div>
      </form>
    </>
  );
}

export default CreateProductForm;
