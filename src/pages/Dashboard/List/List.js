import "./list.scss";
import Sidebar from "../../../components/Dashboard/sidebar/Sidebar";

import Datatable from "../../../components/Dashboard/datatable/Datatable";
import { Col } from "react-bootstrap";
const List = () => {
  return (
    <div className="list row">
      <Col sm={12} md={2} lg={2} className="fixlistnavbar">
        <Sidebar />
      </Col>

      <Col sm={12} md={10} lg={10}>
        <div className="listContainer" style={{ width: "100%", padding: 5 }}>
          <Datatable />
        </div>
      </Col>
    </div>
  );
};

export default List;
