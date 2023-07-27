import { useRef } from "react";

import styles from "./modal.module.scss";
import { RiCloseLine } from "react-icons/ri";


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

///////////////////////////
const ModalImages = ({
  urlpic,

  setOpenpic,
}) => {
  ////////////////////////
  let navigate = useNavigate();
  const fileInput = useRef(null);
  
  ///////////////

  const handleclose = () => {
   
    setOpenpic(false);
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => handleclose()} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => handleclose()}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className={styles.modalContent}>
            <img src={urlpic} style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      {/* <p>hugghguhhih</p> */}
    </>
  );
};

export default ModalImages;
