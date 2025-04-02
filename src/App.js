import "./App.css";
import ArcadeNew from "./component/ArcadeNew/ArcadeNew";
import BanMaejoe from "./component/BanMaejoe/BanMaejoe";
import MainPage from "./component/MainPage";
import Night37 from "./component/Night37/Night37";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Night40 from "./component/Night40/Night40";
import RoseViews from "./component/RoseViews/RoseViews";
import Horpuk from "./component/Horpuk/Horpuk";
import Room from "./component/Horpuk/Room";
import { useState } from "react";
import ShowBill from "./component/Horpuk/ShowBill";
import Arcadee from "./component/Arcadee/Arcadee";
import ShowAllBill from "./component/Horpuk/ShowAllBill";

function App() {

  const [horpukData, setHorpukData] = useState([])
  const [refresh,setRefresh] = useState(0)
  

  const saveHorpukData = (value) => {
    setHorpukData(value)
  }
  const showBillClick=()=>{
    setRefresh(refresh+1)
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/arcade" element={<ArcadeNew />}></Route>
          <Route path="/ban-maejoe" element={<BanMaejoe />}></Route>
          <Route path="/night-37" element={<Night37 />}></Route>
          <Route path="/night-40" element={<Night40 />}></Route>
          <Route path="/roseviews" element={<RoseViews />}></Route>
          <Route path="/horpuk" element={<Horpuk horpukData = {saveHorpukData}/>}></Route>
          <Route path="/get-all-bill" element={<ShowAllBill refresh={refresh}/>}></Route>
          <Route path="/:id" element={<Room billClick={showBillClick}/>}></Route>
          <Route path="/Bill/:id" element={<ShowBill refresh={refresh}/>}></Route>
          <Route path="/arcade-I" element={<Arcadee/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
