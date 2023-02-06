import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Admin = () => {
    const [id,setId] = useState(0);
    const [rId,setRId] = useState(0);
    const [approvalRemark,setapprovalRemark] = useState("");
    const [resolutionRemark,setResolutionRemark] = useState("");

    const {contract} = useContract("0x70017Cd7FEf1057Cb7C556554d184e4521e8d34E");
    const { data:nextId} = useContractRead(contract, "nextId");
    const { data:pendingApprovals} = useContractRead(contract, "pendingApprovals",0);
    const { data:pendingResolutions} = useContractRead(contract, "pendingResolutions",0);
    const { mutateAsync: calcPendingApprovals} = useContractWrite(contract, "calcPendingApprovals");
    const { mutateAsync: calcPendingResolutions} = useContractWrite(contract, "calcPendingResolutions");

    const { mutateAsync: approveCompalint} = useContractWrite(contract, "approveCompalint");
    const { mutateAsync: resolveComplaint} = useContractWrite(contract, "resolveComplaint");
    const { mutateAsync: declineComplaint} = useContractWrite(contract, "declineComplaint");

    const getPendingApprovals = async () => {
        const notification = toast.loading("Getting Pending Approval Id");
        try {
          const data = await calcPendingApprovals([]);
          toast.success(`Fetched pending approvals number`,{
            id:notification
        });
          console.info("contract call successs", data);
        } catch (err) {
            toast.error("Sorry!! Something went wrong",{
                id:notification 
            });
          console.error("contract call failure", err);
        }
      }

      const getPendingResolutions = async () => {
        const notification = toast.loading("Getting Pending Resolution Id");
        try {
            const data = await calcPendingResolutions([]);
            toast.success(`Fetched pending resolutions number`,{
                id:notification
            });
            console.info("contract call successs", data);
          } catch (err) {
            toast.error("Sorry!! Something went wrong",{
                id:notification 
            });
            console.error("contract call failure", err);
          }
      }

    const handleApproveComplaint = async () => {
        const notification = toast.loading("Approving complaint");

        try {
          const data = await approveCompalint([ id, approvalRemark ]);
          toast.success(`Approved Complaint with Id ${id}`,{
            id:notification
        });
          console.info("contract call successs", data);
        } catch (err) {
            toast.error("Sorry!! Something went wrong",{
                id:notification 
            });
          console.error("contract call failure", err);
        }
      }

    const handleDeclineComplaint = async () => {
        const notification = toast.loading("Declining complaint");
        try {
          const data = await declineComplaint([ id, approvalRemark ]);
          toast.success(`Declined Complaint with Id ${id}`,{
            id:notification
        });
          console.info("contract call successs", data);
        } catch (err) {
            toast.error("Sorry!! Something went wrong",{
                id:notification 
            });
          console.error("contract call failure", err);
        }
      }

    const handleResolveComplaint = async()=>{
        const notification = toast.loading("Marking case solved");
        try {
            const data = await resolveComplaint([ rId, resolutionRemark ]);
            toast.success(`Solved Case with Id ${rId}`,{
                id:notification
            });
            console.info("contract call successs", data);
          } catch (err) {
            toast.error("Sorry!! Something went wrong",{
                id:notification 
            });
            console.error("contract call failure", err);
          }
    }

    console.log("pendingApprovals : ",pendingApprovals);
    console.log("pendingResolutions : ",pendingResolutions);
  
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