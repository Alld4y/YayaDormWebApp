import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const AddUnitPopUp =(props)=>{

    const [electric,setElectric] = useState(0)
    const [water,setWater] = useState(0)
    const [otherAmount, setOtherAmount] = useState(0)
    const [userData , setUserData] = useState(props.userData)
    const navigate = useNavigate()

    const [dataObj] = userData
    const data = {
        roomNumber:dataObj.roomNumber,
        month:dataObj.month,
        otherAmount:otherAmount,
        electric:electric,
        water:water
    }
    const submitPopUp = async(props)=>{
        
        try {
            await axios.post(`http://alldaygrow.tplinkdns.com:3001/put-new-unit/${userData.id}`,data)
        } catch (err) {
            console.error(err)
        }finally{
        }
    }
    
    return (
        <>
        <div className="submitPopUp">
            <div>
                <div style={{width:"100%",textAlign:"center",backgroundColor:"#5179fa",paddingBottom:"0.3rem"}}><h2>แบบฟอร์มจดบันทึกมิเตอร์</h2></div>
            <form onSubmit={()=>{submitPopUp(); props.submitClick()}}> 
            <div className="form-name">
                    <label>หน่วยมิเตอร์ไฟฟ้า</label>
                    <input type="number" className='input-number' placeholder="กรอกหน่วยที่จด" onChange={(event)=>{setElectric(event.target.value)}}></input>
                </div>
                <div className="form-name">
                    <label>หน่วยมิเตอร์น้ำ</label>
                    <input  type="number" className='input-number' placeholder="กรอกหน่วยที่จด" onChange={(event)=>{setWater(event.target.value)}}></input>
                </div>
                <div className="form-name">
                    <label>ค่าอื่นๆ</label>
                    <input style={{width:"max-content"}} type="number" className='input-number' placeholder=" บาท *ไม่มีให้เว้นว่าง*" onChange={(event)=>{if(event.target.value===""){setOtherAmount(0)}else{setOtherAmount(event.target.value)}}}></input>
                </div>
                <div className="popup-btn">
                    <button type="submit">ตกลง</button>
                    <button onClick={()=>{props.cancelPopUp()}}>ยกเลิก</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}
export default AddUnitPopUp