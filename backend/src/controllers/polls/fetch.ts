import { Request, Response } from "express";
import ElectionContract from "../../web3";

export default async (req: Request, res: Response) => {
  const instance = await ElectionContract.deployed();
  const name = await instance.getElectionName();
  const description = await instance.getElectionDescription();

  const candidates = await instance.getCandidates();
  const candidateInfos = await instance.getCandidateInfos();
  const votes = await instance.getVotes();

  const candidateList: any = [];

  for (let i = 0; i < candidates.length; i++) {
    candidateList.push({name: candidates[i], info : candidateInfos[i]});
  }

  // for (let i = 0; i < votes.length; i++) {
  //   const vote = votes[i];

  //   if (typeof response[vote[3]] != "undefined")
  //     response[vote[3]] = response[vote[3]] + 1;
  // }

  return res.send({ name, description, candidateList });
};
