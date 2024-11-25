import React from "react";
import moment from "moment";

const EventList = ({ event }) => {
  const { summary, job_id, user_det,link } = event;
  const joinMeeting = ()=>{
    window.open(link,'_blank')
  }
  return (
    <div onClick={joinMeeting} className="bg-white shadow-md rounded-lg cursor-pointer overflow-hidden">
      <div className="pl-4 pt-4 pb-0 pr-4">
        <h3 className="text-xl font-semibold capitalize text-gray-700">{job_id.jobRequest_Role}</h3>
      </div>
      <div className="pl-4 pb-4 border-gray-200">
        <div className="text-gray-600 text-sm leading-loose">
          <div className="flex items-center flex-wrap">
            <div>
              <span className="font-semibold">{summary}</span>
              <span className="ml-1 mr-1">|</span>
            </div>
            <div>
              <span className="font-semibold">Interviewer :</span>
              <span className="block sm:inline"> {user_det.handled_by.firstName + ' ' + user_det.handled_by.lastName}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div>
              <span className="font-semibold">Date :</span>
              <span> {moment(event.start).format("Do MMM YYYY")}</span>
              <span className="ml-1 mr-1">|</span>
            </div>

            <div className="flex items-center space-x-1">
              <span className="font-semibold"> Time :</span>
              <span> {moment(event.start).format("hh:mm A")} - </span>
              <span className="block md:inline">{moment(event.end).format("hh:mm A")}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className=" text-gray-600" />
    </div>
  );
};

export default EventList;
