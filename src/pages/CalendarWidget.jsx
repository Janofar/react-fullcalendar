import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Modal from '../components/common/Modal';
import EventCard from '../components/EventList';
import { EventDetails } from '../components/EventDetails';
import '../styles/calendar.css';
import { Plus } from 'lucide-react';
import moment from 'moment';
import eventsListData from '../data/calendarfromtoenddate.json';
const EVENT_LIST_MODAL = 1;
const EVENT_DETAIL_MODAL = 2;

const CalendarWidget = () => {
  const [isEventListModalOpen, setEventListModalOpen] = useState(false);
  const [isEventDetailModalOpen, setEventDetailModalOpen] = useState(false);
  const [clickedEvents, setClickedEvents] = useState([]);
  const [selectedEvent,setSelectedEvent] = useState({});

  const consolidateEvents = () => {
    const groupedEvents = {};

    eventsListData.forEach((event) => {
      const key = `${event.start}-${event.end}`;
      if (!groupedEvents[key]) {
        groupedEvents[key] = [];
      }
      groupedEvents[key].push(event);
    });

    return Object.values(groupedEvents).map((group) => {
      if (group.length > 1) {
        return {
          ...group[0],
          isMultiple: true,
          overlappingEvents: group,
          title: `${group.length} Events`,
        };
      }

      return {
        ...group[0],
        startVal : group[0].start,
        endVal : group[0].end,
        isMultiple: false,
        overlappingEvents: [],
      };
    });
  };
  const handleEventClick = (info) => {
    const extendedPropEvent = info.event._def.extendedProps
    const eventsToShow = extendedPropEvent.overlappingEvents;

    if(eventsToShow.length > 0){
      setClickedEvents(eventsToShow);
      setEventListModalOpen(true);
    } else{
      setSelectedEvent(extendedPropEvent)
      setEventDetailModalOpen(true)
    }
  };
  const closeEventListModal = () => {
    setEventListModalOpen(false);

  };
  const closeEventDetailModal = () => {
    setEventDetailModalOpen(false);
  };
  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
  };

  const formatTime = (time) => {
    return moment(time).format('h A').replace('AM', 'A.M').replace('PM', 'P.M');
  };
  return (
    <div>
      <div  className="flex justify-end items-end">
        <button className="flex items-center  bg-white text-blue-500 px-4 py-2 rounded  hover:text-blue transition">
          <Plus className="w-5 h-5 mr-2" />
          Create Schedule
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        headerToolbar={{
          left: `prev,next today`,
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,year',
        }}
        views={{
          year: {
            type: 'dayGrid',
            duration: { months: 12 },
            buttonText: 'Year',
          },
          timeGridWeek: {
            titleFormat: (args) => {
              const { start, end } = args;
              const startFormatted = moment.utc(start).local().format('Do MMMM');
              const endFormatted = moment.utc(end).local().format('Do MMMM, YYYY');
              return `${startFormatted} to ${endFormatted}`;
            },
          },
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={false}
        dayHeaderContent={(arg) => {
          const view = arg.view;
          if (view.type === 'dayGridMonth') {
            const weekday = arg.date.toLocaleString('default', { weekday: 'long' });
            return (
              <div>{weekday}</div>
            );
          }

          const date = new Date(arg.date);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' });
          const weekday = date.toLocaleString('default', { weekday: 'long' });

          return (
            <>
              <div>{`${day} ${month}`}</div>
              <div>{weekday}</div>
            </>
          );
        }}
        
        slotLabelInterval="01:00:00" 
        // slotMinTime='10:00:00'
        // slotMaxTime="18:00:00"
        // contentHeight={100}
        dayMaxEventRows={true}
        events={consolidateEvents()}
        selectable={true}
        slotEventOverlap={false} 
        dayMaxEvents={true}
        height="auto"
        eventClassNames={(arg) => [`custom-event-${arg.event.id}`]}
        eventContent={(eventInfo) => {
          const { job_id,user_det,overlappingEvents} = eventInfo.event._def.extendedProps;
          const {startStr,endStr} = eventInfo.event;
         
          return (
            <div className="flex flex-col max-h-full overflow-hidden">
              <span className="flex-shrink capitalize xl:text-custom-xl lg:text-custom-lg md:text-custom-md">
                {job_id.jobRequest_Title}
              </span>
              <span className="flex-shrink xl:text-custom-xl lg:text-custom-lg md:text-custom-md">
                Interviewer : {user_det.handled_by.firstName + ' ' + user_det.handled_by.lastName}
              </span>
              <span className="flex-shrink xl:text-custom-xl lg:text-custom-lg md:text-custom-md">
                Time : {moment(startStr).format('h:mm A')} - {moment(endStr).format('h:mm A')}
              </span>
              {overlappingEvents.length > 0 && (
                <div className="badge flex-shrink mt-1">{overlappingEvents.length}</div>
              )}
            </div>
          );
        }}
        eventsSet={function(events) {
          const weekViewApi = document.querySelector('.fc-timeGridWeek-view');
          const dayViewApi = document.querySelector('.fc-dayGridDay-view');
          
          if (!weekViewApi && !dayViewApi) {
            return;
          }
          events.forEach((event)=>{
            const overlappingEvents = event._def.extendedProps.overlappingEvents;
            let startVal,endVal = '';
            if(overlappingEvents.length > 0 ){
              startVal = overlappingEvents[0].start;
              endVal = overlappingEvents[0].end;
            } else {
              startVal = event._def.extendedProps.startVal;
              endVal = event._def.extendedProps.endVal;
            }
          
            const startTime = moment(startVal).format("HH:mm:ss"); 
            const endTime = moment(startTime, "HH:mm:ss").add(30, 'minutes').format("HH:mm:ss");
            document.querySelector(`.fc-timegrid-slot[data-time="${startTime}"]`).style.height ='2.8rem';
            document.querySelector(`.fc-timegrid-slot[data-time="${endTime}"]`).style.height ='2.8rem';
          })
         
        }}
        slotLabelFormat={(args) => formatTime(args.date)}
        eventTimeFormat={(args) => formatTime(args.date)}
      />
      <Modal 
        isOpen={isEventListModalOpen} 
        onClose={closeEventListModal} 
        showEdgeCloseButton={false} 
        modalHeader='Meetings'
        modalType = {EVENT_LIST_MODAL}
      >
        {clickedEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </Modal>
      <Modal
        isOpen={isEventDetailModalOpen}
        onClose={closeEventDetailModal}
        showEdgeCloseButton={true}
        modalType = {EVENT_DETAIL_MODAL}
      >
        <EventDetails event={selectedEvent}/>
      </Modal>
    </div>
  );
};

export default CalendarWidget;
