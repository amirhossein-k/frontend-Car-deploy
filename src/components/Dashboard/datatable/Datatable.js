import "./datatable.scss";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  listProductAction,
  deleteProductAction,
  updateProductAction,
} from "../../../actions/productActions";
import axios from "axios";

import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import Modal from "../modal/Modal";
import ModalImages from "../modal/ModalImages";

// ......................................................

//.......................................................

const Datatable = ({setDatas, datas}) => {
  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setPer((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );
  //////////////////////////
  const columns = [
    {field: "id", headerName: "ID", width: 90},
    {
      field: "namecar",
      headerName: "خودرو",
      width: 150,
      editable: true,
    },
    {
      field: "factory",
      headerName: "کارخانه",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "سال تولید",
      width: 150,
      editable: true,
    },

    {
      field: "distance",
      headerName: "کارکرد",
      width: 150,
      editable: true,
    },

    {
      field: "pic",
      headerName: "عکس",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value[0]}
          className="img-table "
          onClick={() => handlepic(params.value[0])}
          alt=""
        />
      ),
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      editable: true,
    },
    {
      field: "skills",
      headerName: "ویژگی",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          // onClick={deleteUser(params.id)}
          onClick={deletehandle(params.id)}
        />,
        <GridActionsCellItem
          icon={<SyncIcon />}
          label="Toggle Admin"
          onClick={() => openhandle(params.id)}
        />,
      ],
    },
  ];

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {product, loading} = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;
  ////////////
  const [isOpens, setIsOpens] = useState(false);
  const [isid, setIsId] = useState("");
  const [urlpic, setUrlpic] = useState("");
  const [openpic, setOpenpic] = useState(false);
  const [loadupdate, setLoadupdate] = useState(false);
  const [update, setUpdate] = useState(false);
  /////////////////
  const [pr, setPer] = useState([]);
  const [produc, setProduc] = useState([]);
  const [title, setTitle] = useState("pic product");

  ////////////
  const [namecar, setNameCar] = useState("");
  const [factory, setFactory] = useState("");
  const [distance, setDistance] = useState("");
  const [age, setAge] = useState("");

  const [color, setColor] = useState("");
  const [fuel, setFuel] = useState("");
  const [engine, setEngine] = useState("");
  const [healthbody, setHealthbody] = useState("");
  const [garanti, setGaranti] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [scriptt, setScriptt] = useState("");

  const [skills, setSkills] = useState([]);
  const [pic, setPic] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [keysliderproductupd, setKeysliderproductupd] = useState([]);
  const [keysliderproduct, setKeysliderproduct] = useState([]);
  ///////////
  const updatehandle = (id) => {
    dispatch(updateProductAction(id));
  };

  /////////
  const openhandle = (me) => {
    setIsOpens(true);
    setIsId(me);
    var result = product.find(({id}) => id === me);
    console.log(isOpens, "isopen");
    setNameCar(result.namecar);

    setFactory(result.factory);
    setDistance(result.distance);
    setSkills(result.skills);
    setPic(result.pic);
    setStatus(result.status);
    setPrice(result.price);
    setAge(result.age);
    setKeysliderproduct(result.keysliderproduct);
    setColor(result.color);
    setEngine(result.engine);
    setGaranti(result.garanti);
    setGearbox(result.gearbox);
    setHealthbody(result.healthbody);
    setFuel(result.fuel);
    setScriptt(result?.scriptt);
  };

  const habdlepic = React.useCallback(
    (pic) => () => {
      setTimeout(() => {
        setUrlpic(pic);
        setOpenpic(true);
      });
    },
    []
  );
  ////////
  const handlepic = (pic) => {
    setUrlpic(pic);
    setOpenpic(true);
  };
  /////////////
  const deletehandle = React.useCallback(
    (id) => () => {
      setTimeout(async () => {
        try {
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

          const {data} = await axios.delete(
            "https://backend-car-deploy.vercel.app/api/uploade/deleteMultipleFile",
            title,
            config
          );
        } catch (error) {
          console.log(error);
        }
        dispatch(deleteProductAction(id));
      });
    },
    []
  );
  // ...................
  useEffect(() => {
    dispatch(listProductAction());
    if (product) {
      console.log("amad");
      setPer(product);
    }
  }, [dispatch, successDelete]);
  useEffect(() => {
    dispatch(listProductAction());
    setIsOpens(false);
  }, [update]);

  return (
    <>
      <Box sx={{height: 400, width: "100%"}}>
        {(() => {
          if (product) {
            return (
              <DataGrid
                rows={product}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
              />
            );
          } else {
            return <h1 className="loadingclass">Loading</h1>;
          }
        })()}
      </Box>
      {isOpens && (
        <Modal
          setIsOpens={setIsOpens}
          updatehandle={updatehandle}
          isid={isid}
          price={price}
          status={status}
          pic={pic}
          factory={factory}
          skills={skills}
          distance={distance}
          namecar={namecar}
          setFactory={setFactory}
          setNameCar={setNameCar}
          setDistance={setDistance}
          setSkills={setSkills}
          setPic={setPic}
          setStatus={setStatus}
          setPrice={setPrice}
          isOpens={isOpens}
          setLoadupdate={setLoadupdate}
          loadupdate={loadupdate}
          setUpdate={setUpdate}
          files={files}
          setFiles={setFiles}
          setAge={setAge}
          age={age}
          setKeysliderproduct={setKeysliderproduct}
          keysliderproduct={keysliderproduct}
          keysliderproductupd={keysliderproductupd}
          setKeysliderproductupd={setKeysliderproductupd}
          color={color}
          setColor={setColor}
          fuel={fuel}
          setFuel={setFuel}
          gearbox={gearbox}
          setGearbox={setGearbox}
          engine={engine}
          setEngine={setEngine}
          healthbody={healthbody}
          setHealthbody={setHealthbody}
          garanti={garanti}
          setGaranti={setGaranti}
          setScriptt={setScriptt}
          scriptt={scriptt}
        />
      )}
      {openpic && (
        <ModalImages
          urlpic={urlpic}
          setUrlpic={setUrlpic}
          openpic={openpic}
          setOpenpic={setOpenpic}
        />
      )}
    </>
  );
};

export default Datatable;
