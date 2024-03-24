import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NewElection = () => {
    const [electionName, setElectionName] = useState();
    const [electionDescription, setElectionDescription] = useState();
    
    const [candidateList,setCandidateList] = useState([{name:'', info:''}]);

    const navigate = useNavigate();

    const handleCandidateName = (index, data)=>{
        candidateList[index].name = data;
    }
    const handleCandidateInfo = (index, data)=>{
        candidateList[index].info = data;
    }
    const handleAddCandidate=()=>{
        setCandidateList([...candidateList, {name:'', info:''}]);
        console.log(candidateList);
    }
    
    const handleCreateElection = async () =>{
        console.log(electionName);
        console.log(electionDescription);
        console.log(candidateList);
        
        let postObj = {
                name: electionName,
                description: electionDescription,
                candidates:candidateList
            };
        console.log(postObj);

        try{
            await axios.post(`${import.meta.env.VITE_backend_url}/polls/reset`)
                .then(resp=>{
                    console.log(resp.data);
                    return axios.post(`${import.meta.env.VITE_backend_url}/polls/start`,postObj);
                })
                .then(resp=>{
                    console.log(resp.data);
                    navigate('/admin/election');
                })
        }
        catch(err){
            console.log(err);
            alert(err.response.data)
        }
    }

  return (
    <div className='flex flex-col items-center w-full py-10 gap-10'>
        <div className="flex text-3xl font-bold">New Election</div>
        <div className="flex flex-col gap-5 sm:w-[40rem]">
            <div className="flex flex-row justify-between">
                <div className="flex w-[30%]">
                    <p className="flex font-bold text-lg">Name</p>
                </div>
                <div className="flex w-[70%]">
                    <input type="text" placeholder='Name' onChange={(e)=>setElectionName(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex w-[30%]">
                    <p className="flex font-bold text-lg">Description</p>
                </div>
                <div className="flex w-[70%]">
                    <input type="text" placeholder='Description' onChange={(e)=>setElectionDescription(e.target.value)} className="flex w-full border-b-2 rounded-lg" />
                </div>
            </div>
            <div className="flex flex-col gap-5 items-center">
                <div className="flex text-xl justify-center font-bold">Candidates</div>
                {candidateList.map((candidate,index)=>(
                    <div className="flex flex-row gap-3 w-full" key={index}>
                        <div className="flex flex-row gap-3 w-[50%]">
                            <div className="flex">
                                <p className="flex font-bold text-lg">Name</p>
                            </div>
                            <div className="flex w-full">
                                <input type="text" placeholder='Name' onChange={(e)=>handleCandidateName(index,e.target.value)} className="flex w-full border-b-2 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 w-[50%]">
                            <div className="flex">
                                <p className="flex font-bold text-lg">Info</p>
                            </div>
                            <div className="flex w-full">
                                <input type="text" placeholder='Info' onChange={(e)=>handleCandidateInfo(index,e.target.value)} className="flex w-full border-b-2 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center bg-black text-white px-5 py-2 rounded-lg font-bold cursor-pointer w-8" onClick={handleAddCandidate}>+</div>
                <div className="flex justify-center bg-black text-white px-5 py-2 rounded-lg text-xl font-bold cursor-pointer hover:scale-105" onClick={handleCreateElection}>Create Election</div>
            </div>
        </div>
    </div>
  )
}

export default NewElection