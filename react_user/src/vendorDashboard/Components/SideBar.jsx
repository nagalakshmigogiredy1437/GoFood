import React from "react";

const SideBar = ({
  showAddFirmHandler,
  showAddProductHandler,
  showProductsHandler,
  showFirmName,
}) => {
  return (
    <div className="sidebarSection">
      <ul>
        {showFirmName ? <li onClick={showAddFirmHandler}>Add Firm</li> : ""}

        <li onClick={showAddProductHandler}>Add Product</li>
        <li onClick={showProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
