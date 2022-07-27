import { useContext } from "react";
import profile from "../img/profile.png";
import "../style/Topbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../context/darkModeContext";
import { Link } from "react-router-dom";

const Topbar = () => {
  const {dispatch} = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <h2 style={{fontWeight: '-moz-initial'}}>SISTEM INFORMASI PENYALURAN DANA SANTUNAN KEMATIAN</h2>
        </div>

        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;


