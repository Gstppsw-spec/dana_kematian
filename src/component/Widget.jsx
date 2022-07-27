import React from "react";
import "../style/widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Widget = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/data_kematian`).then(({ data }) => {
      setProducts(data);
      setIsLoaded(true);
      
    });
  };

  let data;

  switch (type) {
    
    case "jumlah_kematian":
      data = {
        title: "JUMLAH PENCAIRAN DANA",
        isMoney: false,
        amount: (products.length),
        isJumlah: true,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "anggaran_kematian":
      data = {
        title: "ANGGARAN DANA SANTUNAN KEMATIAN KELUAR",
        isMoney: true,
        amount: (products.length * (1000000)),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  if (!isLoaded){
    return (
      <div className="load-wrapp">
        <div className="load">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    ); 
  } else {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "Rp. "} {data.amount}
          {data.isJumlah && " Data"}
        </span>
        <span className="link"></span>
      </div>
      <div className="right">
        <div className="percentage positive"></div>
        {data.icon}
      </div>
    </div>
  );
};
}

export default Widget;
