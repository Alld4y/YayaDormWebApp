import { useState,useEffect } from "react"
import axios from "axios"
import FormN37 from "./FormN37"
import Night37App from "./Night37App"
const Night37 = ()  =>{

    const [showAddUserForm,setShowAddUserForm] = useState(false)
    const [showPage,setShowPage] = useState(true)
    const [userData,setUserData] = useState([])

    useEffect(()=>{
        
        const fetchArcadeUser = async()=>{
            try {
                const getReq = axios.get('http://alldaygrow.tplinkdns.com:3001/get-n37-user')
                if((await getReq).data === "No_User"){
                    setShowAddUserForm(true)
                    setShowPage(false)
                }else{
                    setShowAddUserForm(false)
                    setShowPage(true)
                    console.log("User Data",(await getReq).data)
                    setUserData((await getReq).data)
                }
            } catch (err) {
                console.error(err)
            } 
        }
        fetchArcadeUser()
    },[showAddUserForm])

    return (
        <div style={{marginTop:"2rem"}}>
        {showAddUserForm && <FormN37/>}
        {showPage && <Night37App userData={userData}/>}
        </div>
    )
}
export default Night37