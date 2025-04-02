import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/ShowBill.css'
import axios from 'axios'
const ShowBill = (props) => {
    const [billData, setBillData] = useState([])
    const [showOtherAmount, setShowOtherAmount] = useState("none")
    const {id} = useParams()
    const [newWaterPrice,setNewWaterPrice] = useState(0)

    

    useEffect(() => {
        
        async function getBillData(id) {
            try {
                const res = await axios.get(`http://alldaygrow.tplinkdns.com:3001/getBill/${id}`);
                setBillData(res.data);
                
               
                const hasOtherAmount = res.data.some(e => Number(e.otherAmount) !== 0);
                setShowOtherAmount(hasOtherAmount ? "" : "none");

            } catch (err) {
                console.error(err);
            }
        }

        
        getBillData(id);
        
        
    }, [props.refresh, id]);

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
        <div className='bill-body'>
            {billData.map((e)=>{
                return (
                  <>
                    <div className="Bill-Container">
                      <h3
                        className="show-bill-page"
                        style={{ fontSize: "1.2rem", textAlign: "center" }}
                      >
                        บิลค่าเช่าประจำเดือน {getMonthName(e.month)}
                      </h3>
                      <div className="roomNumber">
                        <p><b>ห้อง: {e.roomNumber}</b></p>
                        <p>วันที่ออกบิล {e.last_update.slice(0, 10)}</p>
                      </div>
                      <div className="list-container">
                        <ul>
                          <li className="list-item">
                            <div>
                              <p><b>ค่าเช่ารายเดือน</b></p>
                              <p className="list-amount">
                                {numberWithCommas(e.monthlyPrice)}{" "}
                                บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item">
                            <div>
                              <p><b>ค่าไฟฟ้า</b> &nbsp; {numberWithCommas(e.electric-e.prevElectric)} หน่วย</p>
                              <p className="list-amount">
                                {numberWithCommas((e.electric - e.prevElectric) * 8)}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item">
                            <div>
                            <p><b>ค่าน้ำประปา</b> &nbsp; {numberWithCommas(((e.water-e.prevWater)))} หน่วย</p>
                              <p className="list-amount">
                                {numberWithCommas(waterPriceMin((e.water-e.prevWater)*12))}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                          <li className="list-item" style={{display:showOtherAmount}}>
                            <div>
                            <p><b>ค่าอื่นๆ</b></p>
                              <p className="list-amount">
                                {numberWithCommas(e.otherAmount)}
                                {" "}บาท
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                    <div style={{borderTop:"1px solid #000",padding:"0.1rem",paddingTop:"0.5rem", display:"flex",justifyContent:"space-between",paddingLeft:"0.4rem",paddingRight:"1.3rem"}}>
                    <p><b>รวมเป็นเงิน</b></p><p>{numberWithCommas(e.monthlyPrice + e.otherAmount + ((e.electric-e.prevElectric)*8) + ((waterPriceMin((e.water-e.prevWater)*12))))} {" "}บาท</p>
                    </div>

                      {/* --------------------- */}
                    </div>
                  </>
                );
            })}
        </div>
        </>
    )
}
export default ShowBill

