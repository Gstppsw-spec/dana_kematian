import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ResultCard from "../component/ResultCard";
import { useLocation } from "react-router-dom";
import NoData from ".././component/NoData";

const HasilPengajuan = (props) => {
  const [filterPengajuan, setFilterPengajuan] = useState([]);
  const location = useLocation();

  let words = location.state.word.keyword;

  async function prepareFilterPengajuan(arrayToBeFiltered, wordparam) {
    const filtered = await arrayToBeFiltered.filter((anObject) => {
      return anObject.nik.toLowerCase().indexOf(wordparam.toLowerCase()) > -1;
    });
    return filtered;
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/data_kematian")
      .then((res) => res.json())
      .then((result) => {
        prepareFilterPengajuan(result, words).then((trip) => {
          setFilterPengajuan(trip);
        });
      });
  }, [words]);

  if (Array.isArray(filterPengajuan) && filterPengajuan.length) {
    return (
      <div>
        {filterPengajuan.map((trip) => {
          if (trip.nik === words) {
            return (
              <ResultCard
                nik={trip.nik}
                nama={trip.nama}
                stat={trip.status}
                kematian={trip.kematian}
                nikWaris={trip.nikWaris}
                namaWaris={trip.namaWaris}
              />
            );
          } else {
            return <NoData />;
          }
        })}
      </div>
    );
  } else {
    return <NoData />;
  }
};

export default HasilPengajuan;
