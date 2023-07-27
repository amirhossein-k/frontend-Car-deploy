import "./sidebar.scss";
import {  useState } from "react";
import { Row, Col } from "react-bootstrap";
import DashboardIcon from "@mui/icons-material/Dashboard";

import StoreIcon from "@mui/icons-material/Store";

import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
///////////////////////////////
const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [clickbutton, setClickbutton] = useState(false);



  function myFunction() {
    if (window.innerWidth < 991) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  window.onresize = function () {
    myFunction();
  };
  //////////
  const menuItem = [
    {
      path: "/dashboard",
      name: "dashboard",
      icon: <DashboardIcon className="icon" />,
    },

    {
      path: "/dashboard/products",
      name: "Product",
      icon: <StoreIcon className="icon" />,
    },

    {
      path: "/dashboard/products/new",
      name: "New Post",
      icon: <NoteAltIcon className="icon" />,
    },

    {
      path: "/dashboard/detail",
      name: "Theme",
      icon: <AutoFixHighIcon className="icon" />,
    },
    {
      path: "/",
      name: "Site",
      icon: <HomeIcon className="icon" />,
    },
  ];
  return (
    <div
      className="sidebar navbar navbar-expand-md"
      style={{ width: isOpen ? null : null, minHeight: "100%" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setClickbutton(!clickbutton)}
        style={{ marginRight: 5 }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse  ${
          clickbutton ? "d-none" : "d-block"
        } `}
        id="navbarSupportedContent"
      >
        <Row
          className="top"
          style={{ height: 50, marginLeft: 0, marginRight: 0 }}
        >
          <Col>
            <span
              className="logo d-flex align-items-center justify-content-center"
              style={{ display: isOpen ? "block" : "none" }}
            >
              outo Amir
            </span>
          </Col>
        </Row>
        <hr />
        <Row className="center" style={{ marginLeft: 0, marginRight: 0 }}>
          <ul>
            {menuItem.map((item, index) => (
              <li key={index} id={item.name} className={`row`}>
                <NavLink
                  to={item.path}
                  className="link row w-100"
                  onClick={(e) => console.log("click")}
                >
                  <div className="icon d-flex justify-content-center align-items-center">{item.icon}</div>
                  <div
                    className="link_text justify-content-center align-items-center"
                    style={{ display: isOpen ? "flex" : "none" }}
                  >
                    {item.name}
                  </div>
                </NavLink>
                <ReactTooltip
                  anchorId={item.name}
                  place="bottom"
                  content={item.name}
                  className="d-xxl-none d-xl-none d-lg-none"
                />
              </li>
            ))}
          </ul>
        
        </Row>
       
      </div>
    </div>
  );
};

export default Sidebar;
