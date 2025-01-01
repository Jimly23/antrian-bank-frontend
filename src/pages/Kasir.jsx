import React, { useEffect, useState } from "react";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import Button from "../components/atoms/Button";
import { getQueues, updateQueueStatus } from "../api/queueApi";

const Kasir = () => {
  const [allQueue, setAllQueue] = useState(0);
  const [queueData, setQueueData] = useState([])
  const [queueSuccess, setQueueSuccess] = useState(0);

  useEffect(()=>{
    getAllQueue();
  },[])

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.queue.filter((queue) => queue.status === 'Success');
    
    setQueueSuccess(success.length);
    setAllQueue(queues.queue.length);

    let queueId = []
    for(let i=0; i<queues.queue.length; i++){
      queueId.push(queues.queue[i].id)
    }
    setQueueData(queueId)
  }

  const handleUpdateStatus = async () => {
    console.log(queueData[queueSuccess]);
    const response = await updateQueueStatus(queueData[queueSuccess]);
    console.log(response);
    getAllQueue();
  }

  return (
    <div className="bg-violet-50 pt-20 h-screen">
      <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
        <h4 className="text-center text-4xl font-medium">KASIR</h4>
        <div className='w-[750px] mx-auto rounded-lg bg-white shadow mt-10 grid grid-cols-2 gap-2 p-5'>
          <div className="rounded-md col-span-2 border w-full text-center gap-x-3 p-5">
              <HiMiniUser className="text-violet-500 mx-auto" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Antrian Saat Ini</h5>
                  <p className="text-[50px]">{allQueue == 0? 0 : allQueue == queueSuccess? allQueue: queueSuccess + 1}</p>
              </div>
          </div>
          <div className="rounded-md border w-full h-[100px] flex items-center gap-x-3 p-5">
              <HiMiniUserGroup className="text-red-500" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Jumlah Antrian</h5>
                  <p>{allQueue}</p>
              </div>
          </div>
          <div className="rounded-md border w-full h-[100px] flex items-center gap-x-3 p-5">
              <HiMiniUser className="text-green-500" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Antrian Selesai</h5>
                  <p>{queueSuccess}</p>
              </div>
          </div>

          <div onClick={handleUpdateStatus} className='col-span-2 text-center pt-5'>
            <Button  text={"Berikutnya"} style={'py-5'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kasir;
