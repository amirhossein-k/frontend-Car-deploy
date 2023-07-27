import "./tables.scss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";

import {  Miladi } from "basic-shamsi";

////////////


const Tables = ({product}) => {


  useEffect(()=>{
 
  },[product])


  return (

    <TableContainer component={Paper} className="table" >
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">تاریخ ثبت</TableCell>
            <TableCell className="tableCell">محصول</TableCell>
         
            <TableCell className="tableCell">شرکت</TableCell>
            <TableCell className="tableCell">کارکرد</TableCell>
            <TableCell className="tableCell">وضعیت</TableCell>
            <TableCell className="tableCell">قیمت</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {product &&  product.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell >
                {(()=>{
                   var one = row.date.slice(0, 10);
                   var two = one.replaceAll("-", "/");
                   return Miladi.toShamsi(two);
                })()}
              </TableCell>
             
                <TableCell className="tableCell">
                <div className="cellWrapper">
                    <img src={row.pic[0]} className="image"/>
                    {row.namecar}
                </div>
            </TableCell>
              <TableCell className="tableCell" >{row.factory}</TableCell>
              <TableCell className="tableCell" >{row.distance}</TableCell>
              <TableCell className="tableCell" >
                <span className={` status ${row.statusEn}`}>{(()=>{
                  if(row.status==='sold')  return 'فروخته شده'  
                  if(row.status==='approved')  return"موجود" 
                })()}</span>
              </TableCell>
              <TableCell className="tableCell" > {(()=>{
                      let indexx = row.price.indexOf('.')
                      
                        return <span dir="rtl">   {row.price.substr(0,indexx)} میلیون {row.price.substr(indexx+1,row.price.length) + "00"} هزار تومان</span>
                        
                        
                       
                    })()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default Tables;
