
import React, { useEffect, useMemo, useState } from "react";
import { Container, Col, Row, Card, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logoutAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import styles from './about.module.scss'
import whatsapp1 from '../../public/whatsapp1.png'
import ins from '../../public/in.png'
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";



const About = () => {
  const [open, setOpen]=useState(false)
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    const dispatch = useDispatch();
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
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <HelmetProvider>
    <Helmet>
    <title>درباره ما -اتوفلاح</title>
    <meta name="description" content={'اتوگالری فلاح با مدیریت محمد فرهنگ فلاح خریدار و فروشنده ماشین های شما با بهترین قیمت است .مغازه ما واقع در شهر هشنگرد است شما میتوانید تلفنی یا با مراجعه به سایت از اخرین محصول ما اگاهی بیابید و برای فروش ماشین خود میتوانید با من در ارتباط باشید'} />
     <script type="application/ld+json">
      {`
       {
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          "name": "اتوفلاح",
          "image": "",
          "@id": "",
          "url": "https://outofallah.ir/",
          "telephone": "0912532851",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "خیابان امام",
            "addressLocality": "هشتگرد",
            "postalCode": "",
            "addressCountry": "IR"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Saturday",
              "Sunday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "22:00"
          },
          "sameAs": [
            "https://www.instagram.com/outo.gallery.fallah/?hl=en",
            "outofallah.ir"
          ] 
        }
     `}
  </script>
          
    </Helmet>
    <Container fluid className={`gx-0 ${styles.background_about}`} style={{    height: '100vh'}}>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
        <Container fluid>
          <Navbar.Brand href="/">اتو فلاح</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">صفحه اصلی</Nav.Link>
              <Nav.Link href="/about">درباره ما</Nav.Link>
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
    <div  className={styles.row_textbox} dir='rtl'>
        <div className={styles.text_box}>
            {/* <p>من </p> */}
            <title>محمد فرهنگ فلاح هستم</title>
            <h3>به شما در خرید و فروش ماشینتان کمک خواهم کرد</h3>
            <div className={styles.row}>
              <a href="#" onClick={e=>setOpen(true)}>نشانی من <span>&#x2192;</span></a>
            </div>
            <div className={styles.rows}>
              <a href="https://t.me/pa30game" title="whats app"><img className={styles.tel} src={whatsapp1} style={{width: '64px'}}/></a>
              <a href="https://instagram.com/outo.gallery.fallah/?hl=en" title="instagram"><img className={styles.ins} src={ins}/></a>
              
            </div>
          
        </div>
         
    </div>
    {open && (
      <Row className={styles.boxmodal}>
       <Col>
       <span onClick={e=>setOpen(false)}>X</span>
       <img src={'https://api.neshan.org/v2/static?key=service.7e7b705c6d234409a4938d6f154bc34c&type=dreamy&zoom=16&center=35.951304,50.693168&width=1120&height=300&marker=red'} /></Col>
      </Row>

    )}
    
    </Container>
    </HelmetProvider>
  )
}

export default About