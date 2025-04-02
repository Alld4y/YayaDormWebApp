import { useState,useEffect } from "react"
import axios from "axios"
import FormArcadee from "./FormArcadee"
import ArcadeeApp from "./ArcadeeApp"
const Arcadee = ()  =>{

    const [showAddUserForm,setShowAddUserForm] = useState(false)
    const [showPage,setShowPage] = useState(true)
    const [userData,setUserData] = useState([])

    useEffect(()=>{
        
        const fetchArcadeeUser = async()=>{
            try {
                const getReq = axios.get('https://alldaygrow.tplinkdns.com:3001/get-Arcadee-user')
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
        fetchArcadeeUser()
    },[showAddUserForm])

    return (
        <div style={{marginTop:"2rem"}}>
        {showAddUserForm && <FormArcadee/>}
        {showPage && <ArcadeeApp userData={userData}/>}
        </div>
    )
}
export default Arcadee