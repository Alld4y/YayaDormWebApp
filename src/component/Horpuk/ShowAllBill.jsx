import { useState,useEffect,useMemo } from 'react'
import './css/ShowBill.css'
import axios from 'axios'
const ShowAllBill = (props) => {
    const [billData, setBillData] = useState([])
    const [showOtherAmount, setShowOtherAmount] = useState("none")

    

    useEffect(() => {
        // ฟังก์ชันดึงข้อมูลบิลจาก API
        async function getBillData(id) {
            try {
                const res = await axios.get(`http://alldaygrow.tplinkdns.com:3001/get-all-bill`);
                setBillData(res.data);
                
                // ตรวจสอบว่าควรแสดงค่าอื่นๆ หรือไม่
                const hasOtherAmount = res.data.some(e => Number(e.otherAmount) !== 0);
                setShowOtherAmount(hasOtherAmount ? "" : "none");

            } catch (err) {
                console.error(err);
            }
        }
        getBillData()
        // เรียกฟังก์ชันดึงข้อมูลบิลเมื่อค่า props.refresh เปลี่ยนแปลง

        
    }, [props.refresh]);

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

  const numberWithCommas=(x)=>{
     // แปลงเป็นสตริง
     const str = x.toString();
     // ใช้ Regular Expression แทรกคอมมาในจำนวนเงิน
     return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

    const waterPriceMin = (water) =>{
      if(water<50){
        water = 50
      }
      return water
    }



    return (
        <>
        <div className='body'>
            {billData.map((e)=>{
                return (
                  <div key={e.id} >
                    <div className="Bill-Container">
                      <h3
                        className="show-bill-page"
                        style={{ fontSize: "1.2rem", textAlign: "center" }}
                      >
                        บิลค่าเช่าประจำเดือน {getMonthName(e.month)}
                      </h3>
                      <div className="roomNumber">
                        <p>ห้อง: {e.roomNumber}</p>
                        <p>วันที่ออกบิล {e.last_update.slice(0, 10)}</p>
                      </div>
                      <div className="list-container">
                        <ul>
                          <li className="list-item">
                            <div>
                              <p>ค่าเช่ารายเดือน</p>
                              <p className="list-amount">
                                {numberWithCommas(e.monthlyPrice)}{" "}
                                บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item">
                            <div>
                              <p>ค่าไฟฟ้า &nbsp; {numberWithCommas(e.electric-e.prevElectric)} หน่วย</p>
                              <p className="list-amount">
                                {numberWithCommas((e.electric - e.prevElectric) * 8)}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item">
                            <div>
                            <p>ค่าน้ำประปา &nbsp; {numberWithCommas(e.water-e.prevWater)} หน่วย</p>
                              <p className="list-amount">
                                {numberWithCommas(waterPriceMin((e.water-e.prevWater)*12))}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item" style={{display:showOtherAmount}}>
                            <div>
                            <p>ค่าอื่นๆ</p>
                              <p className="list-amount">
                                {numberWithCommas(e.otherAmount)}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                    <div style={{borderTop:"1px solid #000",padding:"0.1rem",paddingTop:"0.5rem", display:"flex",justifyContent:"space-between",paddingLeft:"0.4rem",paddingRight:"1.3rem"}}>
                    <p>รวมเป็นเงิน</p><p>{numberWithCommas(e.monthlyPrice + e.otherAmount + ((e.electric-e.prevElectric)*8) + (waterPriceMin((e.water-e.prevWater)*12)))} {" "}บาท</p>
                    </div>

                      {/* --------------------- */}
                    </div>
                    <hr></hr>
                  </div>
                );
            })}
        </div>
        </>
    )
}
export default ShowAllBill

