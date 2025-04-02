import axios from "axios";

import "./css/ConfirmPopup.css";

const ConfirmPopup = (props) => {
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

      const putPaidState =async()=>{
        const paid = {
            id: props.paidId,
            month: props.paidMonth,
        }
        try {
          window.location.reload();

            console.log(paid)
            const req = await axios.put('http://alldaygrow.tplinkdns.com:3001/user-arcade-paid',paid)
        } catch (err) {
            console.error(err)
        } finally {
        }
      }

  return (
    <div className="confirm-popup">
      <div className="payment-popup-container">
        <div className="payment-popup">
          <h2>ยืนยันการรับเงิน</h2>
        </div>
        <div className="confirm-detail">
            <div>
                <h3>ประจำเดือน: {getMonthName(props.paidMonth)}</h3>
            </div>
          <div>
          <button key={1} className="yes-btn" onClick={putPaidState}>
            <span className="material-symbols-outlined">check_circle</span>
          </button>
          <button key={2} className="no-btn" onClick={props.closeConfirmPopup}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmPopup;
