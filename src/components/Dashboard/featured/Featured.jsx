import "./featured.scss";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Featured = ({costmonth,costday,costbeforemonth}) => {
  let percent = (costday / costmonth) *100 
  let textpercent = percent.toString().slice(0,5)
  let difcost = costmonth - costbeforemonth
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">امار فروش </h1>

      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percent} text={textpercent} strokeWidth={5} />
        </div>
        <p className="title">فروش امروز</p>
        <p className="amount">{costday}</p>
        <p className="desc">
          {" "}
          <span dir="rtl"> {textpercent} سهم فروش امروز نسبت به این ماه است </span>
          <br/>
          <span dir="rtl"> {`${difcost < 0 ? `${difcost.toString().slice(1)} کمتر ` : `${difcost} بیشتر`}  فروش داشتی`}</span>

        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">فروش ماه جاری</div>
            <div className={`itemResult ${costmonth>costbeforemonth ? 'positive' : 'negetive'}`}>
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">{costmonth}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">ماه گذشته</div>
            <div className="itemResult">
            
              <KeyboardArrowDownIcon fontSize="small" style={{opacity:0}}/>
              <div className="resultAmount">{costbeforemonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
