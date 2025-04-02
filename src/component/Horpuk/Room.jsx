import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import Form from "./Form";
import "./css/Room.css";
import AddUnitPopUp from "./AddUnitPopUpp";
import Bill from "./Bill";
const Room = (props) => {
  const { id } = useParams();
  //console.log(id);
  const [showForm, setShowForm] = useState(false);
  const [showMain, setShowMain] = useState("none");
  const [userData, setUserData] = useState([]);
  const [startDateDisplay,setStartDateDisplay] = useState(undefined)
  const [showAddUnitPopUp,setShowAddUnitPopUp] = useState(false)
  const [unitChangeElectric, setUnitChangeElectric] = useState("#000")
  const [unitChangeWater, setUnitChangeWater] = useState("#000")
  //const [showBtn,setShowBtn] = useState("none")
  const [showBtn,setShowBtn] = useState("")
  const [addUnitSubmit,setAddUnitSubmit]= useState(0)
  const roomNumber = id.toString().trim().slice(4)
  const navigate = useNavigate()
  const [cout, setCout] = useState(0)

  const  [count, setCount] = useState(0)
  const intervalRef = useRef(null);

  const getBillData=()=>{
      
  }
  

  useEffect(() => {
  
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    const getRoomUser = async () => {
      const res = await axios.get(
        `http://alldaygrow.tplinkdns.com:3001/get-room-user/${id}`
      );
      //console.log(res.data);
      setUserData(res.data);
      if (res.data === "No_user") {
        setShowForm(true);
        setUserData([])
      } else {
        displayStartDateFormat()
        setShowMain("");
      }
    };
    getRoomUser();
    getRedOrGreen()
    
    return () => clearInterval(intervalRef.current);
  }, [count]);



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

  function displayStartDateFormat() {
    if (userData.length === 0 || !userData[0].startDate) {
      setStartDateDisplay("-");
      return;
    }
  
    userData.forEach((user) => {
      let formattedDate;
      const date = user.startDate.trim();
  
      if (date.length === 9) {
        const startDate = date.slice(0, 1);
        const startMonth = date.slice(2, 4);
        const startYear = date.slice(5);
        formattedDate = `${startDate} ${getMonthName(Number(startMonth))} ${startYear}`;
      } else {
        const startDate = date.slice(0, 2);
        const startMonth = date.slice(3, 5);
        const startYear = date.slice(6);
        formattedDate = `${startDate} ${getMonthName(Number(startMonth))} ${startYear}`;
      }
  
      setStartDateDisplay(formattedDate); // อัปเดต state ด้วยวันที่ที่ถูกจัดรูปแบบล่าสุด
     // console.log(formattedDate);
    });
  }
  

  const thisTime=()=>{
    const thisMonth = new Date().getMonth()+1
    const thisDay = new Date().getDate()
    const thisLocalTime = new Date().toLocaleString('th-TH')
    let thisYear = ""
    let thisTime = ""
    console.log(thisLocalTime)
    if((thisLocalTime).length === 19 ){
       thisYear = thisLocalTime.trim().slice(6,10)
       thisTime = thisLocalTime.trim().slice(11)

   }else if((thisLocalTime).length === 18){
       thisYear = thisLocalTime.trim().slice(5,9)
       thisTime = thisLocalTime.trim().slice(10)

   }
    const now = (thisDay+" "+getMonthName(thisMonth)+" "+thisYear+" "+thisTime)
    return now
  }

 thisTime()

 const addUnitBtnClick=()=>{
    setShowAddUnitPopUp(true)
 }
 const cancelPopUp=()=>{
    setShowAddUnitPopUp(false)
 }

 const getRedOrGreen=()=>{
    const resultElectric = userData.map(e=>{
        return e.electric-e.prevElectric
    })
    if(resultElectric<0)
        setUnitChangeElectric("red")
    else
        setUnitChangeElectric("#73ce67")
    
        const resultWater = userData.map(e=>{
            return e.water-e.prevWater
        })
        if(resultWater<0)
            setUnitChangeWater("red")
        else
            setUnitChangeWater("#73ce67")
 }

  const showBillClick=()=>{
    props.billClick()
  }

  const dontAddYet=()=>{
    setShowBtn("")
  }

  const submitClick=()=>{
    navigate('/horpuk')
  }

  return (
    <>
        {showAddUnitPopUp && <AddUnitPopUp userData={userData} cancelPopUp={cancelPopUp} submitClick={()=>{submitClick()}} />}
        {showForm && <Form room={id} />}
        <div style={{ display: showMain }} className="main-container">
          {userData.map((userData) => {
            return (
              <div key={userData.id}>
                <div className="header" key={userData.id}>
                  <div className="room-header">
                    <h2>ห้อง {userData.roomNumber}</h2>
                  </div>
                </div>
                <div className="container">
                  <div className="status-box">
                    <h3>ข้อมูลผู้เช่า</h3>
                    <div>
                      <p>ชื่อ: {userData.name === " " ? "-" : userData.name}</p>
                      <p>เบอร์โทร: {userData.tel === " " ? "-" : userData.tel}</p>
                      <p>เริ่มต้นอยู่อาศัย: {startDateDisplay}</p>
                      <p>ราคาต่อเดือน: {userData.monthlyPrice}</p>
                    </div>
                  </div>
                  <div className="border-unit">
                    <div className="unit-header">
                      <h2 className="prev-month">เดือนที่แล้ว </h2>
                      <div className="border-right"></div>
                      <h2>
                        เดือนนี้&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </h2>
                    </div>
                    <div className="Unit">
                      <div className="unit-display-container">
                        <div className="unit-container">
                          <h3>หน่วยไฟฟ้า</h3>
                          <h2 style={{textAlign:"center"}}>{userData.prevElectric}</h2>
                        </div>
                        <div className="unit-container border-I">
                          <h3>หน่วยน้ำ</h3>
                          <h2 style={{textAlign:"center"}}>{userData.prevWater}</h2>
                        </div>
                      </div>
                      <div className="unit-display-container">
                        <div className="unit-container" style={{textAlign:"center"}}>
                          <h3>หน่วยไฟฟ้า</h3>
                         <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                         <h2>{userData.electric}&nbsp;</h2>
                         <h5 style={{borderBottom:"none",color:unitChangeElectric}}>{(userData.electric-userData.prevElectric)>=0?"+":"-"}{Math.abs(userData.electric-userData.prevElectric)}</h5>
                         </div>
                        </div>
                        <div className="unit-container" style={{textAlign:"center"}}>
                          <h3>หน่วยน้ำ</h3>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <h2>{userData.water}&nbsp;</h2>
                          <h5 style={{borderBottom:"none",color:unitChangeWater}}>{(userData.water-userData.prevWater)>=0?"+":"-"}{Math.abs(userData.water-userData.prevWater)}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ------------------  Add New Data  -------------- */}

                  <div className="addDate-time-container">
                    <div  className="time-container">
                      <h4>เวลาปัจจุบัน</h4>
                      <h2>{thisTime()}</h2>
                    </div>
                    
                    <div className="add-btn-container">
                      <button className="add-unit-btn" style={{display:showBtn}} onClick={addUnitBtnClick}>เพิ่มข้อมูลเดือนนี้</button>
                    </div>
                  </div>

                  {/* ---------------- Bill Detail -------------------- */}

                    <Bill roomNumber={roomNumber} showBillClick={showBillClick} dontAddYet = {dontAddYet} reRender = {count}/>

                  {/* -------------bottom---------------- */}
                </div>
              </div>
            );
          })}
        </div>
    </>
  );
};
export default Room;