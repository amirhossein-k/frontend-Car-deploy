import React from "react";
import "../../styles/Input.css";

const Input = ({
  setSearchInput,

  setSearchResult,
  searchInput,

  product,
  children
}) => {
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    let searchFruits = product.filter((fruit) => {
      return e.target.value !== "" && product.includes(e.target.value);
    });
    setSearchResult(searchFruits);
  };
  return (
    <>
    
      <input
        className="inputstyle"
        type="text"
        placeholder={children}
        value={searchInput}
        onChange={handleSearch}
      />

    </>
  );
};

export default Input;
