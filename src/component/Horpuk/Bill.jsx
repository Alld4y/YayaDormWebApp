import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./css/Bill.css"
import axios from "axios"
const Bill = (props) => {
    const navigate = useNavigate()
    const [billData, setBillData] = useState([])
    const [count,setCount] = useState(0)
    const [newWaterPrice,setNewWaterPrice] = useState(0)
    const [bill] = billData
    const [popUp,setPopUp] = useState("none")
    const [month, setMonth] = useState(0)
    const [paidColor , setPaidColor] = useState("red")
    const [Id,setId] = useState(0) 

      
    

    useEffect(()=>{
        const getBillData=async()=>{
            try {
                const res = await axios.get(`http://alldaygrow.tplinkdns.com:3001/get-bill-data/${props.roomNumber}`);
                setBillData(res.data);
            } catch (err) {
                console.error(err)
            }
        }
        getBillData()
        const propBack=()=>{
          billData.map((e,key)=>{

            if(key === 0){
              if((e.electric-e.prevElectric)===0&&(e.water - e.prevWater)===0){
                   props.dontAddYet()
               }}
               
              
          })
        }
        propBack()
        
        const getId =()=>{
          billData.map((e)=>{
            console.log(e.id)
          })
        }
        getId()

       

        
       
      },[])
    //},[props.reRender])

    // useEffect(()=>{
    //   const changeColor = () => {
    //     billData.map((e)=>{
          
    //       if(e.payment_state==="true"){
    //         console.log("-----------",e.payment_state)
    //         setPaidColor("#73ce67")
    //       }
    //     })
    //   }
    // },[paidColor])

    const userPaid = async(month) =>{
      const data = {
        userId: bill.id,
        month:bill.month
      }
      console.log(month)
      closeConfirmPopup()
      window.location.reload()
      try {
        const response = await axios.put(`https://alldaygrow.tplinkdns.com:3001/update-paid-horpuk/${Id}`, data);
        console.log("Payment success:", response.data);
        // ทำการอัปเดต UI หรือแสดงข้อความให้ผู้ใช้ทราบ
        setBillData((prevData) => 
                prevData.map((item) => 
                    item.month === month ? { ...item, payment_state: "true" } : item
                )
            );
      } catch (err) {
          console.error(err)
      }
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
      
        function getYear(e) {
          const lastUpdate = e.last_update;
          // if(lastUpdate.length)
          if (String(lastUpdate).length === 19) {
            const year = lastUpdate.trim().slice(6, 10);
            return year;
          } else {
            const year = lastUpdate.trim().slice(5, 9);
            return year;
          }
        }

        const openBill=(id)=>{
            navigate(`/Bill/${id}`)
        }

        const waterPriceMin = (water) =>{
          if(water<50){
            water = 50
          }
          return water
        }

        const openPopup =(month)=>{
      
            console.log(month);
            setMonth(month);

            setPopUp("");
        }
        const closeConfirmPopup=()=>{
          setPopUp("none")
        }

    return (
        <>
            <div className="confirm-popup" style={{display:popUp}}>
      <div className="payment-popup-container">
        <div className="payment-popup">
          <h2>ยืนยันการรับเงิน</h2>
        </div>
        <div className="confirm-detail">
            <div>
                <h3>ประจำเดือน: {getMonthName(month)}</h3>
            </div>
          <div>
          <button key={1} className="yes-btn" onClick={()=>{userPaid(month)}}>
            <span className="material-symbols-outlined">check_circle</span>
          </button>
          <button key={2} className="no-btn" onClick={closeConfirmPopup}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
          </div>
        </div>
      </div>
    </div>

            <div className="Bill" >
                <div className="bill-container">
                    <h3>บิลชำระเงิน</h3>
                </div>
                {billData.map((e)=>{
                   const lastUpdate = e.last_update
                   let year = undefined
                   if(String(lastUpdate).length === 19){
                        year = (lastUpdate.trim().slice(6,10))
                   }else{
                        year = (lastUpdate.trim().slice(5,9))
                   } 
                    return (
                      <div className="list-control" key={e.id}>
                        <div className="bill-list">
                          <p>
                            เดือน: {getMonthName(e.month)} {year}
                          </p>
                        </div>
                        {/* ---- Amount ----- */}
                        <div className="amount">
                          <p>
                            ยอดรวม:{" "}
                            {e.monthlyPrice +
                              e.otherAmount +
                              (e.electric - e.prevElectric) * 8 +
                              waterPriceMin((e.water - e.prevWater) * 12)}
                          </p>
                        </div>
                        {/* -------  Paid Btn  --------- */}
                        <div 
                            className="paid-btn white-span" 
                            style={{ background: e.payment_state === "true" ? "#73ce67" : "red" }}
                            onClick={() => {openPopup(e.month); setId(e.id)}}
                        >
                            <span className="material-symbols-outlined ">paid</span>
                        </div>
                        {/* --------  Show Bill Btn --------- */}
                        <div
                        style={{marginRight:"1rem"}}
                          className="show-bill-btn"
                          onClick={() => {
                            openBill(e.id);
                            props.showBillClick();
                          }}
                        >
                          <span className="material-symbols-outlined">
                            receipt_long
                          </span>
                        </div>
                        {/* ------  End Map Return  ------ */}
                      </div>
                    );
                })}
            </div>
        </>
    )
}
export default Bill