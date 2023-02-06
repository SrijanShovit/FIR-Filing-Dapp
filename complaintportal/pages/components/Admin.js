import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";


const Admin = () => {
    const [id,setId] = useState(0);
    const [rid,setRId] = useState(0);
    const [approvalRemark,setapprovalRemark] = useState("");
    const [resolutionRemark,setResolutionRemark] = useState("");

    const {contract} = useContract("0x45F757e011608dA67354c2839158cf3a44AF28ef");
    const { data:nextId} = useContractRead(contract, "nextId");
    const { data:pendingApprovals} = useContractRead(contract, "pendingApprovals",0);
    const { data:pendingResolutions} = useContractRead(contract, "pendingResolutions",0);
    const { mutateAsync: calcPendingApprovals} = useContractWrite(contract, "calcPendingApprovals");
    const { mutateAsync: calcPendingResolutions} = useContractWrite(contract, "calcPendingResolutions");

    const { mutateAsync: approveCompalint} = useContractWrite(contract, "approveCompalint");
    const { mutateAsync: resolveComplaint} = useContractWrite(contract, "resolveComplaint");
    const { mutateAsync: declineComplaint} = useContractWrite(contract, "declineComplaint");

    const getPendingApprovals = async () => {
        try {
          const data = await calcPendingApprovals([]);
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }

      const getPendingResolutions = async () => {
        try {
            const data = await calcPendingResolutions([]);
            console.info("contract call successs", data);
          } catch (err) {
            console.error("contract call failure", err);
          }
      }

    const handleApproveComplaint = async () => {
        try {
          const data = await approveCompalint([ id, approvalRemark ]);
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }

    const handleDeclineComplaint = async () => {
        try {
          const data = await declineComplaint([ id, approvalRemark ]);
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }

    const handleResolveComplaint = async()=>{
        try {
            const data = await resolveComplaint([ id, resolutionRemark ]);
            console.info("contract call successs", data);
          } catch (err) {
            console.error("contract call failure", err);
          }
    }
  
    return (
        <div className='getter-container md:p-[30px]  md:m-5 xl:flex xl:flex-row'>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Approvals</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingApprovals}>Next Pending Approval ID</button>
                    {
                        pendingApprovals && (
                            <p className='getter-card-number'>: {pendingApprovals.toString()}</p>
                        )
                    }
                </div>

                <div className='md:flex items-center'>
                    <p className='text-xl font-semibold'>Complaint Id: </p>
                    <input type="number" className='p-1 m-1 md:w-[400px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Id Here'
                        onChange={(e) => { setId(e.target.value) }} />
                </div>
                <div className='md:flex items-center'>
                    <p className='text-xl font-semibold'>Your Remark: </p>
                    <input type="text" className='p-1 m-1 md:w-[400px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Remark Here'
                        onChange={(e) => { setapprovalRemark(e.target.value) }} />
                </div>
                <div className='flex'>
                    <button className="button-common hover:bg-blue-900" onClick={handleApproveComplaint}>Approve Complaint</button>
                    <button className="button-common hover:bg-blue-900" onClick={handleDeclineComplaint}>Decline Complaint</button>
                </div>

            </div>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Resolutions</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingResolutions}>Next Pending Resolution ID</button>
                    {
                        pendingResolutions && (
                            <p className='getter-card-number'>: {pendingResolutions.toString()}</p>
                        )
                    }

                </div>

                <div className='md:flex items-center'>
                    <p className='text-xl font-semibold'>Complaint Id: </p>
                    <input type="number" className='getter-input md:w-[500px]' placeholder='Enter Id Here'
                        onChange={(e) => { setRId(e.target.value) }} />
                </div>
                <div className='md:flex items-center'>
                    <p className='text-xl font-semibold'>Your Remark: </p>
                    <input type="text" className='getter-input md:w-[500px]' placeholder='Enter Remark Here'
                        onChange={(e) => { setResolutionRemark(e.target.value) }} />
                </div>
                <button className="button-common hover:bg-blue-900" onClick={handleResolveComplaint}>Resolve Complaint</button>
            </div>

        </div>
    )
  
}

export default Admin