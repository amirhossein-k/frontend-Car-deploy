import "./widgets.scss";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
const Widgets = ({ type,amountbalance,totalapproved,totalsold,totalsoldcost }) => {
  let data;

  ////
  switch (type) {
    case "user":
      data = {
        title: "ماشین های موجود",
        isMoney: false,
  
        amount: totalapproved,
        icon: (
          <DirectionsCarFilledOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "تعداد فروخته شده ها",
        isMoney: false,

        amount: totalsold,
        icon: (
          <ShoppingCartIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "erarning":
      data = {
        title: "درامد از فروش",
        isMoney: true,

        amount:totalsoldcost,
        icon: (
          <MonetizationOnIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "مقدار کومیسیون",
        isMoney: true,
        amount:amountbalance,
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgb(193 202 89 / 56%)",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
 
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
