import React, { useEffect, useRef, useState } from "react";
import {  Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logoutAction } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const Header = ({
  userInfo,

  title,
  subtitle,
  header_img,
  profile_img,
}) => {
  const dispatch = useDispatch();
  const [metr, setMetr] = useState("");
  const videoEl = useRef(null);
  window.onscroll = function () {
    myFunction();
  };
  function myFunction() {
    var navlist = document.getElementById("navbar");
    if (window.pageYOffset > metr) {
      navlist.classList.add("sticky");
    } else {
      navlist.classList.remove("sticky");
    }
  }

  // 
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
     
  };

  useEffect(() => {
    attemptPlay();
  }, []);
  //////////

  const logoutHandler = () => {
    dispatch(logoutAction());
  };



  return (
    <header
      id="header"
      ref={(el) => {
        if (!el) return;

  
        setMetr(el.getBoundingClientRect().bottom);
      }}
    >
      <div
        id="head"
        className="parallax d-flex align-items-center justify-content-center"
        parallax-speed="2"
        style={{
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          background: `#f4f4f4 url(${ header_img})`,
       
        }}
      >
        
        <h1
          id="logo"
          className="text-center d-flex flex-column justify-content-center align-items-center"
        >
          <img
            className="img-circle "
            
            src={profile_img}
            alt="محمد فرهنگ فلاح"
          />
          <div className="back-fade">
            {" "}
            <span className="title" title="outofallah">{title}</span>
          </div>
          <div className="back-fade my-2" style={{ background: "#adb5bd57" }}>
            <span className="tagline">
              
              { subtitle}<br></br>{'شماره تماس:'}
              <a href="tel:09125332851" role={'link'}>09125332851</a>
            </span>
          </div>
        </h1>
      </div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar" style={{fontSize: '18px'}}>
        <Container fluid>
          <Navbar.Brand href="/" role={'site name'}>اتو فلاح</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" rol='navigation'>
              <Nav.Link href="/">صفحه اصلی</Nav.Link>
              <Nav.Link href="/about">درباره ما</Nav.Link>
            </Nav>
            {userInfo ? (
              <NavDropdown
                title={`${userInfo.name}`}
                id="collasible-nav-dropdown"
                className="profileheaderfix"
              >
                <NavDropdown.Item href="/profile">
                 
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/dashboard">
                  داشبورد مدیریت
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  خروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">ورود</Nav.Link>
            )}
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
