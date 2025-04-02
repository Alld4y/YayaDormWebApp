import { useState,useEffect } from "react"
import axios from "axios"
import FormAcn from "./FormAcn"
import ArcadeNewApp from "./ArcadeNewApp"
const ArcadeNew = ()  =>{

    const [showAddUserForm,setShowAddUserForm] = useState(false)
    const [showPage,setShowPage] = useState(true)
    const [userData,setUserData] = useState([])

    useEffect(()=>{
        
        const fetchArcadeUser = async()=>{
            try {
                const getReq = axios.get('http://alldaygrow.tplinkdns.com:3001/get-arcade-user')
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
        {showAddUserForm && <FormAcn/>}
        {showPage && <ArcadeNewApp userData={userData}/>}
        </div>
    )
}
export default ArcadeNew