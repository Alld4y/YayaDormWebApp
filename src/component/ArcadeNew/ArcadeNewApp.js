import { useState } from "react";
import MonthlyComponent from "./MonthlyComponent";
import ConfirmPopup from "./ConfirmPopup";
import "./css/ArcadeNewApp.css";
const ArcadeNewApp = (props) => {
  const { userData } = props;
  const [showConfirmPopup,setShowConfirmPopup] = useState(false)
  const [paidId, setPaidId] =  useState([])
  const [paidMonth, setPaidMonth] =  useState([])
  const [updateCounter, setUpdateCounter] = useState(1);

  const closeConfirmPopup=()=>{
    setShowConfirmPopup(!showConfirmPopup)
    setUpdateCounter(updateCounter+1)
    console.log(updateCounter)
  }
  const getPaidData=(paidId,paidMonth)=>{
    setShowConfirmPopup(!showConfirmPopup)
    setPaidId(paidId)
    setPaidMonth(paidMonth)
    setUpdateCounter(updateCounter+1)
    console.log(updateCounter)
  }

  return (
    <>
      <div className="Acn-app-container">
        <div className="app-header">
          <h1>ข้อมูลผู้เช่า บ้านอาเขตใหม่</h1>
          {userData.map((userData) => {
            return (
              <div key={userData.id}>
                  <div className="profile-container">
                    <div>
                      <p>ชื่อ: {userData.name}</p>
                    </div>
                    <div>
                      <p>เบอร์โทร: {userData.tel}</p>
                    </div>
                    <div>
                      <p>เริ่มต้นเช่าวันที่: {userData.startDate}</p>
                    </div>
                    <div>
                      <p>ค่าเช่ารายเดือน: {userData.monthlyPrice}</p>
                    </div>
                  </div>
                  {showConfirmPopup && <ConfirmPopup closeConfirmPopup={closeConfirmPopup} paidId={paidId} paidMonth={paidMonth}/>}
                  <MonthlyComponent value={getPaidData} refresh={updateCounter}/>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ArcadeNewApp;
