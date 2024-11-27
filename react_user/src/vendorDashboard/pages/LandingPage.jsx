import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import Login from "../Components/Forms/Login";
import Register from "../Components/Forms/Register";
import AddFirm from "../Components/Forms/AddFirm";
import AddProduct from "../Components/Forms/AddProduct";
import Welcome from "../Components/Forms/Welcome";
import AllProducts from "../Components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setAddFirm] = useState(false);
  const [showAddProduct, setAddProduct] = useState(false);
  const [showWelcomePage, setWelcomePage] = useState(false);
  const [showProductsPage, setProductsPage] = useState(false);
  const [showLogout, setLogout] = useState(false);
  const [showFirmName, setFirmName] = useState(true);
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setLogout(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setFirmName(false);
    }
  });

  const logoutHandler = () => {
    confirm("Are you Sure to Logout?");
    localStorage.removeItem("firmId");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("vendorFormId");
    localStorage.removeItem("firmName");
    setLogout(false);
    setFirmName(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setAddFirm(false);
    setAddProduct(false);
    setWelcomePage(false);
    setProductsPage(false);
  };
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setAddFirm(false);
    setWelcomePage(false);
    setAddProduct(false);
    setProductsPage(false);
  };
  const showAddFirmHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setAddProduct(false);
      setWelcomePage(false);
      setAddFirm(true);
      setProductsPage(false);
    } else {
      alert("plese login to using your user details");
      setShowLogin(true);
    }
  };
  const showAddProductHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setAddFirm(false);
      setWelcomePage(false);
      setAddProduct(true);
      setProductsPage(false);
    } else {
      alert("plese login to using your user details");
      setShowLogin(true);
    }
  };
  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setAddFirm(false);
    setAddProduct(false);
    setWelcomePage(true);
    setProductsPage(false);
  };

  const showProductsHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setAddFirm(false);
      setAddProduct(false);
      setWelcomePage(false);
      setProductsPage(true);
    } else {
      alert("plese login to using your user details");
      setShowLogin(true);
    }
  };
  return (
    <>
      <section className="LandingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showAddFirmHandler={showAddFirmHandler}
            showAddProductHandler={showAddProductHandler}
            showProductsHandler={showProductsHandler}
            showFirmName={showFirmName}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showAddFirm && showLogout && (
            <AddFirm showWelcomeHandler={showWelcomeHandler} />
          )}
          {showAddProduct && showLogout && <AddProduct />}
          {showWelcomePage && showLogout && <Welcome />}
          {showProductsPage && showLogout && <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
