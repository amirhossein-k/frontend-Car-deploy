import React, {useState, useRef, useEffect} from "react";

import styles from "./modal.module.scss";
import {RiCloseLine} from "react-icons/ri";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControls from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Button, Form} from "react-bootstrap";
import {TagsInput} from "react-tag-input-component";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProductAction} from "../../../actions/productActions";
import axios from "axios";

///////////////////////////
const Modal = ({
  setIsOpens,
  updatehandle,
  isid,
  price,
  status,
  pic,
  factory,
  skills,
  distance,
  namecar,
  setFactory,
  setNameCar,
  setDistance,
  setSkills,
  setPic,
  setStatus,
  setPrice,
  isform,
  urlpic,
  setUrlpic,
  setOpenpic,
  openpic,
  isOpens,
  setLoadupdate,
  loadupdate,
  setUpdate,
  files,
  setFiles,
  setAge,
  age,
  setKeysliderproduct,
  keysliderproduct,
  keysliderproductupd,
  setKeysliderproductupd,
  color,
  setColor,
  fuel,
  setFuel,
  gearbox,
  setGearbox,
  engine,
  setEngine,
  healthbody,
  setHealthbody,
  garanti,
  setGaranti,
  scriptt,
  setScriptt,
}) => {
  ////////////////////////
  const [title, setTitle] = useState("pic product");
  const [keys, setKeys] = useState([]);
  const [changephoto, setChangephoto] = useState(false);

  //////////////////////////
  let navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  ///////////////
  const productupdate = useSelector((state) => state.productUpdate);
  const {loading, success} = productupdate;
  //////////////
  const [loadpic, setLoadpic] = useState(false);
  const [load, setLoad] = useState(false);
  const postDetails = async (e) => {
    e.preventDefault();
    setLoadpic(true);
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("key", keysliderproduct);

    ///////

    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const {data} = await axios.put(
        "https://backend-car-deploy.vercel.app/api/uploade/updateMultipleFile",
        formData,
        config
      );

      setPic([]);
      data.file.map((item) => {
        setPic((oldpic) => [...oldpic, `${item.filePath.toString()}`]);
        setKeysliderproductupd((oldkey) => [
          ...oldkey,
          `${item.fileKey.toString()}`,
        ]);
      });

      setLoadpic(false);
    } catch (error) {
      console.log(error);
    }
  };
  /////////
  const resetHandler = async (e) => {
    setNameCar("");
    setFactory("");
    setDistance("");
    setStatus(null);
    setPrice("");
    setAge("");

    // ///////////

    if (keysliderproduct.length !== 0)
      setKeysliderproduct((oldkey) => oldkey.splice(0, oldkey.length));
    setSkills((prevskill) => prevskill.splice(0, prevskill.length));

    fileInput.current.value = null;
  };

  ////////////////
  const submitHandler = (e) => {
    setLoad(true);
    e.preventDefault();
    if (!namecar || !factory || !distance || !skills) return;
    console.log(age, "age");
    dispatch(
      updateProductAction(
        isid,
        namecar,
        factory,
        distance,
        skills,
        pic,
        price,
        status,
        age,
        color,
        fuel,
        engine,
        healthbody,
        garanti,
        gearbox,
        scriptt
      )
    );

    resetHandler();
    setUpdate(false);
  };

  const handleclose = () => {
    setIsOpens(false);
  };

  useEffect(() => {
    if (success === true) {
      dispatch(updateProductAction());
      setUpdate(true);
    }
  }, [success]);

  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => handleclose()}>
            <RiCloseLine style={{marginBottom: "-3px"}} />
          </button>
          {isOpens && (
            <div className={styles.modalContent}>
              <div className="top">
                <h1>Add New Product</h1>
              </div>

              <div className="bottom-new">
                {pic ? (
                  <div className={styles.image_box}>
                    {pic.map((item, index) => {
                      return (
                        <img src={item} key={index} style={{width: 150}} />
                      );
                    })}
                  </div>
                ) : (
                  <p>no photo</p>
                )}

                <Form className="formfix" onSubmit={postDetails}>
                  <div className="form-0">
                    <Form.Group controlId="pic">
                      <Form.Label>اطلاعات محصول</Form.Label>
                      <Form.Control
                        type="file"
                        name="files"
                        onChange={(e) => setFiles(e.target.files)}
                        ref={fileInput}
                        multiple
                        accept=".jpeg, .png, .jpg"
                      />
                    </Form.Group>
                  </div>
                  <div className="button-new">
                    <Button
                      type="submit"
                      variant="primary"
                      className={"create-new"}
                      style={{marginLeft: 2}}
                    >
                      ذخیره عکس ها
                    </Button>
                  </div>
                </Form>

                <Form className={styles.formfix} onSubmit={submitHandler}>
                  <div className={styles.form_1}>
                    <Form.Group
                      controlId="titlecar"
                      style={{width: "90%", marginRight: 6}}
                    >
                      <Form.Label>نام خودرو</Form.Label>
                      <Form.Control
                        type="text"
                        value={namecar}
                        placeholder="نام خودرو"
                        onChange={(e) => setNameCar(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="factory"
                      style={{width: "90%", marginRight: 6}}
                    >
                      <Form.Label>نام کارخانه</Form.Label>
                      <Form.Control
                        type="text"
                        value={factory}
                        placeholder="نام کارخانه"
                        onChange={(e) => setFactory(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="distance" style={{width: "90%"}}>
                      <Form.Label>کارکرد </Form.Label>
                      <Form.Control
                        type="number"
                        value={distance}
                        placeholder="کارکرد"
                        onChange={(e) => setDistance(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className={styles.form_1}>
                    <Form.Group controlId="color" style={{width: "100%"}}>
                      <Form.Label>رنگ</Form.Label>
                      <Form.Control
                        type="text"
                        value={color}
                        placeholder="رنگ"
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="fuel" style={{width: "100%"}}>
                      <Form.Label>نوع سوخت</Form.Label>
                      <Form.Control
                        type="text"
                        value={fuel}
                        placeholder="نوع سوخت"
                        onChange={(e) => setFuel(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className={styles.form_1}>
                    <Form.Group controlId="engine" style={{width: "100%"}}>
                      <Form.Label>وضعیت موتور</Form.Label>
                      <Form.Control
                        type="text"
                        value={engine}
                        placeholder="وضعیت موتور"
                        onChange={(e) => setEngine(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="healthbody" style={{width: "100%"}}>
                      <Form.Label>وضعیت شاسی</Form.Label>
                      <Form.Control
                        type="text"
                        value={healthbody}
                        placeholder="وضعیت شاسی"
                        onChange={(e) => setHealthbody(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className={styles.form_1}>
                    <Form.Group controlId="garanti" style={{width: "100%"}}>
                      <Form.Label>مهلت بیمه شخص ثالث</Form.Label>
                      <Form.Control
                        type="text"
                        value={garanti}
                        placeholder="مهلت بیمه شخص ثالث"
                        onChange={(e) => setGaranti(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="gearbox" style={{width: "100%"}}>
                      <Form.Label>گریبکس</Form.Label>
                      <Form.Control
                        type="text"
                        value={gearbox}
                        placeholder="گریبکس"
                        onChange={(e) => setGearbox(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className={styles.form_2}>
                    <Form.Group controlId="age" style={{width: "90%"}}>
                      <Form.Label>سال تولید</Form.Label>
                      <Form.Control
                        type="number"
                        value={age}
                        placeholder="سال تولید"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="form-2">
                    <TagsInput
                      value={skills}
                      onChange={setSkills}
                      name="skills"
                      placeHolder="ویژگی"
                    />

                    <FormControls sx={{m: 1, minWidth: 120}} size="small">
                      <InputLabel id="demo-select-small">وضعیت</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={status}
                        label="وضعیت"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value={"null"}></MenuItem>
                        <MenuItem value={"approved"}>موجود</MenuItem>
                        <MenuItem value={"sold"}>ناموجود</MenuItem>
                      </Select>
                    </FormControls>
                    <Form.Group
                      controlId="price"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        width: "28%",
                        maxWidth: "100%",
                        position: "relative",

                        transform: "translate(122%)",
                      }}
                    >
                      <Form.Label>قیمت</Form.Label>
                      <Form.Control
                        type="text"
                        value={price}
                        placeholder="قیمت"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>script</Form.Label>
                      <Form.Control
                        type="text"
                        value={scriptt}
                        placeholder="script"
                        onChange={(e) => setScriptt(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="button-new">
                    <Button
                      type="submit"
                      variant="primary"
                      className={`create-new ${
                        loadpic ? "disabled" : "inline-block"
                      }`}
                    >
                      اپدیت
                    </Button>
                    <Button
                      className="mx-2"
                      onClick={resetHandler}
                      variant="danger"
                    >
                      ریست
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}
          {isOpens && (
            <div className={styles.modalContent}>
              <img src={urlpic} style={{width: 200}} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
