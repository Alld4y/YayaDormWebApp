import { useEffect, useState } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const paidCount = localStorage.getItem("paidCount");
  const [newArray, setNewArray] = useState([]);
  const [newData , setNewData] = useState([]);

  const goArcade = () => {
    navigate("/arcade");
  };
  const goBanMaejoe = () => {
    navigate("/ban-maejoe");
  };
  console.log("Paid Count = 10",paidCount);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get('http://alldaygrow.tplinkdns.com:3001/getRoomPaid');
        const sortedData = res.data.sort((a, b) => a.roomNumber - b.roomNumber);

        const arrangedArray = [];
        for (let i = 0; i < 5; i++) {
          if (sortedData[i]) arrangedArray.push(sortedData[i]);
          if (sortedData[i + 5]) arrangedArray.push(sortedData[i + 5]);
        }

        setNewData(sortedData);
        setNewArray(arrangedArray);

      } catch (err) {
        console.error(err);
      }
    };
    getRoom();
  }, []);

  const [avaiableRoom,setAvaiableRoom] = useState([])
  useState(()=>{
    const getAllAvaible = async() => {
      try {
        const res = await axios.get('http://alldaygrow.tplinkdns.com:3001/get-room-data')
        setAvaiableRoom("AvaiableRoom = ",res.data)
        console.log(res.data)
      } catch (err) {
        console.error(err)
    }
  }
  getAllAvaible()
},[])

  const [paid, setPaid] = useState(0);

  useEffect(() => {
    const sortPropData = () => {
      let count = 0; // ตัวแปรชั่วคราวเก็บจำนวน paid 
       newArray.forEach((data) => {
        if (data.payment_state === "true") {
          count += 1;
        }
      });
      setPaid(count); // อัปเดต paid เมื่อ loop เสร็จสิ้น
      localStorage.setItem("paidCount", paid);
      console.log("Total paid:", paid);
    };
    
    sortPropData();
  }, [newArray]); 

  const [allPaidData,setAllPaidData] = useState([])
  useState(()=>{
    const getPaid = async() => {
      const homeAvaiable = ["arcade",'arcadenew','banmaejoe','night37','night40','roseviews']
      try {

          const res = await axios.get(`http://alldaygrow.tplinkdns.com:3001/get-all-paid-data`)
        console.log(res.data)
        setAllPaidData(res.data)
      } catch (err) {
        console.error(err)
    }
  }
  getPaid()
},[])

const getIconColor = (tableName) => {
  const tableData = allPaidData.find((data) => data.table === tableName);
  return tableData?.payment_state === "true" ? "#73ce67" : "red";
};

  return (
    <>
      <div className="main-app-header">
        <h2>Yaya Rental Management</h2>
      </div>
      <div className="menu">
        <div className="menu-arcade" onClick={goArcade}>
          <span style={{ color: getIconColor("arcadenew") }} className="material-symbols-outlined">home_work</span>
          <h2>อาเขตใหม่</h2>
        </div>
        <div className="menu-horpuk" onClick={() => { navigate("/arcade-I") }}>
          <span style={{ color: getIconColor("arcade") }} className="material-symbols-outlined">home_work</span>
          <h2>อาเขตเก่า</h2>
        </div>
        <div className="menu-safari" onClick={() => { navigate("/night-37") }}>
          <span style={{ color: getIconColor("night37") }} className="material-symbols-outlined">apartment</span>
          <h2>Night 37</h2>
        </div>
        <div className="menu-safari" onClick={() => { navigate("/night-40") }}>
          <span style={{ color: getIconColor("night40") }} className="material-symbols-outlined">apartment</span>
          <h2>Night 40</h2>
        </div>
        <div className="menu-ban-maejoe" onClick={() => { navigate("/roseviews") }}>
          <span style={{ color: getIconColor("roseviews") }} className="material-symbols-outlined">house</span>
          <h2>โรสวิลล์</h2>
        </div>
        <div className="menu-horpuk" onClick={() => { navigate("/horpuk") }}>
          <span style={{ color:paid >= 9 ? "#73ce67": "red" }} className="material-symbols-outlined">door_back</span>
          <h2>หอพัก</h2>
        </div>
        <div className="menu-ban-maejoe" onClick={goBanMaejoe}>
          <span style={{ color: getIconColor("banmaejoe") }} className="material-symbols-outlined">cottage</span>
          <h2>บ้านป่าไผ่</h2>
        </div>
      </div>
    </>
  );
};
export default MainPage;
