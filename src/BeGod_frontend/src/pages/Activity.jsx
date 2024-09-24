import React, { useEffect, useState } from 'react';
import Navbar from '../components/Landing Page Components/Navbar';
import Footer from '../components/Footer';
import NftCard from '../components/NftCard';
import { Link } from 'react-router-dom';
import YellowButton from '../components/button/YellowButton';
import { useAuth } from '../utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Activity = () => {

    const [activityList] = [
        {
            mintId : "#2156",
            nri : "-",
            price : "$5.62",
            time : "3 months ago",
            buyStatus : "Bought"

        },
        {
            mintId : "#2156",
            nri : "-",
            price : "$5.62",
            time : "3 months ago",
            buyStatus : "Bought"

        },
        {
            mintId : "#2156",
            nri : "-",
            price : "$5.62",
            time : "3 months ago",
            buyStatus : "Bought"

        },
        {
            mintId : "#2156",
            nri : "-",
            price : "$5.62",
            time : "3 months ago",
            buyStatus : "Bought"

        },
        {
            mintId : "#2156",
            nri : "-",
            price : "$5.62",
            time : "3 months ago",
            buyStatus : "Bought"

        }
    ]
 

 
  return (
    <div className='font-caslon'>
      <div style={{ backgroundImage: `url('/Hero/activity smoke.jpeg')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "right", }}>
        <Navbar />
        <div className='min-h-[70vh] w-full p-[70px] '>
          <h1 className='text-5xl text-[#FCD378] mb-5'>Activity</h1>
          <ul className='w-[100%] h-[40px] text-[#FCD378] bg-[#FCD37B1A] m-0  pl-[180px] grid grid-cols-4 items-center'>
                <li>MINT</li>
                <li>NRI</li>
                <li>PRICE</li>
                <li>TIME</li>
          </ul>
          <div>
            {activityList.map((eachActivity)=>(
                <ul className='w-[100%] h-[100px] text-[#FCD378] bg-[#FCD37B1A] m-0  pl-[180px] grid grid-cols-4 items-center'>
                    <li>{eachActivity.mintId}</li>
                    <li>{eachActivity.nri}</li>
                    <li>{eachActivity.price}</li>
                    <ul>
                        <li>{eachActivity.time}</li>
                        <li>{eachActivity.buyStatus}</li>
                    </ul>
                </ul>
            ))}
          </div>
        </div>
      </div>

      <div style={{backgroundImage: `url('/Hero/footer 1.png')`, backgroundRepeat: "no-repeat" }} className='overflow-hidden relative bg-center bg-cover'>
        <Footer />
      </div>
    </div>
  );
};

export default Activity;