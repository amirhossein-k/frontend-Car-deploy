import {useState, useRef, useEffect} from "react";
import "./detail.scss";
import {Col, Row, Button, Form} from "react-bootstrap";

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "../../../components/Dashboard/sidebar/Sidebar";
import {
  createDetailAction,
  getDetailAction,
  updateDetailAction,
} from "../../../actions/detailActions";
import axios from "axios";
///////////////////////////
const Detail = ({setCardrun, cardrun}) => {
  let navigate = useNavigate();
  const fileprofile_Input = useRef(null);
  const fileheader_Input = useRef(null);
  const fileslider_Input = useRef(null);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState([]);
  const [header_img, setHeader_img] = useState("");
  const [profile_img, setProfile_img] = useState("");
  ///
  const [times_1, setTimes_1] = useState("");
  const [times_2, setTimes_2] = useState("");
  const [times_3, setTimes_3] = useState("");

  const [social_phone, setSocial_phone] = useState("");
  const [social_address, setSocial_address] = useState("");
  const [social_ig, setSocial_ig] = useState("");

  const [slider_img, setSlider_img] = useState([]);

  // const [social, setSocial] = useState([]);

  const [loade, setLoade] = useState(false);
  const [dataget, setDataget] = useState(false);
  const [errorPic, setErrorPic] = useState(false);

  const [id, setid] = useState();

  //
  const [titleSlider, setTitleSlider] = useState("pic slider");
  const [titleProfile, setTitleProfile] = useState("pic profile");
  const [titleHeader, setTitleHeader] = useState("pic header");
  const [filesProfile, setFilesProfile] = useState();
  const [filesHeader, setFilesHeader] = useState();
  const [filesSilder, setFilesSilder] = useState([]);
  const [keys, setKeys] = useState([]);
  const [keysProfile, setKeysProfile] = useState("");
  const [keysHeader, setKeysHeader] = useState("");
  const [keysSlider, setKeysSlider] = useState([]);
  const [keysProfileupd, setKeysProfileupd] = useState("");
  const [keysHeaderupd, setKeysHeaderupd] = useState("");
  const [keysSliderupd, setKeysSliderupd] = useState([]);

  /////////////////////////

  const detailget = useSelector((state) => state.detailget);
  const {loading: loadingGet, success: successGet, detail} = detailget;
  ////////////////////////////

  useEffect(() => {
    setCardrun(true);
  }, []);

  useEffect(() => {
    if (cardrun === true) {
      dispatch(getDetailAction());

      setCardrun(false);
    }
  }, [cardrun]);

  useEffect(() => {
    if (detail) {
      var slied = [];

      detail.slider_img.map((item) => slied.push(item));
      setHeader_img(detail.header_img);
      setProfile_img(detail.profile_img);
      setTitle(detail.title);
      setSubtitle(detail.subtitle);

      setSlider_img(slied);
      setTimes_1(detail.times_1);
      setTimes_2(detail.times_2);
      setTimes_3(detail.times_3);
      setSocial_address(detail.social_address);
      setSocial_phone(detail.social_phone);
      setSocial_ig(detail.social_ig);
      setDataget(true);
      setid(detail.id);

      setKeysProfileupd(detail.keyprofile);
      setKeysHeaderupd(detail.keyheader);
      setKeysSliderupd(detail.keyslider);
    }
  }, [detail, loadingGet]);

  /////////////////////////////

  if (successGet === true) {
    if (
      Object.keys(detail).length !== 0 &&
      Object.getPrototypeOf(detail) === Object.prototype
    ) {
    }
  }
  //////////////////////////
  const resetHandler = () => {
    setTitle("");

    setSubtitle("");
    setHeader_img("");
    setProfile_img("");
    setSlider_img((prevslider_img) =>
      prevslider_img.splice(0, prevslider_img.length)
    );
    setSlider_img([]);
    setTimes_1("");
    setTimes_2("");
    setTimes_3("");
    setSocial_phone("");
    setSocial_address("");
    setSocial_ig("");
    setKeysSlider((prevslide) => prevslide.splice(0, prevslide.length));

    setKeysProfile("");
    setKeysHeader("");
    setKeysSliderupd((prevslide) => prevslide.splice(0, prevslide.length));

    setKeysProfileupd("");
    setKeysHeaderupd("");
    fileprofile_Input.current.value = null;
    fileheader_Input.current.value = null;
    fileslider_Input.current.value = null;
  };

  const picDetails = async (e) => {
    e.preventDefault();

    if (detail) {
      if (detail.profile_img.length !== 0) {
        setLoade(true);
        ///////picprofile
        if (fileprofile_Input.current.id === "picprofile") {
          console.log(filesProfile, "filleee");
          if (filesProfile) {
            const formData = new FormData();

            formData.append("file", filesProfile);
            formData.append("title", titleProfile);
            formData.append("key", keysProfileupd);
            try {
              const config = {
                headers: {
                  "content-type": "multipart/form-data",
                },
              };

              const {data} = await axios.put(
                "https://backend-car-deploy.vercel.app/api/uploade/updateSingleFile",
                formData,
                config
              );
              console.log(data, "datapic");
              console.log(data.file.filePath, "datapic file path");
              if (data) {
                setProfile_img(`${data.file.filePath.toString()}`);
                setKeysProfile(`${data.file.fileKey.toString()}`);
              }
              setLoade(false);
              setErrorPic(false);
            } catch (error) {
              console.log(error);
            }
          }
        }
        setLoade(false);
      } else {
        setLoade(true);
        ///////picprofile
        if (fileprofile_Input.current.id === "picprofile") {
          const formData = new FormData();

          formData.append("file", filesProfile);
          formData.append("title", titleProfile);
          try {
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };

            const {data} = await axios.post(
              "https://backend-car-deploy.vercel.app/api/uploade/singleFile",
              formData,
              config
            );
            console.log(data, "datapic");
            setKeysProfile(`${data.file.fileKey.toString()}`);
            console.log(keys, "keys");
            console.log(data.file.fileKey, "keysfile");
            console.log(data.file.filePath, "datapic file path");
            setProfile_img(`${data.file.filePath.toString()}`);
            setLoade(false);
            setErrorPic(false);
          } catch (error) {
            console.log(error);
          }
        }
        setLoade(false);
      }

      if (detail.header_img.length !== 0) {
        ////////pic header
        if (fileheader_Input.current.id === "picheader") {
          if (filesHeader) {
            const formData = new FormData();

            formData.append("file", filesHeader);
            formData.append("title", titleHeader);
            formData.append("key", keysHeaderupd);
            try {
              const config = {
                headers: {
                  "content-type": "multipart/form-data",
                },
              };

              const {data} = await axios.put(
                "https://backend-car-deploy.vercel.app/api/uploade/updateSingleFile",
                formData,
                config
              );
              setHeader_img(`${data.file.filePath.toString()}`);
              setKeysHeader(`${data.file.fileKey.toString()}`);

              console.log(header_img, "header up");
              setLoade(false);
              setErrorPic(false);
            } catch (error) {
              console.log(error);
            }
          }
        }

        setLoade(false);
      } else {
        if (fileheader_Input.current.id === "picheader") {
          const formData = new FormData();

          formData.append("file", filesHeader);
          formData.append("title", titleHeader);
          try {
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };

            const {data} = await axios.post(
              "https://backend-car-deploy.vercel.app/api/uploade/singleFile",
              formData,
              config
            );
            setKeysHeader(`${data.file.fileKey.toString()}`);

            setHeader_img(`${data.file.filePath.toString()}`);
            setLoade(false);
            setErrorPic(false);
          } catch (error) {
            console.log(error);
          }
        }
        setLoade(false);
      }
      if (detail.slider_img.length !== 0) {
        ////pic slider
        if (fileslider_Input.current.id === "picslider") {
          if (fileslider_Input.current.files.length !== 0) {
            const formData = new FormData();

            console.log(detail.keyslider, "slide key detail");
            console.log(keysSlider, "slide key ");
            Object.values(filesSilder).forEach((file) => {
              formData.append("files", file);
            });
            formData.append("title", titleSlider);

            formData.append("key", keysSliderupd);

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
              setKeysSlider((prevslide) =>
                prevslide.splice(0, prevslide.length)
              );
              setSlider_img([]);

              data.file.map((item) => {
                setSlider_img((oldpic) => [
                  ...oldpic,
                  `${item.filePath.toString()}`,
                ]);
                setKeysSlider((oldkey) => [
                  ...oldkey,
                  `${item.fileKey.toString()}`,
                ]);
              });

              console.log(slider_img, "silder up create");
              setLoade(false);
              setErrorPic(false);
            } catch (error) {
              console.log(error);
            }
          }
        }
        setLoade(false);
      } else {
        if (fileslider_Input.current.id === "picslider") {
          const formData = new FormData();

          Object.values(filesSilder).forEach((file) => {
            formData.append("files", file);
          });
          formData.append("title", titleSlider);

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

            setKeysSlider((prevslide) => prevslide.splice(0, prevslide.length));
            console.log(keysSlider, "keysslider");
            data.file.map((item) => {
              setSlider_img((oldpic) => [
                ...oldpic,
                `${item.filePath.toString()}`,
              ]);
              setKeysSlider((oldkey) => [
                ...oldkey,
                `${item.fileKey.toString()}`,
              ]);
            });

            console.log(slider_img, "slider img update");
            setLoade(false);
            setErrorPic(false);
          } catch (error) {
            console.log(error);
          }
        }
        setLoade(false);
      }
    } else {
      setLoade(true);
      ///////picprofile
      if (fileprofile_Input.current.id === "picprofile") {
        const formData = new FormData();

        formData.append("file", filesProfile);
        formData.append("title", titleProfile);
        try {
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

          const {data} = await axios.post(
            "https://backend-car-deploy.vercel.app/api/uploade/singleFile",
            formData,
            config
          );

          setKeysProfile(`${data.file.fileKey.toString()}`);

          setProfile_img(`${data.file.filePath.toString()}`);
          setLoade(false);
          setErrorPic(false);
        } catch (error) {
          console.log(error);
        }
      }
      if (fileheader_Input.current.id === "picheader") {
        const formData = new FormData();

        formData.append("file", filesHeader);
        formData.append("title", titleHeader);
        try {
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

          const {data} = await axios.post(
            "https://backend-car-deploy.vercel.app/api/uploade/singleFile",
            formData,
            config
          );
          setKeysHeader(`${data.file.fileKey.toString()}`);

          setHeader_img(`${data.file.filePath.toString()}`);
          setLoade(false);
          setErrorPic(false);
        } catch (error) {
          console.log(error);
        }
      }
      if (fileslider_Input.current.id === "picslider") {
        const formData = new FormData();

        Object.values(filesSilder).forEach((file) => {
          formData.append("files", file);
        });
        formData.append("title", titleSlider);

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

          setKeysSlider((prevslide) => prevslide.splice(0, prevslide.length));
          data.file.map((item) => {
            setSlider_img((oldpic) => [
              ...oldpic,
              `${item.filePath.toString()}`,
            ]);
            setKeysSlider((oldkey) => [
              ...oldkey,
              `${item.fileKey.toString()}`,
            ]);
          });
          setLoade(false);
          setErrorPic(false);
        } catch (error) {
          console.log(error);
        }
      }
      setLoade(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (dataget === true) {
      dispatch(
        updateDetailAction(
          header_img,
          profile_img,
          title,
          subtitle,
          slider_img,
          times_1,
          times_2,
          times_3,
          social_phone,
          social_address,
          social_ig,
          keysProfile,
          keysHeader,
          keysSlider,
          id
        )
      );
      resetHandler();
    } else {
      if (
        header_img === undefined ||
        header_img === null ||
        header_img === "" ||
        slider_img === undefined ||
        slider_img === null ||
        slider_img === ""
      ) {
        setErrorPic(true);
      } else {
        dispatch(
          createDetailAction(
            header_img,
            profile_img,
            title,
            subtitle,
            slider_img,
            times_1,
            times_2,
            times_3,
            social_phone,
            social_address,
            social_ig,
            keysProfile,
            keysHeader,
            keysSlider
          )
        );
        resetHandler();
      }
    }
    navigate("/dashboard");
  };

  ////////////////////////
  return (
    <Row className="detail">
      <Col sm={12} md={2} lg={1} className="fixlistnavbar">
        <Sidebar />
      </Col>

      <Col className="newContainer">
        {dataget && (
          <>
            <Row className="profile_box">
              <Col className="box" xs={3}>
                <span>Profile</span>
                <img src={profile_img} alt="" />
              </Col>
              <Col className="box" xs={3}>
                <span style={{backgroundColor: "#787878"}}>Header</span>
                <img src={header_img} alt="" />
              </Col>
            </Row>
            <Row className="slider_box">
              <span>slider</span>
              <div className="box_img">
                {slider_img.map((item, index) => (
                  <Col className="box">
                    <img
                      src={item}
                      alt=""
                      key={index}
                      style={{width: "100%"}}
                    />
                  </Col>
                ))}
              </div>
            </Row>
          </>
        )}
        <div className="top">
          <h1>تنظیمات ظاهر وبسایت</h1>
        </div>
        <div className="bottom-new">
          <Form className="formfix" onSubmit={picDetails}>
            <Row className="form-header">
              <Col xs={9}>
                <Form.Group controlId="picprofile">
                  <Form.Label>عکس پروفایل</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFilesProfile(e.target.files[0])}
                    name="file"
                    ref={fileprofile_Input}
                    accept=".jpeg, .png, .jpg"
                    className={`${
                      loade === true ? "disabled" : "block-detail"
                    }`}
                  />
                </Form.Group>
              </Col>

              <Col xs={9}>
                <Form.Group controlId="picheader">
                  <Form.Label>عکس هدر سایت</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFilesHeader(e.target.files[0])}
                    name="file"
                    ref={fileheader_Input}
                    accept=".jpeg, .png, .jpg"
                    className={`${
                      loade === true ? "disabled" : "block-detail"
                    }`}
                  />
                </Form.Group>
              </Col>
              <Col xs={9}>
                <Form.Group controlId="picslider">
                  <Form.Label>تصاویر اسلاید ها</Form.Label>
                  <Form.Control
                    type="file"
                    name="files"
                    onChange={(e) => setFilesSilder(e.target.files)}
                    className={`${
                      loade === true ? "disabled" : "block-detail"
                    }`}
                    ref={fileslider_Input}
                    multiple
                    accept=".jpeg, .png, .jpg,.mp4"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="button-new">
              <Button
                type="submit"
                variant="primary"
                className={`${loade === true ? "disabled" : "create-new"}`}
              >
                آپلود عکس ها
              </Button>
            </div>
          </Form>

          <Form className="formfix" onSubmit={submitHandler}>
            <Row className="form-header">
              <Row style={{maxWidth: "58%"}}>
                <Col xs={12} sm={6}>
                  <Form.Group controlId="title">
                    <Form.Label>اسم سایت</Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      placeholder="اسم سایت را وارد کنید"
                      onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group controlId="subtitle">
                    <Form.Label> توضیحات صفحه اول</Form.Label>
                    <Form.Control
                      type="text"
                      value={subtitle}
                      placeholder="توضیحات...."
                      onChange={(e) => setSubtitle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Row>

            <Row className="form-slider"></Row>
            <Row className="form-begin">
              <Col xs={12} sm={4}>
                <Form.Group controlId="times_1">
                  <Form.Label>شنبه تا چهارشنبه</Form.Label>
                  <Form.Control
                    type="text"
                    value={times_1}
                    placeholder="ساعت کاری شنبه تا چهارشنبه"
                    onChange={(e) => setTimes_1(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={4}>
                <Form.Group controlId="times_2">
                  <Form.Label>ساعت کاری پنجشنبه ها</Form.Label>
                  <Form.Control
                    type="text"
                    value={times_2}
                    placeholder="ساعت کاری پنجشنبه ها "
                    onChange={(e) => setTimes_2(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={4}>
                <Form.Group controlId="times_3">
                  <Form.Label>ساعت کاری جمعه ها</Form.Label>
                  <Form.Control
                    type="text"
                    value={times_3}
                    placeholder="ساعت کاری جمعه ها"
                    onChange={(e) => setTimes_3(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="form-social">
              <Col xs={12} sm={4}>
                <Form.Group controlId="social_phone">
                  <Form.Label>تلفن</Form.Label>
                  <Form.Control
                    type="text"
                    value={social_phone}
                    placeholder="تلفن"
                    onChange={(e) => setSocial_phone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={4}>
                <Form.Group controlId="social_address">
                  <Form.Label>ادرس</Form.Label>
                  <Form.Control
                    type="text"
                    value={social_address}
                    placeholder="ادرس"
                    onChange={(e) => setSocial_address(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={4}>
                <Form.Group controlId="social_ig">
                  <Form.Label>ایدی اینستاگرام</Form.Label>
                  <Form.Control
                    type="text"
                    value={social_ig}
                    placeholder="ایدی اینستاگرام"
                    onChange={(e) => setSocial_ig(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className="button-new">
              <Button type="submit" variant="primary" className="create-new">
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
export default Detail;
