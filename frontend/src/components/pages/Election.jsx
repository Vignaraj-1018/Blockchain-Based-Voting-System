import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Election = () => {

  const [electionData,setElectionData] = useState();
  const [userData,setUserData] = useState();
  const [userVoteData,setUserVoteData] = useState();

  const getElectionData = async () => {
    try {
    const response = await axios.get(`${import.meta.env.VITE_backend_url}/polls`);
    // console.log('Results:', response.data);
    setElectionData(response.data);
    } catch (error) {
    console.error('Error occurred', error);
    }
  };
  
  const checkVote = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend_url}/polls/check-vote/${id}`);
      console.log('Results:', response.data);
      if(response.data == 'not-voted'){
        setUserVoteData(response.data);
      }
      else{
        setUserVoteData({candidate:response.data[3]});
      }
    } catch (error) {
    console.error('Error occurred', error);
    }
  }

  const handleCastVote = (candidate) =>{
    console.log(candidate,userVoteData);
    if(userVoteData !== 'not-voted'){
      return;
    }
    if(confirm(`Vote for ${candidate.name}`)){
      console.log('Vote');
      axios.post(`${import.meta.env.VITE_backend_url}/polls/check-voteability`,{id: userData.user.id.toString()})
      .then(resp=>{
         console.log(resp.data);
         if(resp.data == "not-voted"){
           axios.post(`${import.meta.env.VITE_backend_url}/polls/vote`, {
             candidate: candidate.name,
             id: userData.user.id.toString(),
             name:userData.user.name
           })
           .then(resp=>{
             console.log(resp);
             setUserVoteData({candidate:candidate.name});
             getElectionData();
           })
           .catch(err=>{
             console.log(err);
           })
         }
         else{
          alert(resp.data);
         }
      })
    }
    else{
      console.log('Cancel');
    }
  }

  useEffect(()=>{
    getElectionData();
    setUserData(JSON.parse(localStorage.getItem('user')));
    checkVote(JSON.parse(localStorage.getItem('user')).user.id);
  },[]);

  console.log(electionData,userData,userVoteData);

  return (
    <div className='flex flex-col items-center w-full py-10 gap-10'>
      <div className="flex text-3xl font-bold">Election</div>
      <div className="flex text-2xl flex-row gap-5">
          <span className="flex font-bold">Name: </span>
          <span className="flex" style={{ textTransform: 'capitalize' }}>{electionData?.name}</span>
      </div>
      <div className="flex text-2xl flex-row gap-5">
          <span className="flex font-bold">Description: </span>
          <span className="flex" style={{ textTransform: 'capitalize' }}>{electionData?.description}</span>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
        {electionData?.candidateList.map((candidate,index)=>(
          <div className="flex border-2 border-black p-10 rounded-lg cursor-pointer hover:scale-105" style={{backgroundColor: candidate.name === userVoteData?.candidate ?'black':'white', color: candidate.name === userVoteData?.candidate ?'white':'black'}} onClick={()=>handleCastVote(candidate)}>
            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="flex">{candidate.name}</span>
              <span className="flex">{candidate.info}</span>
            </div>
          </div>
        ))}
      </div>
      {userVoteData === 'not-voted' && <div className="flex justify-center">
        Click on any Candidate to Cast your Vote
      </div>}
      {userVoteData !== 'not-voted' && <div className="flex justify-center">
        You've have already voted
      </div>}
    </div>
  )
}

export default Election