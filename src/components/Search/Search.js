import React, { useCallback, useState } from "react";
import { memo } from "react";
import {  Col} from "react-bootstrap";
import '../filterprice/filter.css'
import "../../styles/Search.css";
import FilterPrice from "../filterprice/FilterPrice";

const Search = ({

  carname,
  setCarname,

  setFactory,
  factory,
  setPrice,
  price,
  setValue1,value1,
  age,
  setAge

}) => {


  return (
    <>
      <Col xl={2} md={3} sm={3} className=" coll-search">

        <input
          id="carname"
          className="inputstyle"
          type="text"
          placeholder={"اسم ماشین"}
          value={carname}

          onChange={(e) => setCarname(e.target.value)}
        />
        <span className="effect-coll-search">
       
        </span>
      </Col>
      <Col xl={2} md={3} sm={2} className=" coll-search">
        <input
          id="factory"
          className="inputstyle"
          type="text"
          placeholder={"کارخانه"}
          value={factory}
          onChange={(e) => setFactory(e.target.value)}
        />
        <span className="effect-coll-search">
        
        </span>
      </Col>


      <Col xl={2} md={2} sm={2} className="coll-search">
      <input
          className="inputstyle"
          type="text"
          placeholder={"سال ساخت"}
          value={age}
          onChange={e=>setAge(e.target.value)}
        />
        <span className="effect-coll-search">
          
        </span>
      </Col>

      <Col xl={2} md={3} sm={3} className="coll-search " style={{paddingTop: '14px'}}>
      
         <FilterPrice value1={value1} setValue1={setValue1} />
      </Col>

    </>
  );
};

export default memo(Search) ;
