import { useState, useEffect } from "react";
import axios from "axios";
import FormBMJ from "./FormBMJ";
import BanMaejoeApp from "./BanMaejoeApp";

const BanMaejoe = () => {
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showPage, setShowPage] = useState(false); // เปลี่ยนค่าเริ่มต้นเป็น false
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true); // สถานะการโหลด

    useEffect(() => {
        const fetchArcadeUser = async () => {
            setLoading(true); // เริ่มต้นสถานะการโหลด
            try {
                const response = await axios.get('http://alldaygrow.tplinkdns.com:3001/get-bmj-user');
                
                if (response.data === "No_User") {
                    setShowAddUserForm(true);
                    setShowPage(false);
                } else {
                    setShowAddUserForm(false);
                    setShowPage(true);
                    console.log("User Data", response.data);
                    setUserData(response.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // สิ้นสุดสถานะการโหลด
            }
        };

        fetchArcadeUser();
    }, []);

    // แสดงข้อมูลการโหลด
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            {showAddUserForm && <FormBMJ />}
            {showPage && <BanMaejoeApp userData={userData} />}
        </div>
    );
};

export default BanMaejoe;
