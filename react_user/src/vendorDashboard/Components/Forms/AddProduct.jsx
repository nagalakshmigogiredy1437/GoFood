import React, { useState } from "react";
import { ApiUrl } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [bestSeller, setBestseller] = useState(false);
  const [description, setDescription] = useState("");

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (category?.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestseller = async (e) => {
    const value = e.target.value === "true";
    setBestseller(value);
  };

  const handleImageUpload = async (e) => {
    const singleImage = e.target.files[0];
    setImage(singleImage);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const formId = localStorage.getItem("firmId");
      if (!loginToken || !formId) {
        console.log("user not Authenticated");
        return;
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      category.forEach((item) => {
        formData.append("category", item);
      });
      formData.append("image", image);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      console.log(formData);

      const response = await fetch(`${ApiUrl}/product/add-product/${formId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setBestseller(false);
        setCategory([]);
        setDescription("");
        setImage(null);
        setPrice("");
        setProductName("");
        alert("product addedd successfully");
      }
    } catch (e) {
      console.log("failed to added product", e);
      alert("failed to added product");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleProductSubmit}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        ></input>
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <div className="checkInp">
          <label>Category</label>
          <div className="inputContainer">
            <div className="checkBoxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category?.includes("veg")}
                onChange={handleCategoryChange}
              ></input>
            </div>
            <div className="checkBoxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category?.includes("non-veg")}
                onChange={handleCategoryChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputContainer">
            <div className="checkBoxContainer">
              <label>Yes</label>
              <input
                type="radio"
                value="true"
                checked={bestSeller === true}
                onChange={handleBestseller}
              ></input>
            </div>
            <div className="checkBoxContainer">
              <label>No</label>
              <input
                type="radio"
                value="false"
                checked={bestSeller === false}
                onChange={handleBestseller}
              ></input>
            </div>
          </div>
        </div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <label>Product Image</label>
        <input type="file" onChange={handleImageUpload}></input>
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
