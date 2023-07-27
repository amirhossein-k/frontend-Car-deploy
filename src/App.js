import { useState} from "react";
import "./styles.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Login from "./screens/Login";

import { useSelector } from "react-redux";
import HomeDashboard from "./pages/Dashboard/HomeDashboard/HomeDashboard";
// import Login from "./pages/Dashboard/Login/Login";
import List from "./pages/Dashboard/List/List";
import New from "./pages/Dashboard/New/New";
import Single from "./pages/Single/Single";
import ProtectedRoute from "./components/protect/ProtectedRoute";
import Detail from "./components/Dashboard/detail.js/Detail";
import Cards from "./components/Cards/Cards";
import About  from "./components/About/About";
///////////////
export default function App() {

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const [cardrun, setCardrun] = useState(false);

  return (

    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0 }}
      className="gx-0"
    >

      <Routes>
        <Route
          path="/"
          element={
            <Home
              userInfo={userInfo}
              Cards={Cards}
              cardrun={cardrun}
              setCardrun={setCardrun}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/products/:productId"
          element={<Single cardrun={cardrun} setCardrun={setCardrun} />}
        />
        <Route element={<ProtectedRoute userInfo={userInfo} />}>
          <Route path="/dashboard">
            <Route
              index
              element={
                <HomeDashboard cardrun={cardrun} setCardrun={setCardrun} />
              }
            />
            <Route path="products">
              <Route index element={<List />} />

              <Route path="new" element={<New />} />
            </Route>
            <Route path="detail" element={<Detail  cardrun={cardrun} setCardrun={setCardrun}  />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </Container>

  );
}
