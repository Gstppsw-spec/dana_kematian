import React from 'react'
import Navbar from '../component/Navbar';
import Topbar from '../component/Topbar';
import '../style/list.scss'
import DaftarKematian from './DaftarKematian';


const ListKematian = () => {
  return (
    <div className='list'>
        <Navbar/>
        <div className='listContainer'>
            <Topbar/>
            <DaftarKematian/>
        </div>
    </div>
  )
}

export default ListKematian;
