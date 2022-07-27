import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import gambar from "../img/balam.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "axios";
import { useState } from "react";

function Navbar() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.get("http://localhost:8000/api/user").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    fetchData();
  }, []);

  const logoutHanlder = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <img
            src={gambar}
            style={{ borderRadius: "50%", width: "60px", margin: "60px" }}
          />
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MENU UTAMA</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">KEMATIAN</p>
          <Link to="/kematian" style={{ textDecoration: "none" }}>
            <li>
              <FolderIcon className="icon" />
              <span>Data Pengambilan</span>
            </li>
          </Link>
          <p className="title">PENGGUNA</p>
          <li onClick={logoutHanlder}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
