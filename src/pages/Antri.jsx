import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/template/Navbar'
import logo from './../assets/images/logo.png'
import { HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2'
import Button from '../components/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { getUserById } from '../api/userApi'
import { getQueues, createQueue, getQueueByUser } from '../api/queueApi'

const Antri = () => {
  const navigate = useNavigate()
  const [tokenValue, setTokenValue] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAntri, setIsAntri] = useState(false);
  const [allQueue, setAllQueue] = useState(0);
  const [queueSuccess, setQueueSuccess] = useState(0);
  const [myQueue, setMyQueue] = useState(null);
  const [estMyQueue, setEstMyQueue] = useState(null);

  useEffect(() => {
    getAuthToken();
    getAllQueue();
  }, []);
  
  useEffect(()=>{
    userQueue();
  }, [isAntri])

  const getAuthToken = () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      setTokenValue(token);
    } else {
      setIsLogin(true);
    }
  }

  const userQueue = async () => {
    const token = Cookies.get('authToken');
    const user = await getUserById(token);
    const telepon = user.user.telepon;
    const getQueue = await getQueueByUser(telepon);
    const response = getQueue.queue
    const lastQueue = response[response.length - 1]
    console.log(lastQueue)
    
    if(lastQueue.status == "In Queue"){
      setMyQueue(lastQueue.queue)
      setIsAntri(true);
      setEstMyQueue(lastQueue.estimationQueue)
    }
  }

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.queue.filter((queue) => queue.status === 'Success');
    setQueueSuccess(success.length);
    setAllQueue(queues.queue.length);
  }

  const handleSetAntri = async () => {
    const user = await getUserById(tokenValue);
    const nowQueue = await getQueues();
    const inQueue = nowQueue.queue.length - queueSuccess;

    const startQueue = new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
    const estQueue = new Date();
    estQueue.setMinutes(estQueue.getMinutes() + (inQueue * 10));

    const queueData = {
      username: user.user.username,
      telepon: user.user.telepon,
      queue: nowQueue.queue.length + 1,
      startQueue: startQueue.replace(".", ":"),
      estimationQueue: estQueue.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }).replace(".", ":"),
      date: new Date().toLocaleDateString("id-ID"),
      status: "In Queue"
    }
    await createQueue(queueData);

    userQueue()
  }
  return (
    <>
      <Navbar />
      <div className="bg-violet-50 pt-20 h-screen">
        <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
          {isAntri?
            <div className='w-[400px] mx-auto rounded-lg bg-white shadow mt-10 p-5'>
              <div className='text-center'>
                <h5 className='font-medium text-xl'>Nomor Antrian Anda</h5>
                <h1 className='fotn-medium text-[100px]'>{myQueue}</h1>
                <h5>Estimasi <span className='font-medium'>{estMyQueue}</span></h5>
              </div>
            </div>
            :       
            <div className='w-[400px] mx-auto rounded-lg bg-white shadow mt-10 p-5'>
              <div className="rounded-md w-full h-[100px]  p-5">
                  <HiMiniUser className="text-violet-500 mx-auto" size={50}/>
                  <div className="font-medium text-center">
                      <h5 className="text-lg">Antrian Saat Ini</h5>
                      <p>{allQueue == 0? 0 : allQueue == queueSuccess? allQueue: queueSuccess + 1}</p>
                  </div>
              </div>
              <hr className='my-10 mt-16'/>
              <div className="rounded-md w-full h-[100px]  p-5">
                  <HiMiniUserGroup className="text-violet-500 mx-auto" size={50}/>
                  <div className="font-medium text-center">
                      <h5 className="text-lg">Jumlah Antrian</h5>
                      <p>{allQueue}</p>
                  </div>
              </div>

              <div onClick={handleSetAntri} className='pt-5 w-full flex justify-center mt-10'>
                <Button  text={"Antri"} style={'py-3 bg-violet-500'}/>
              </div>
            </div>
          }

        </div>
      </div>

      {/* Pop-up */}
      {isLogin && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          
        >
          <div onClick={()=>navigate('/login')}>
            <div className='text-center w-[500px] py-16 bg-violet-900 text-white rounded-lg'>
              <p>Untuk Mengambil Nomor antrian</p>
              <h5 className='text-xl font-bold'>Silahkan Login Terlebih Dahulu</h5>
              <p className='underline mt-5 font-medium cursor-pointer'>Login</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Antri