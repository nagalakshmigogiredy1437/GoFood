import React, { useState } from "react";
import { ApiUrl } from "../../data/apiPath";

const AddFirm = ({ showWelcomeHandler }) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = async (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };
  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.log("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      category.forEach((value) => formData.append("category", value));
      region.forEach((value) => formData.append("region", value));
      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(`${ApiUrl}/firm/add-firm`, {
        method: "POST",
        headers: { token: `${loginToken}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);

        setCategory([]);
        setArea("");
        setFirmName("");
        setImage(null);
        setOffer("");
        setRegion([]);
        alert("Firm added successfully");
        const firmId = data.formId;
        localStorage.setItem("firmId", firmId);
        // showWelcomeHandler();
      } else if (data.message == "Vendor can have only one firm") {
        alert("Firm exist🏪, Vendor can have only one firm");
      } else {
        console.error("Error:", data);
        alert("Failed to add firm");
      }
    } catch (e) {
      console.error("Failed to add firm", e);
      alert(`Failed to add firm: ${e.message}`);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3> Add Firm</h3>
        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        ></input>

        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        ></input>

        <div className="checkInp">
          <label>Category</label>
          <div className="inputContainer">
            <div className="checkBoxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              ></input>
            </div>
            <div className="checkBoxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              ></input>
            </div>
          </div>
        </div>
        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        ></input>
        <div className="checkInp">
          <label>Region</label>
          <div className="inputContainer">
            <div className="checkBoxOfferContainer">
              <label>South-Indian</label>
              <input
                type="checkbox"
                value="south-Indian"
                checked={region.includes("south-Indian")}
                onChange={handleRegionChange}
              ></input>
            </div>
            <div className="checkBoxOfferContainer">
              <label>North-Indian</label>
              <input
                type="checkbox"
                value="north-Indian"
                checked={region.includes("north-Indian")}
                onChange={handleRegionChange}
              ></input>
            </div>
            <div className="checkBoxOfferContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              ></input>
            </div>
            <div className="checkBoxOfferContainer">
              <label>Bakary</label>
              <input
                type="checkbox"
                value=" bakary"
                checked={region.includes("bakary")}
                onChange={handleRegionChange}
              ></input>
            </div>
          </div>
        </div>
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload}></input>
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
