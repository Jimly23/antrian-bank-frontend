import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.jpg";
import Button from "../atoms/Button";
import { FaRegClock } from "react-icons/fa6";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getQueues } from "../../api/queueApi";

const Hero = () => {
  const [allQueue, setAllQueue] = useState(0);
  const [queueSuccess, setQueueSuccess] = useState(0);

  useEffect(()=>{
    // getAllQueue();
  },[])

  const getAllQueue = async () => {
    // const queues = await getQueues();
    // const success = queues.filter((queue) => queue.status === 'Success');

    // setQueueSuccess(success.length);
    // setAllQueue(queues.length);
  }
  return (
    <div className="bg-slate-50 h-screen relative">
      <img src={banner} className="w-full h-full object-cover brightness-50" />
      <div className=" absolute z-[10] inset-0 flex items-center justify-center">
        <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
          <div className="py-20">
            <div className="relative text-center">
              <h4 className="text-4xl font-medium text-white">
              Antri di Bank Lebih
              Efisien Menggunakan <span><h5 className='text-4xl font-bold '>AntriBank.</h5></span>
              </h4>
              <p className="my-5 text-white max-w-[600px] mx-auto">
              Hemat waktu dan nikmati kenyamanan antrian yang lebih teratur dengan platform kami.
              </p>
              <div className="cta-box w-[150px] mx-auto mt-10">
                  <Link to={'/antri'}><Button text={"Antri Sekarang"} style={'bg-violet-900 border border-white'}/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
