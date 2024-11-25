import React from 'react'
import LogoMeet from '../assets/img/logo_meet.png';
import { Eye, Download } from 'lucide-react';
import moment from 'moment';

export const EventDetails = ({ event }) => {
    const { job_id, startVal, endVal, user_det,link } = event;
    const joinMeet =()=>{
        window.open(link,'_blank')
    }
    return (
        <div className="p-4 border border-gray-300 shadow-md">
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex-1 basis-1/2 space-y-2 border border-gray-300 p-2 font-normal capitalize">
                    <p className="text-gray-700 leading-loose">
                        <span>Interview With : {user_det.candidate.candidate_firstName + ' ' + user_det.candidate.candidate_lastName}</span>
                    </p>
                    <p className="text-gray-700 leading-loose">
                        <span >Position : {job_id.jobRequest_Title}</span>
                    </p>
                    <p className="text-gray-700 leading-loose">
                        <span >Created By : HR Manager</span>
                    </p>
                    <p className="text-gray-700 leading-loose">
                        <span >Interview Date : {moment(startVal).format("Do MMM YYYY")}</span>
                    </p>
                    <p className="text-gray-700  leading-loose">
                        <span >Interview Time : {moment(startVal).format("mm") === "00"
                            ? moment(startVal).format("h A")
                            : moment(startVal).format("h:mm A")} -&nbsp;
                            {moment(endVal).format("mm") === "00"
                                ? moment(endVal).format("h A")
                                : moment(endVal).format("h:mm A")}
                        </span>
                    </p>
                    <p className="text-gray-700 leading-loose">
                        <span >Interview Via : Google Meet</span>
                    </p>
                    <div className="w-full h-12 p-4 border  flex items-center justify-between border-blue-500 text-blue-500 rounded">
                        <span className="mr-2 leading-loose cursor-pointer truncate">Resume.docx</span>
                        <div className="flex items-center gap-4">
                            <Eye className="w-5 h-5 cursor-pointer hover:text-blue-700 -mb-1" />
                            <Download className="w-5 h-5 cursor-pointer hover:text-blue-700" />
                        </div>
                    </div>
                    <div className="w-full  h-12 p-4 border flex items-center justify-between border-blue-500 text-blue-500 rounded">
                        <span className="mr-2 leading-loose cursor-pointer truncate">Aadharcard</span>
                        <div className="flex items-center gap-4">
                            <Eye className="w-5 h-5 cursor-pointer hover:text-blue-700 -mb-1" />
                            <Download className="w-5 h-5 cursor-pointer hover:text-blue-700" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 basis-1/2 border  border-gray-300 p-2 flex flex-col items-center justify-center">
                    <img
                        src={LogoMeet}
                        alt="Google Meet"
                        className="w-40 h-30 p-4 mb-8 border border-gray-300"
                    />

                    <button onClick={joinMeet} className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600">
                        JOIN
                    </button>
                </div>
            </div>


        </div>
    )
}
