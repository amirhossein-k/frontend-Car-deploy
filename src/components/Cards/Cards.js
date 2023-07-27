import React, {
  useEffect,
  useState,

} from "react";
import {  Row, Card } from "react-bootstrap";
import "../../styles/Cards.css";

import cash_logo from "../../public/cash.svg";
import car_logo from "../../public/carlogo.svg";
import kilo_logo from "../../public/kilo.svg";
import clock from "../../public/clock.svg";

import { useDispatch, useSelector } from "react-redux";
import { listProductAction } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import numberFormat from "number-formatierer";
import { memo } from "react";
const Cards = ({ cardrun, setCardrun, Search }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { product, loading } = productList;

  const [products, setProducts] = useState(null);
  ///
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [carname, setCarname] = useState("");
  const [factory, setFactory] = useState("");
  const [fuel, setFuel] = useState("");
  const [build, setBuild] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [value1, setValue1] = useState([10000000, 1000000000]);
  ////
  useEffect(() => {
    setCardrun(true);
  }, []);
  useEffect(() => {
 
    if (cardrun === true) {
      dispatch(listProductAction());
      setCardrun(false);
    }
  }, [cardrun]);

  useEffect(() => {


  }, [products]);

  useEffect(() => {
    setProducts(product);
    
  }, [product]);

  const navigate = useNavigate();

  return (
    <>
      <Row className="justify-content-center align-items-center d-flex gap-3 p-3 shadow mt-2 mb-2 gx-0">
        <Search
          setSearchInput={setSearchInput}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          searchInput={searchInput}
          products={products}
          setCarname={setCarname}
          carname={carname}
          setProducts={setProducts}
          setFactory={setFactory}
          factory={factory}
          setFuel={setFuel}
          fuel={fuel}
          build={build}
          setBuild={setBuild}
          price={price}
          setPrice={setPrice}
          setAge={setAge}
          age={age}
          value1={value1}
          setValue1={setValue1}
        />
      </Row>
      {loading && <h1>درحال خواندن دیتا هستیم منتظر بمانید</h1>}

      {products &&
        products
          ?.reverse()
          .filter(
            (items) =>
              items.namecar.toLowerCase().includes(carname.toLowerCase()) &&
              items.factory.toLowerCase().includes(factory.toLowerCase()) &&
              items.age.toLowerCase().includes(age.toLowerCase()) 

            
          )
          ?.filter(function(x){ return x.price >= value1[0] && x.price <= value1[1]  })
          ?.sort((p1,p2)=>(p1.price < p2.price) ? 1 : (p1.price>p2.price) ? -1 : 0 )
          .map((item) => {
            return (
              <Card
                className={`pruduct `}
                key={item.id}
                onClick={(e) => navigate(`/products/${item.id}`)}
              >
                <span className={`${item.status === 'approved' ? 'approve': 'sold'}`}></span>
          <header>
          <Card.Img
                  variant="top"
                  alt="Product photo "
                  
                  src={`${item.pic[0]}`}
                  style={{ height: "240px" }}
                />
                <Card.Title className="name" role={'title'} >{item.namecar}</Card.Title>
          </header>
              <main>
              <Card.Body  style={{  display: "flex",alignItems: "center",
                  justifyContent: "center" }}>
              <Card.Text   style={{
                      
                      display: "flex",
                      flexDirection: "row-reverse",
                      gap: "12px",
                      alignItems: "center",
                    }}>
                    {" "}
                    <Card.Img src={cash_logo} className="imgg" alt="jjj" />{" "}
                    
                     {(()=>{
                        return <span dir="rtl">   {numberFormat(item.price)} هزار تومان</span>

                    })()}
                    

                  </Card.Text>
              </Card.Body>
                <Card.Body
                  className="box"
                  style={{ flexDirection: "row", display: "flex",alignItems: "center",
                  justifyContent: "center" }}
                >
               
                  <Card.Text   style={{
                      margin: " 0 5px",
                      display: "flex",
                      
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Card.Img src={car_logo} className="imgg" alt="icon name product" title={'icon'} />{" "}
                    {item.factory}
                  </Card.Text>
                  <Card.Text   style={{
                      margin: " 0 5px",
                      display: "flex",
                      
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Card.Img src={clock} className="imgg" alt="icon The age of the car" title={'icon'} />{" "}
                    {item.age}
                  </Card.Text>
                  <Card.Text
                    style={{
                      margin: " 0 5px",
                      display: "flex",
                      
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Img src={kilo_logo} className="imgg" alt="icon distnace" title='icon' />{" "}
                    {item.distance}
                  </Card.Text>
                </Card.Body>
              </main>
                {/* <div className="card-footer">
               
                </div> */}
                <span className={`${item.status ==='sold' ? 'cover': ''}`}></span>
              </Card>
            );
          })}

    </>
  );
};

export default memo(Cards) ;
