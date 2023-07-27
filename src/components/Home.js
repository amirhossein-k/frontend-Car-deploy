import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Swipper from "./Swipper/Swipper";
import Search from "./Search/Search";

import Header from "./Header/Header";
import "../styles/Home.css";

import { useDispatch, useSelector } from "react-redux";

import { getDetailAction } from "../actions/detailActions";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
///////////
const Home = ({ userInfo, Cards, cardrun, setCardrun }) => {
  const dispatch = useDispatch();
  const [datail, setDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState();
  const [header_img, setHeader_img] = useState("");
  const [profile_img, setProfile_img] = useState("");
  ///
  const [times_1, setTimes_1] = useState("");
  const [times_2, setTimes_2] = useState("");
  const [times_3, setTimes_3] = useState("");

  const [social_phone, setSocial_phone] = useState("");
  const [social_address, setSocial_address] = useState("");
  const [social_ig, setSocial_ig] = useState("");

  const [slider_img, setSlider_img] = useState([]);
  const detailgett = useSelector((state) => state.detailget);
  const { loading , success, detail:dataa } = detailgett;
  const empty =false
  useEffect(() => {

    dispatch(getDetailAction(empty))
  }, []);

  useEffect(() => {

    if (dataa) {
      setDetail(dataa)
 
      setHeader_img(dataa.header_img);
      setProfile_img(dataa.profile_img);
      setTitle(dataa.title);
      setSubtitle(dataa.subtitle);
      setSlider_img(dataa.slider_img);
      setTimes_1(dataa.times_1);
      setTimes_2(dataa.times_2);
      setTimes_3(dataa.times_3);
      setSocial_address(dataa.social_address);
      setSocial_phone(dataa.social_phone);
      setSocial_ig(dataa.social_ig);

    }
  }, [dataa,loading]);

  return (
    <HelmetProvider>
        <Helmet>
            <title>اتوفلاح</title>
            <meta name="description" content={'اتوگالری فلاح با مدیریت محمد فرهنگ فلاح خریدار و فروشنده ماشین های شما با بهترین قیمت است .مغازه ما واقع در شهر هشنگرد است شما میتوانید تلفنی یا با مراجعه به سایت از اخرین محصول ما اگاهی بیابید و برای فروش ماشین خود میتوانید با من در ارتباط باشید'} />
            <meta name="keywords" content="محمد فرهنگ فلاح , اتوگالری فلاح ,اتوفلاح,فلاح,outofallah,outofallah.ir,هشتگرد"></meta>
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
    <Container fluid className="gx-0">
      {datail && (<Header
        userInfo={userInfo}
        datail={datail}
        setDetail={setDetail}
        title={title}
        subtitle={subtitle}
        header_img={header_img}
        profile_img={profile_img}
      />)}
      <Row >
        <Swipper slider_img={slider_img} datail={datail}  />
      </Row>

      <Row className="gap-4 fix py-2" dir="rtl">
        <Cards cardrun={cardrun} setCardrun={setCardrun} Search={Search} />
      </Row>
      <Row>
        <Col md={6} className="background">
          <div className="ani-back">
            <img
              src="https://uploads.storage.iran.liara.space/giphy_nkvmcl-min.gif"
              alt="gif circle background design "
              aria-label="image"
              title="circle"
              role={'presention'}/>
          
            <div className="car-img">
              <img
                src="https://uploads.storage.iran.liara.space/NicePng_carpng_3406804_byfcuz-min.png"
                alt="image car for disign"
                aria-label="image"
                title="car"
                role={'presention'}
              />
            </div>
          </div>
        </Col>
        <Col md={6} className="background">
          <div className="contain">
            <div className="time">
              <span className="block">
                شنبه تا چهارشنبه<span className="m-2">{datail && times_1}</span>
              </span>
              <span className="block">
                پنج شنبه<span className="m-2">{datail && times_2}</span>
              </span>
              <span className="block">
                جمعه<span className="m-2">{datail && times_3}</span>
              </span>
            </div>
            <div className="social">
              <div className="boxx">
                <img src="https://uploads.storage.iran.liara.space/Pngtree_call_icon_4419870_bqmoor-min.png" 
                    alt="icon phone"
                    aria-label="icon"
                    title="phone"
                    role={'presention'}/>
                    
                <span className="px-3">{datail && social_phone}</span>
              </div>
              <div className="boxx">
                <img src="https://uploads.storage.iran.liara.space/m2i8Z5Z5G6A0H7G6_me3zxo-min.png"
                 alt="icon instagram"
                 aria-label="icon"
                 title="instagram"
                 role={'presention'} />
                <span className="px-3">{datail && social_ig}</span>
              </div>
              <div className="boxx">
                <img src="https://uploads.storage.iran.liara.space/m2i8Z5Z5G6A0H7G6_me3zxo-min.png"
                 alt="icon address"
                 title="address"
                 aria-label="icon"
                 
                 role={'presention'} />
                <span className="px-3">{datail && social_address}</span>
              </div>
              <div className="boxx">
              <img style={{width:'100%'}} src="https://api.neshan.org/v2/static?key=service.7e7b705c6d234409a4938d6f154bc34c&type=dreamy&zoom=16&center=35.951304,50.693168&width=1120&height=300&marker=red"
               alt="address outofallah shop"
               aria-label="Shop address on the map"
               title="address on map"
               role={'img'}
               />

              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
   </HelmetProvider>
   
  );
};

export default Home;
