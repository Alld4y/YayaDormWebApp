import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import './css/RoomSelect.css'
import axios from 'axios';

const RoomSelect = (props) => {
const {roomData} = props
const navigate = useNavigate()
const index = [0,5,1,6,2,7,4,8,5,9]
const [newData , setNewData] = useState([])
const [newArray, setNewArray] = useState([]);

useEffect(()=>{
  const getRoom = async () => {
    try {
      const res = await axios.get('http://alldaygrow.tplinkdns.com:3001/getRoomPaid');
      const sortedData = res.data.sort((a, b) => a.roomNumber - b.roomNumber); // เรียงลำดับตาม roomNumber

      // สร้าง newArray จาก sortedData
      const arrangedArray = [];
      for (let i = 0; i < 5; i++) {
        if (sortedData[i]) arrangedArray.push(sortedData[i]);
        if (sortedData[i + 5]) arrangedArray.push(sortedData[i + 5]);
      }

      setNewData(sortedData);
      setNewArray(arrangedArray); // อัปเดต newArray

      console.log(arrangedArray); // แสดงผล newArray ที่จัดเรียงแล้ว

    } catch (err) {
      console.error(err);
    }
  };
  getRoom();
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
}, [newArray,paid]); // เปลี่ยนเป็น `newArray` ซึ่งเป็น dependency ของ useEffect 


  return (
    <>
      <div className="room-select">
        <div className="grid-container">
        {newArray.map((value,key)=>{
          console.log(value.payment_state)
          return (
            <div key={value.id}>
              <div className="grid-item" onClick={()=>{navigate(`/Room${value.roomNumber}`)}}>
              <span
  style={{
    color: value.payment_state === "true" 
      ? "#73ce67" 
      : (value.electric - value.prevElectric) === 0 
        ? "red" 
        : "yellow" // สีอื่นเมื่อเงื่อนไขไม่เป็นจริง
  }}
  className="material-symbols-outlined"
>
  door_back
</span>

            <h3>Room {value.roomNumber}</h3>
          </div>
            </div>
          )
        })}
          
        </div>
      </div>
    </>
  );
};
export default RoomSelect;
