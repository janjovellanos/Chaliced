import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as productActions from "../../../store/product";
import "./CreateProduct.css";

function CreateProductForm({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([
    'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png'
  ]);
  const [imagePreviews, setImagePreviews] = useState([
    'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png'
  ]);
  const [imageCount, setImageCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [btnText, setBtnText] = useState(<div>List <i className="fa-regular fa-square-plus"></i></div>)
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setName("")
    setSize("")
    setCategoryId(1)
    setPrice(0)
    setDescription("")
    setImages([
        'https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png'
    ])
    setImageCount(0);
    setDisabled(false);
    setBtnText(<div>List <i className="fa-regular fa-square-plus"></i></div>)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setBtnText(<div className="fa fa-circle-notch fa-spin"></div>)
    const valErrors = []
    history.push(`/users/${user?.id}`)
    return dispatch(productActions.addProduct({ name, size, categoryId, price, description }))
        .then(data => dispatch(productActions.addProductImage(data?.id, images)))
        .then(() => {
            setShowModal(false);
            history.go();
            reset();
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              const valErrors = []
              //validations
              if (name.length > 50) valErrors.push('Name must be less than 50 characters');
              if (typeof price !== 'number') valErrors.push('Price must be a number');
              if (imageCount > 4) valErrors.push('Please choose up to 4 images');
              setErrors(valErrors);
            } else history.push(`/users/${user?.id}`)
        }
    );
  };

      // for multiple file upload
      const updateFiles = (e) => {
        const files = e.target.files;
        if (files) {
          const arrFiles = Array.from(files)
          const previewUrls = [];
          arrFiles.forEach(file => previewUrls.push(URL.createObjectURL(file)));
          setImagePreviews(previewUrls);
          setImages(files);
          setImageCount(files?.length);
        }
      };

  return (
    <>
      <div className="create-listing-header">New Listing</div>
        <ul>
          {errors.map((error, idx) => (
              <li key={idx} className='errors'>{error}</li>
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
            <select
                type="text"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
            >
                <option disabled='disabled'>Select a Category</option>
                <option value={1}>Tops</option>
                <option value={2}>Bottoms</option>
                <option value={3}>Shoes</option>
                <option value={4}>Accessories</option>
            </select>
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
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                <label className="listing-label image-listing-label">
                Images
                <div className="image-counter">{imageCount > 0 && `(${imageCount})`}</div>
                </label>
                <input
                  className="image-upload product-image-upload"
                  type="file"
                  multiple
                  onChange={e => updateFiles(e)} />
            <div className="create-listing-image-container">
                <img alt='product for sale' src={imagePreviews[imagePreviews?.length - 1]}></img>
            </div>
        </div>
        <div className="create-listing-btn-container">
            <button disabled={disabled} className="create-listing-btn" id="create-listing-btn" type="submit">{btnText}</button>
        </div>
      </form>
    </>
  );
}

export default CreateProductForm;
