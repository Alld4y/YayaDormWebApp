import axios from "axios";
import { useState, useEffect } from "react";

import "../ArcadeNew/css/MonthlyComponent.css";

const MonthlyComponentN40 = (props) => {
  const [userByMonth, setUserByMonth] = useState([]);
  const [paidState, setPaidState] = useState([]);

  useEffect(() => {
    const getMonthlyData = async () => {
      try {
        const res = await axios.get(
          "http://alldaygrow.tplinkdns.com:3001/get-monthly-data-n40"
        );
        //console.log("MonthlyData = ", res.data);
        setUserByMonth(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getMonthlyData();
    //console.log(props.refresh);
  }, [props.refresh]);
function getYear(lastUpdate) {
    console.log("length",(lastUpdate+"").length)
    if((lastUpdate+"").length === 19 ){
      return lastUpdate.trim().slice(6,10)
    }else if((lastUpdate+"").length === 18){
      return lastUpdate.trim().slice(5,9)
    }
  }

  const getColor = (state) => {
    if (state === "false") {
      return "rgb(226, 131, 131)";
    } else if (state === "true") {
      return "#73ce67";
    }
  };

  function payment() {
    userByMonth.map((userByMonth) => {
      console.log(userByMonth.payment_state)
      return userByMonth.payment_state;
    });
  }

  function changeStateColor(){
    const state = payment()
    if(state==="false")
      setPaidState("rgb(226, 131, 131)")
    else
      setPaidState("#73ce67")
  }

  const getMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "มกราคม";
      case 2:
        return "กุมภาพันธ์";
      case 3:
        return "มีนาคม";
      case 4:
        return "เมษายน";
      case 5:
        return "พฤษภาคม";
      case 6:
        return "มิถุนายน";
      case 7:
        return "กรกฎาคม";
      case 8:
        return "สิงหาคม";
      case 9:
        return "กันยายน";
      case 10:
        return "ตุลาคม";
      case 11:
        return "พฤศจิกายน";
      case 12:
        return "ธันวาคม";
      default:
        return "ไม่มีเดือนที่ตรงกัน";
    }
  };

  return (
    <>
      {userByMonth.map((userByMonth) => {
        return (
          <div key={userByMonth.id}>
            <div className="monthly-app-container">
              <div className="month-col">
                <h4>
                  {getMonthName(userByMonth.month)}{" "}
                  {getYear(userByMonth.last_update)}
                </h4>
              </div>
              <div className="payment-state">
                <div>
                  <h4>สถานะ </h4>
                  <span
                    style={{ color: getColor(userByMonth.payment_state) }}
                    className="material-symbols-outlined"
                  >
                    radio_button_checked
                  </span>
                </div>
                <button
                  className="paid-btn"
                  onClick={() => {
                    props.value(userByMonth.id, userByMonth.month);
                  }}
                >
                  <span className="material-symbols-outlined">paid</span>
                  <h5>ยืนยันการรับเงิน</h5>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default MonthlyComponentN40;
