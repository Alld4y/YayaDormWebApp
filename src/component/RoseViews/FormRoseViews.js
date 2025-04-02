import { useState,useEffect } from 'react'
import BasicDatePicker from '../importComponents/BasicDatePicker'
import '../ArcadeNew/css/Form_acn.css' 
import axios from 'axios'
const FormRoseViews = () => {
    const [date, setDate] = useState(null)
    const [name, setName] = useState("")
    const [tel,setTel] = useState("")
    const [monthlyPrice, setMonthlyPrice] = useState(0)
    

    const handleDate=(date)=>{
        setDate(date)
    }

    console.log("วันที่เลือก = ",date)

    const postUserData = async(event) => {
        const data = {
            name:name,
            tel:tel,
            startDate:date,
            monthlyPrice:monthlyPrice
        }
        try {
            const postReq = axios.post('http://alldaygrow.tplinkdns.com:3001/add-RoseViews-user',data)
            console.log("Post Req = ",postReq)
        } catch (err) {
            console.error(err)
        }
    }

    

    return (
        <div className="form-container">
            <h2>แบบฟอร์มกรอกข้อมูลผู้เช่า</h2>
            <form onSubmit={postUserData}>
                <div className="form-name">
                    <label>ชื่อผู้เช่า</label>
                    <input type="text" onChange={(event)=>{setName(event.target.value)}}></input>
                </div>
                <div className="form-name">
                    <label>เบอร์โทรผู้เช่า</label>
                    <input type="number" onChange={(event)=>{setTel(event.target.value)}}></input>
                </div>
                <div className="form-item">
                    <label className="start">เริ่มเข้าพัก</label>
                    <BasicDatePicker onDateSelected={handleDate}/>
                </div>
                <div className="form-name">
                    <label>ค่าเช่ารายเดือน</label>
                    <input type="number" className='input-number' onChange={(event)=>{setMonthlyPrice(event.target.value)}}></input>
                </div>
                <button type='submit' className='submit-btn'>ตกลง</button>
            </form>
            {/* <h1>{date ? dayjs(date).format('YYYY-MM-DD') : "กรุณาเลือกวันที่"}</h1> จัดรูปแบบวันที่ที่นี่ */}
        </div>
    )
}
export default FormRoseViews