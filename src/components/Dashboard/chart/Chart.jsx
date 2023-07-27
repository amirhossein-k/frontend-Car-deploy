import "./chart.scss";
import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState,useEffect } from "react";
import {  Miladi } from "basic-shamsi";
import { useSelector } from "react-redux";

//////////
/////////
const Chart = ({aspect,title}) => {
  

  const [pricefarr,setPricefarr]=useState('')
  const [priceordd,setPriceordd]=useState('')
  const [pricekhoo,setPricekhoo]=useState('')
  const [pricetirr,setPricetirr]=useState('')
  const [pricemorr,setPricemorr]=useState('')
  const [priceshaa,setPriceshaa]=useState('')
  const [pricemehh,setPricemehh]=useState('')
  const [priceabaa,setPriceabaa]=useState('')
  const [priceazarr,setPriceazarr]=useState('')
  const [pricedeyy,setPricedeyy]=useState('')
  const [pricebahh,setPricebahh]=useState('')
  const [priceesff,setPriceesff]=useState('')

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

  
  const [tarikh,setTarikh] = useState([])
  const productList = useSelector((state) => state.productList);
  const { product, loading } = productList;
  
  useEffect(()=>{
    
    if(product){
    
      product.map((item,indexitem)=>{
        for (const [key, value] of Object.entries(item)) {
          if(key==="date"){
            var one = value.slice(0, 10);
           var two = one.replaceAll("-", "/");
           setTarikh(oldtarikh => [...oldtarikh,Miladi.toShamsi(two) ])
          //  
           var tar = Miladi.toShamsi(two)
            if(tar.slice(5,7)==="01"){
              filterfar.push(item)
            }
            if(tar.slice(5,7)=== '02'){
              filterord.push(item)
      
            }
            if(tar.slice(5,7)=== '03'){
              filterkhr.push(item)
      
            }
            if(tar.slice(5,7)=== '04'){
              filtertir.push(item)
      
            }
            if(tar.slice(5,7)=== '05'){
              filtermor.push(item)
      
            }
            if(tar.slice(5,7)=== '06'){
              filtersha.push(item)
      
            }
            if(tar.slice(5,7)=== '07'){
              filtermeh.push(item)
      
            }
            if(tar.slice(5,7)=== '08'){
              filteraba.push(item)
      
            }
            if(tar.slice(5,7)=== '09'){
              filteraza.push(item)
      
            }
            if(tar.slice(5,7)=== '10'){
              filterdey.push(item)
      
            }
            if(tar.slice(5,7)=== '11'){
              filterbah.push(item)
      
            }
            if(tar.slice(5,7)=== '12'){
              filteresf.push(item)
      
            }
          }
         
        }
      })
      setPricefarr('')
      setPriceordd('')
      setPricekhoo('')
      setPricetirr('')
      setPricemorr('')
      setPriceshaa('')
      setPricemehh('')
      setPriceabaa('')
      setPriceazarr('')
      setPricedeyy('')
      setPricebahh('')
      setPriceesff('')
      filterfar.map(item=>setPricefarr(old=>Number(old)+ Number(item.price)))
      filterord.map(item=>setPriceordd(old=>Number(old)+ Number(item.price)))
      filterkhr.map(item=>setPricekhoo(old=>Number(old)+ Number(item.price)))
      filtertir.map(item=>setPricetirr(old=>Number(old)+ Number(item.price)))
      filtermor.map(item=>setPricemorr(old=>Number(old)+ Number(item.price)))
      filtersha.map(item=>setPriceshaa(old=>Number(old)+ Number(item.price)))
      filtermeh.map(item=>setPricemehh(old=>Number(old)+ Number(item.price)))
      filteraba.map(item=>setPriceabaa(old=>Number(old)+ Number(item.price)))
      filteraba.map(item=>setPriceazarr(old=>Number(old)+ Number(item.price)))
      filterdey.map(item=>setPricedeyy(old=>Number(old)+ Number(item.price)))
      filterbah.map(item=>setPricebahh(old=>Number(old)+ Number(item.price)))
      filteresf.map(item=>setPriceesff(old=>Number(old)+ Number(item.price)))

      
    }
  },[loading])

  const data = [
    {name:'فروردین' , Total:pricefarr},
    {name:'اردیبهشت' , Total:priceordd},
    {name:'خرداد' , Total:pricekhoo},
    {name:'تیر' , Total:pricetirr},
    {name:'مرداد' , Total:pricemorr},
    {name:'شهریور' , Total:priceshaa},
    {name:'مهر' , Total:pricemehh},
    {name:'ابان' , Total:priceabaa},
    {name:'اذر' , Total:priceazarr},
    {name:'دی' , Total:pricedeyy},
    {name:'بهمن' , Total:pricebahh},
    {name:'اسفند' , Total:priceesff},
  ];
  

  return (
    
  <div className="chart">
    <div className="title">{title} </div>
    {product && (

      <ResponsiveContainer width="100%" height='100%' aspect={aspect}>
      <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)"/>

      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Total"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        
      />

    </LineChart>
</ResponsiveContainer>
    )}
  </div>
  )
};

export default Chart;
