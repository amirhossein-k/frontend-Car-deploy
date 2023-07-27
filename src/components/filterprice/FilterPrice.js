import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import numberFormat from "number-formatierer";

import { memo } from 'react';

  
  function valuetext(value1) {
    return `ddd`;
  }
 

  const minDistance = 5000000;

const FilterPrice = ({value1, setValue1}) => {
   
  const marks = [
    {
      value: 10000000,
      label: `${numberFormat(value1[1])} تومان  | ${numberFormat(value1[0])} تومان` ,
    },
   
   
  ];
  function valueLabelFormat(value1) {
    return numberFormat(value1);
    // return marks
  }
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      } else {
        setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      }
    };
    
    

    
  return (
    <Box sx={{ width: '74%' }}>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={handleChange1}
      valueLabelDisplay='on'
      getAriaValueText={valuetext}
      disableSwap
      valueLabelFormat={valueLabelFormat}
      marks={marks}
      step={10000000}
      min={10000000}
      max={1000000000}
    />
  </Box>
  )
}

export default memo(FilterPrice)