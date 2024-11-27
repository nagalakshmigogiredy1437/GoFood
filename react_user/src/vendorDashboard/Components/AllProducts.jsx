import React, { useState, useEffect } from "react";
import { ApiUrl } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    try {
      const formId = localStorage.getItem("firmId")
        ? localStorage.getItem("firmId")
        : localStorage.getItem("vendorFormId");
      console.log("formId", formId);
      const response = await fetch(`${ApiUrl}/product/${formId}/product`);
      const saveresponse = await response.json();
      setProducts(saveresponse.product);
      console.log(saveresponse);
    } catch (e) {
      console.log(e);
      alert("no products for this form");
    }
  };
  useEffect(() => {
    productsHandler();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${ApiUrl}/product/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        confirm("are you sure!, you want to delete the product");
        alert("product deleted");
        setProducts(products.filter((item) => item._id !== id));
      }
    } catch (e) {
      console.log(e);
      alert("failed to delete");
    }
  };

  return (
    <div>
      {!products ? (
        <p>No data found</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          src={`${ApiUrl}/uploads/${item.image}`}
                          alt={item.productName}
                          style={{ width: "50px", height: "50px" }}
                        ></img>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteProduct(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
