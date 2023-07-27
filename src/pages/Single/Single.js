import "./single.scss";
import React, { useEffect, useState } from "react";

import HeaderChild from "../../components/Header/HeaderChild";
import {Slide  } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrdoductAction,

} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import {  Miladi } from "basic-shamsi";

import { Helmet, HelmetProvider } from 'react-helmet-async';
import {

  Container,

  Col,
  Row,
} from "react-bootstrap";
import '../../styles/single.css'
import numberFormat from "number-formatierer";
const Single = ({ cardrun, setCardrun }) => {
  const [pics, setPics] = useState([]);
  const [key, setKey] = useState([]);
  const [datas, setDatas] = useState("");
  const [value, setValue] = useState([]);
  const [skil, setSkil] = useState([]);

  const [datass,setDatass]= useState(false)

  const dispatch = useDispatch();
  const { productId } = useParams();



  useEffect(() => {

    setCardrun(true);
    setDatass(false)
  }, []);
 
  useEffect(() => {
    if (cardrun === true) {
      setKey((prevpic) => prevpic.splice(0, prevpic.length));
      setKey([])
      setValue([])
      setValue((prevpic) => prevpic.splice(0, prevpic.length));
      dispatch(getPrdoductAction(productId));
      setCardrun(false);
     
    }
  }, [cardrun]);
 
  const product = useSelector((state) => state.productGet);
  const { data, success, loading } = product;

  useEffect(() => {
    setKey((prevpic) => prevpic.splice(0, prevpic.length));
    setValue((prevpic) => prevpic.splice(0, prevpic.length));
    if (success === true) {
      
      setDatass(data)


      if (data) {

        setSkil([])
        for (const [key, value] of Object.entries(data)) {
          if(key==='namecar' || key === 'factory' || key=== 'distance' || key ==='skills' 
          || key ==="price"|| key ==="status" || key ==="age"
          || key ==="date" || key ==="color" || key ==="fuel" || key ==="engine" || key ==="healthbody" || key ==="gearbox" ||key ==='scriptt' ){

            setKey((prevkey) => [...prevkey, key]);
            setValue((prevvalue) => [...prevvalue, value]);
            
          }
        
          if(key==='skills'){
            
            value.map(item=>{
              setSkil(old=> [...old , `  ${item}`])
            })
          }
          if (key === "date") {

            var one = value.slice(0, 10);
            var two = one.replaceAll("-", "/");
            var three = Miladi.toShamsi(two);
            setDatas(three);
            
          }
          if (key === "pic") {
            setPics(value);
          }
        }
      }
      
    }


  }, [success]);
  if (data) {
  }


    return (
      <HelmetProvider>
    <Container fluid className="gx-0 position-relative">
       
        { datas  &&
          (
            <Helmet>
            <title>{data.namecar} - اتوفلاح</title>
            <meta name="description" content={`ماشین :${data.namecar} ${data.color} | ${data.fuel} |قیمت پایه ان : ${numberFormat(data.price)} میلیون`} />
             <script type="application/ld+json">
              {`
                {
                "@context": "https://schema.org/", 
                "@type": "Product", 
                "name": "${data.namecar + data.color}",
                "image": "${data.pic[0]}",
                "description":"${data.namecar} ${data.color} | ${data.fuel} | ${data.factory}",
                "brand":{
                  "@type": "Brand",
                   "name": "${data.factory}"
                  },
                "author":{
                  "@type": "Brand",
                   "name": "محمد فرهنگ فلاح"
                  }
                }
             `}
          </script>
                  
            </Helmet>
            
          )
       }
     
      <HeaderChild />
      <Row className="image-slider-top">
      {loading && <div className="loadiing">لطفا منتظر بمانید</div>}
        {data && (<Slide>
          {datass && data && 
            pics.map((item, index) => {
             
              return (
                <div className="each-slide" key={`${item}`}>
                  <div className="each-slide-child">
                    <img
                      src={item}
                      alt={`خودرو: ${data.namecar} | مدل ${data.age} | رنگ ${data.color} | ${data.fuel}`}
                      aria-label="image"
                      className="img-sidebar"
                      title="image product"
                    />
                  </div>
                </div>
              );
            })
          }
        </Slide>)}
      </Row>
      
      <Row className="details w-75" dir="rtl">
        {datass &&
          key.map((item, index) => {
          
            return (
              <Row className="row-child-detail" key={index} >
                {item === "pic" ||
                item === "_id" ||
                item === "__v" ||
                item === "keysliderproduct" ||
                item === "id" ||item === 'scriptt' ? <Col style={{display:'none'}}></Col> : (
                  <Col
                    sm={3}
                    lg={4}
                    className="col-child-detail item"
                    key={index}
                    role={'listitem'}
                  >

                 <h1>
                 {(() => {
                      switch (item) {
                        case "namecar":
                          return "نام خودرو";
                        case "factory":
                          return "کارخانه";
                        case "distance":
                          return "کارکرد";
                          case "color":
                            return "رنگ";
                        case "skills":
                          return "ویژگی";
                          
                        case "fuel":
                          return "نوغ سوخت";
                        case "engine":
                          return "وضعیت موتور";
                        case "healthbody":
                          return "وضعیت بدنه";
                        case "garanti":
                          return "مهلت بیمهٔ شخص ثالث";
                        case "gearbox":
                          return "گریبکس";



                        case "price":
                          return " قیمت پایه";

                        case "status":
                          return "وضعیت";
                        case "age":
                          return "سال تولید";
                        case "date":
                          return  "تاریخ نشر اگهی";

                        default:
                          return null;
                      }
                    })()}
                 </h1>
                  </Col>
                )}

                {item === "pic" ||
                item === "_id" ||
                item === "__v" ||
                item === "keysliderproduct" ||
                item === "id" || item === 'scriptt' ? <Col style={{display:'none'}}></Col> : (
                  <Col className={`col-child-detail value ${item=== 'price' ? 'price_product_yellow' : ""}`} role={'listitem'} >
                    {(() => {
                      switch (item) {
                        
                   
                       
                        case "skills":
                          return skil.map((item,index)=> {
                            if(index===0){
                              return `${item}`
                            }else{
                             return ' ,'+`${item}`
                            }
                          } ); 
                        case "price":
                          return  numberFormat(value[index]) ; 
                        case "distance":
                          return  numberFormat(value[index]) ; 
                        case "date":
                          return datas;
                        case "status":
                          if (value[index] === "approved") {
                            return "موجود";
                          } else {
                            return "فورخته شده";
                          }
                        default:
                          return value[index];
                      }
                    })()}
                  </Col>
                )}
              </Row>
            );
          })}
      </Row>

      <Row className="call-me" dir='rtl'>
        <span className="col-7 d-xl-flex d-none ">جهت اطلاعات بیشتر تماس بگیرید </span>
        <span className="col-7 d-xl-flex d-none" style={{fontSize:13}}>روی ایکون تماس کلیک کنید</span>
        <a className="col-7 ring" href="tel:0912532851">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1b5296" className="bi bi-telephone col-12" viewBox="0 0 16 16">
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
          </svg>
        </a>

      </Row>
    </Container>
    </HelmetProvider>
  );
};

export default Single;
