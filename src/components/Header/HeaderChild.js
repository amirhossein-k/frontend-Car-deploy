import React, { useEffect, useState } from "react";
import {  Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logoutAction } from "../../actions/userActions";
import { useDispatch } from "react-redux";
const HeaderChild = ({ userInfo }) => {
  const [metr, setMetr] = useState("");
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
  //////////
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  /////
  useEffect(() => {}, [userInfo]);

  return (
    <header
      id="header"
      ref={(el) => {
        if (!el) return;
       
        setMetr(el.getBoundingClientRect().bottom);
      }}
    >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
        <Container fluid>
          <Navbar.Brand href="/" role={'site name'}>اتو فلاح</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" role={'navigation'}>
              <Nav.Link href="/" role={'link'}>صفحه اصلی</Nav.Link>
              <Nav.Link href="/about" role={'link'}>درباره ما</Nav.Link>
            </Nav>
            {userInfo ? (
              <NavDropdown
                title={`${userInfo.name}`}
                id="collasible-nav-dropdown"
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

export default HeaderChild;
