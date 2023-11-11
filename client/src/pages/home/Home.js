import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMyInfo)
  }, [])
  return <>
    <Navbar />
    <div className="outlet" style={{marginTop: '60px'}}>
    <Outlet />
    </div>
    
  </>;
}

export default Home;


