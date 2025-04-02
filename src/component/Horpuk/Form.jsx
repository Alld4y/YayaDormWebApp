import { useState } from 'react'
import BasicDatePicker from '../importComponents/BasicDatePicker'
import '../ArcadeNew/css/Form_acn.css' 
import axios from 'axios'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Form = (props) => {
    const [date, setDate] = useState(null)
    const [name, setName] = useState(" ")
    const [tel,setTel] = useState(" ")
    const [monthlyPrice, setMonthlyPrice] = useState(0)
    const [electric, setElectric] = useState(0)
    const [water, setWater] = useState(0)

    const handleDate=(date)=>{
        setDate(date)
    }

    useEffect(()=>{
     
    },[[]])

    //console.log("วันที่เลือก = ",date)

    const postUserData = (event) => {
        const data = {
            name:name,
            tel:tel,
            startDate:date,
            monthlyPrice:monthlyPrice,
            roomNumber: Number(cutRoomString(props.room)),
            electric:electric,
            water:water,
        }
        try {
            console.log(name)
            const postReq = axios.post('http://alldaygrow.tplinkdns.com:3001/add-horpuk-user',data)
            console.log("Post Req = ",postReq)

        } catch (err) {
            console.error(err)
        }
    }

    function cutRoomString(value){
        const roomNumber = value.slice(4) 
        return roomNumber
    }
    

    return (
        <div className="form-container" style={{marginTop:"4rem"}}>
            <h2>แบบฟอร์มข้อมูลผู้เช่าห้อง {cutRoomString(props.room)}</h2>
            <form onSubmit={postUserData}>
                <div className="form-name">
                    <label>ชื่อผู้เช่า</label>
                    <input type="text" onChange={(event)=>{setName(event.target.value," ");console.log(name)}}></input>
                </div>
                <div className="form-name">
                    <label>เบอร์โทรผู้เช่า</label>
                    <input type="number" onChange={(event)=>{setTel(event.target.value," ")}}></input>
                </div>
                <div className="form-item">
                    <label className="start">เริ่มเข้าพัก</label>
                    <><BasicDatePicker onDateSelected={handleDate}/></>
                </div>
                <div className="form-name">
                    <label>ค่าเช่ารายเดือน</label>
                    <input type="number" className='input-number' onChange={(event)=>{setMonthlyPrice(event.target.value)}}></input>
                </div>
                <div className="form-name">
                    <label>หน่วยมิเตอร์ไฟฟ้า</label>
                    <input type="number" className='input-number' onChange={(event)=>{setElectric(event.target.value)}}></input>
                </div>
                <div className="form-name">
                    <label>หน่วยมิเตอร์น้ำ</label>
                    <input type="number" className='input-number' onChange={(event)=>{setWater(event.target.value)}}></input>
                </div>
                <button type='submit' className='submit-btn'>ตกลง</button>
            </form>
            {/* <h1>{date ? dayjs(date).format('YYYY-MM-DD') : "กรุณาเลือกวันที่"}</h1> จัดรูปแบบวันที่ที่นี่ */}
        </div>
    )
}

// Form.propTypes = {
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
// }

export default Form