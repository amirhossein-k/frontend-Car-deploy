import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homeDashboard.scss";
import Sidebar from "../../../components/Dashboard/sidebar/Sidebar";

import Widgets from "../../../components/Dashboard/widgets/Widgets";
import Featured from "../../../components/Dashboard/featured/Featured";
import Chart from "../../../components/Dashboard/chart/Chart";
import Tables from "../../../components/Dashboard/tables/Tables";
import { Container, Col, Row } from "react-bootstrap";
import { listProductAction } from "../../../actions/productActions";


const HomeDashboard = ({ setCardrun, cardrun }) => {

  let dates= new Date()
  let yearcurrent = dates.toJSON().slice(0,5);
  let datecurrentmonth = dates.toJSON().slice(0,7);
  let datedaycurrent =dates.toJSON().slice(0,10)
  let beforemonth = Number(datecurrentmonth.slice(5,7)) -1
  let beforemonthcurrent;
  
  if(beforemonth<10){
    beforemonthcurrent = yearcurrent + '0' + String(beforemonth)
  }else{
    beforemonthcurrent = yearcurrent  + String(beforemonth)
  }
  console.log(beforemonthcurrent,'befo')
  
  
  const [amountcar,setAmountcar]=useState(0)
 
  const [amountorder,setAmountorder]=useState(0)

  const [amountearing,setAmountearing]=useState(0)
  const [amountbalance,setAmountbalance]=useState(0)


  useEffect(() => {

    setCardrun(true);
  
  }, []);
  useEffect(() => {
    if (cardrun === true) {
      dispatch(listProductAction());
      setCardrun(false);
      
    }
  }, [cardrun]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { product, loading } = productList;

  var approved =[];
  var totalapproved=0;

  let sold = []
  let totalsoldcost = []
  let totalsold =0

  let totaldate = []
  let filtermonth=[];
  let costmonth = 0;
  let filterday =  [];
  let costday = 0;
  let filterbeforemonth=  [];
  let costbeforemonth= 0;
  // tarikh
  let filterfar= [];
  let filterord= [];
  let filterkhr= [];
  let filtertir= [];
  let filtermor= [];
  let filtersha= [];
  let filtermeh= [];
  let filteraba= [];
  let filteraza= [];
  let filterdey= [];
  let filterbah= [];
  let filteresf= [];

  let pricefar= 0;
  let priceord= 0;
  let pricekhr= 0;
  let pricetir= 0;
  let pricemor= 0;
  let pricesha= 0;
  let pricemeh= 0;
  let priceaba= 0;
  let priceaza= 0;
  let pricedey= 0;
  let pricebah= 0;
  let priceesf= 0;

  
  if(product){
 
    for(let i=0; i< product.length; i++){
      if(product[i].status=== 'sold'){
        sold.push(product[i])

        
      }
      if(product[i].status === "approved"){
        approved.push(product[i])
       
      }
      if(product[i].date.slice(0,7) === datecurrentmonth){
        filtermonth.push(product[i])
      }
      if(product[i].date.slice(0,10) === datedaycurrent){
        filterday.push(product[i])
      }
      if(product[i].date.slice(0,7) === beforemonthcurrent){
        filterbeforemonth.push(product[i])
      }
      // tarikh
      if(product[i].date.slice(5,7)=== '01'){
        filterfar.push(product)
        
        
      }
      if(product[i].date.slice(5,7)=== '02'){
        filterord.push(product)

      }
      if(product[i].date.slice(5,7)=== '03'){
        filterkhr.push(product)

      }
      if(product[i].date.slice(5,7)=== '04'){
        filtertir.push(product)

      }
      if(product[i].date.slice(5,7)=== '05'){
        filtermor.push(product)

      }
      if(product[i].date.slice(5,7)=== '06'){
        filtersha.push(product)

      }
      if(product[i].date.slice(5,7)=== '07'){
        filtermeh.push(product)

      }
      if(product[i].date.slice(5,7)=== '08'){
        filteraba.push(product)

      }
      if(product[i].date.slice(5,7)=== '09'){
        filteraza.push(product)

      }
      if(product[i].date.slice(5,7)=== '10'){
        filterdey.push(product)

      }
      if(product[i].date.slice(5,7)=== '11'){
        filterbah.push(product)

      }
      if(product[i].date.slice(5,7)=== '12'){
        filteresf.push(product)

      }
      
    }

    for(let j=0;j<sold.length;j++){
      totalsoldcost+=Number(sold[j].price)
      totalsold += 1
    }
   
    for(let j=0;j<approved.length;j++){
      totalapproved+= 1
    }

    for(let j=0;j<product.length;j++){
      totaldate.push(product[j].date)

    }
   for(let j=0;j<filtermonth.length;j++){
      costmonth += Number(filtermonth[j].price)
   }
   for(let j=0;j<filterday.length;j++){
    costday += Number(filterday[j].price)
   }
   for(let j=0;j<filterbeforemonth.length;j++){
    costbeforemonth += Number(filterbeforemonth[j].price)
   }
  //  tarikh
  for(let j=0;j<filterfar.length;j++){
    pricefar += product[j].price
    // setPricefarr(old=> old + product[j].price)
    

  }
  for(let j=0;j<filterord.length;j++){
    priceord += product[j].price

  }
  for(let j=0;j<filterkhr.length;j++){
    pricekhr += product[j].price

  }
  for(let j=0;j<filtertir.length;j++){
    pricetir += product[j].price

  }
  for(let j=0;j<filtermor.length;j++){
    pricemor += product[j].price

  }
  for(let j=0;j<filtersha.length;j++){
    pricesha += product[j].price

  }
  for(let j=0;j<filtermeh.length;j++){
    pricemeh += product[j].price

  }
  for(let j=0;j<filteraba.length;j++){
    priceaba += product[j].price

  }
  for(let j=0;j<filteraza.length;j++){
    priceaza += product[j].price

  }
  for(let j=0;j<filterdey.length;j++){
    pricedey += product[j].price

  }
  for(let j=0;j<filterbah.length;j++){
    pricebah += product[j].price

  }
  for(let j=0;j<filteresf.length;j++){
    priceesf += product[j].price

  }
  for(let j=0;j<filterfar.length;j++){
    pricefar += product[j].price

  }


   
   
  }

  return (
    <Container
      fluid
      style={{
        minWidth: 100,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Row
        className="home g-0"
        style={{ marginLeft: 0, marginRight: 0, backgroundColor: "initial" }}
      >
        <Col
          className="g-0 flex-basis-0"
          style={{
            paddingRight: 0,
            maxWidth: "100vh",
            paddingLeft: 0,
            mimWidth: "100%",
          }}
          xs={12}
          // sm={1}
          md={2}
          lg={2}
        >
          <Sidebar />
        </Col>
        <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="g-0">
          <div className="homeContainer g-0">

            <div className="widgets row">
              <Col md={6} lg={3} className="fix-col-md-6">
                <Widgets type="user" amountcar={amountcar} totalapproved={totalapproved}/>
              </Col>
              <Col md={6} lg={3} className="fix-col-md-6">
                {" "}
                <Widgets type="order" amountorder={amountorder} totalsold={totalsold} />
              </Col>
              <Col md={6} lg={3} className="fix-col-md-6">
                <Widgets type="erarning" amountearing={amountearing} totalsoldcost={totalsoldcost} />
              </Col>
              <Col md={6} lg={3} className="fix-col-md-6">
                {" "}
                <Widgets type="balance" amountbalance={amountbalance}/>
              </Col>
            </div>

            <div className="  row ">
              <Col xs={12} sm={11} md={4} className="sm-fix">
                <Featured costmonth={costmonth} costday={costday} costbeforemonth={costbeforemonth} />
              </Col>
              <Col
                xs={12}
                sm={11}
                md={8}
                style={{ maxWidth: "99%" }}
                className="sm-fix"
              >
                <Chart title={"امار کل دارایی 12 ماه گذشته"} aspect={2 / 1}    />
              </Col>
            </div>
            <div className="row listContainer">
              <Col xs={11}>
                <div className="listTitle"> اطلاعات کلی ماشین ها </div>
                <Tables product={product}/>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeDashboard;
