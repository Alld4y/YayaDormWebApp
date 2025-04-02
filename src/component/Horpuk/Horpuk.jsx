import axios from "axios"
import { useState,useEffect } from "react"
import RoomSelect from "./RoomSelect"
import { useNavigate } from "react-router-dom"
const Horpuk =(props)=>{

    const [roomData, setRoomData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const getRoomData = async() => {
            try {
                const res = await axios.get('http://alldaygrow.tplinkdns.com:3001/get-room-data') 
                setRoomData(res.data)
                props.horpukData(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getRoomData()
    },[])

    return (
        <>
        <div style={{display:"flex",height:"100%",alignItems:"center"}}>
            <button onClick={()=>{navigate('/')}} style={{height:"3rem", width:"4rem",background:"#a6aff8",border:"2px solid #000",padding:"5px",borderRadius:"10px", fontSize:"18px"}}>back</button>
            <h2 className="room-select" > Yaya Dorm Manager</h2>
        </div>
           
            <RoomSelect roomData={roomData}/>
        </>
    )
}
export default Horpuk 