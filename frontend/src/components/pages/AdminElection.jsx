import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminElection = () => {

    const [electionData, setElectionData] = useState();
    const [votes,setVotes] = useState();
    const [electionStatus, setElectionStatus] = useState();

    const navigate = useNavigate();

    const getElectionData = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_backend_url}/polls/votes`);
        console.log('Results:', response.data);
        transformData(response.data.votes);
        setElectionData(response.data);
        } catch (error) {
        console.error('Error occurred', error);
        }
    };

    const getElectionStatus = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_backend_url}/polls/status`);
        console.log('Results:', response.data);
        setElectionStatus(response.data.status);
        } catch (error) {
        console.error('Error occurred', error);
        }
    };

  useEffect(()=>{
      getElectionData();
      getElectionStatus();
      
  },[]);

  const transformData = (data) => {
    setVotes(Object.entries(data).map(([name, vote]) => ({
            name,
            vote,
            percentage: (vote / Object.values(data).reduce((acc, curr) => acc + curr, 0)) * 100
        })));
    }

    const handleFinishElection = async() =>{
        if(electionStatus === 'finished'){
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_backend_url}/polls/end`);
            console.log('Results:', response.data);
            // setElectionStatus(response.data.status);
            } catch (error) {
            console.error('Error occurred', error);
        }
        getElectionStatus();
    }

  console.log(electionData,electionStatus);

  return (
    <div className='flex flex-col items-center w-full gap-10'>
        <div className="flex text-3xl font-bold">Admin Election</div>
        <div className="flex text-2xl flex-row gap-5">
            <span className="flex font-bold">Name: </span>
            <span className="flex" style={{ textTransform: 'capitalize' }}>{electionData?.electionName}</span>
        </div>
        <div className="flex text-2xl flex-row gap-5">
            <span className="flex font-bold">Status: </span>
            <span className="flex" style={{ textTransform: 'capitalize' }}>{electionStatus}</span>
        </div>
        <div className="flex flex-row flex-wrap gap-20 items-center justify-center">
            {votes?.map((candidate,index) =>(
                <div className="flex flex-col items-center gap-2" key={index}>
                    <div className="flex border-2 border-black h-40 w-20 rounded-lg relative">
                        <div className="flex absolute left-0 right-0 bottom-0 bg-slate-800" style={{ height: `${candidate.percentage}%`}}>
                        </div>
                    </div>
                    <div className="flex ">{candidate.vote}</div>
                    <span className="flex text-2xl font-bold">{candidate.name}</span>
                </div>
            ))}
        </div>
        <div className="flex justify-center bg-black text-white px-5 py-2 rounded-lg text-xl font-bold cursor-pointer hover:scale-105" onClick={handleFinishElection}>Finish Election</div>
        <div className="flex justify-center bg-black text-white px-5 py-2 rounded-lg text-xl font-bold cursor-pointer hover:scale-105" onClick={()=>navigate('/admin/election/new')}>Create New Election</div>
    </div>
  )
}

export default AdminElection