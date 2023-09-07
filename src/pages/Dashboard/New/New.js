import {useState, useRef, useEffect} from "react";
import "./new.scss";
import {Col, Row, Button, Form} from "react-bootstrap";
import {TagsInput} from "react-tag-input-component";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "../../../components/Dashboard/sidebar/Sidebar";
import {createProductAction} from "../../../actions/productActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControls from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactLoading from "react-loading";
import axios from "axios";

const New = () => {
  const [namecar, setNameCar] = useState("");
  const [factory, setFactory] = useState("");
  const [distance, setDistance] = useState("");
  const [age, setAge] = useState("");
  const [title, setTitle] = useState("pic product");
  const [skills, setSkills] = useState([]);
  const [pic, setPic] = useState([]);

  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");

  const [color, setColor] = useState("");
  const [fuel, setFuel] = useState("");
  const [engine, setEngine] = useState("");
  const [healthbody, setHealthbody] = useState("");
  const [garanti, setGaranti] = useState("");
  const [gearbox, setGearbox] = useState("");

  const [loade, setLoade] = useState(false);

  const [errorPic, setErrorPic] = useState(false);
  const [files, setFiles] = useState([]);
  const [keysliderproduct, setKeysliderproduct] = useState([]);

  ////////////////////////
  let navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  //////////////////////
  const productcrate = useSelector((state) => state.productCreate);
  const {loading, success} = productcrate;
  /////////////////////
  useEffect(() => {
    if (success === true) {
      dispatch(createProductAction());
      navigate("/dashboard/products");
    }
  }, [success]);

  //////////////////////////
  const postDetails = async (e) => {
    e.preventDefault();
    setLoade(true);

    const formData = new FormData();

    Object.values(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);

    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const {data} = await axios.post(
        "https://backend-car-deploy.vercel.app/api/uploade/multipleFiles",
        formData,
        config
      );

      data.file.map((item) => {
        setPic((oldpic) => [...oldpic, `${item.filePath.toString()}`]);
        setKeysliderproduct((oldkey) => [
          ...oldkey,
          `${item.fileKey.toString()}`,
        ]);
      });

      setLoade(false);
      setErrorPic(false);
    } catch (error) {
      console.log(error);
    }
  };

  //////////////
  const resetHandler = () => {
    setNameCar("");
    setFactory("");
    setDistance("");
    setStatus(null);
    setPrice("");
    setAge("");

    setColor("");
    setFuel("");
    setEngine("");
    setHealthbody("");
    setGaranti("");
    setGearbox("");

    setSkills((prevskill) => prevskill.splice(0, prevskill.length));
    setKeysliderproduct((oldkey) => oldkey.splice(0, oldkey.length));

    fileInput.current.value = null;
    setPic((prevpic) => prevpic.splice(0, prevpic.length));
  };
  ///////////////
  const submitHandler = (e) => {
    e.preventDefault();
    if (!namecar || !factory || !distance || !skills) return;
    if (pic === undefined || pic === null || pic === "") {
      setErrorPic(true);
    } else {
      dispatch(
        createProductAction(
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
          gearbox
        )
      );
      resetHandler();
    }
  };

  ///////////////

  return (
    <Row className="new">
      <Col sm={12} md={2} lg={1} className="fixlistnavbar">
        <Sidebar />
      </Col>

      <Col className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        {loading && (
          <div className="loading">
            <ReactLoading
              type={"bubbles"}
              color="#000"
              height={500}
              width={500}
            />
          </div>
        )}

        <div className="bottom-new">
          <div className="row"></div>

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

          {errorPic && <p>عکس انتخاب کنید</p>}
          <Form className="formfix" onSubmit={submitHandler}>
            <div className="form-1">
              <Form.Group controlId="titlecar" style={{width: "100%"}}>
                <Form.Label>نام خودرو</Form.Label>
                <Form.Control
                  type="text"
                  value={namecar}
                  placeholder="نام خودرو"
                  onChange={(e) => setNameCar(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="factory" style={{width: "100%"}}>
                <Form.Label>نام کارخانه</Form.Label>
                <Form.Control
                  type="text"
                  value={factory}
                  placeholder="نام کارخانه"
                  onChange={(e) => setFactory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="distance" style={{width: "100%"}}>
                <Form.Label>کارکرد</Form.Label>
                <Form.Control
                  type="number"
                  value={distance}
                  placeholder="کارکرد"
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="form-2 row">
              <Col md={5} lg={4}>
                <Form.Group controlId="distance" style={{width: "100%"}}>
                  <Form.Label>سال تولید</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    placeholder="سال تولید"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </div>

            {/* new */}
            <div className="form-1 ">
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
            <div className="form-1">
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
            <div className="form-1">
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

            <div className="form-2 row">
              <Col md={5} lg={4}>
                <Form.Label> ویژگی </Form.Label>
                <TagsInput
                  value={skills}
                  onChange={setSkills}
                  placeHolder="ویژگی"
                />
              </Col>
              <Col md={5} lg={4}>
                <FormControls
                  sx={{margin: "32px 8px", minWidth: 120, display: "flex"}}
                  size="small"
                >
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
              </Col>
              <Col>
                <Form.Group controlId="price" style={{alignItems: "center"}}>
                  <Form.Label style={{paddingRight: 5}}>قیمت</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    placeholder="قیمت"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </div>

            <div className="button-new">
              <Button
                type="submit"
                variant="primary"
                className={`${pic.length > 0 ? "create-new" : "disabled"}`}
              >
                Create Note
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default New;
