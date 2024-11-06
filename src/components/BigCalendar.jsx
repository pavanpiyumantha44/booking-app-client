import React, { Fragment, useState, useCallback, useMemo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import AddBooking from '../pages/Booking/AddBooking';

export default function BigCalendar() {
  const [myEvents, setEvents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: 'Tennis',isSlRecident:'', isEquipementsRequired:'', isCochingSessionsRequired:'',name: '', contact: '', start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const localizer = dayjsLocalizer(dayjs);

  // Open dialog when user selects a slot, but only allow future dates and times between 8:00 AM and 6:00 PM
  const handleSelectSlot = useCallback(({ start, end }) => {
    // const now = new Date(); // Current date and time
    // const startHour = start.getHours();
    // const endHour = end.getHours();

    // if (start < now.setHours(0, 0, 0, 0)) {
    //   alert('You cannot add events to past dates.');
    // } else if (startHour < 6 || endHour > 21) {
    //   alert('You can only add events between 6:00 AM and 9:00 PM.');
    // } else {
    //   setNewEvent({ title: '', name: '', contact: '', start, end }); // Reset form for new event
    //   setOpenAddDialog(true); // Open the Add Event modal
    // }
  }, []);

  // Check if new event overlaps with existing events
  const isOverlap = (newEvent) => {
    return myEvents.some(event => 
      (newEvent.start < event.end && newEvent.end > event.start) // Check for overlap
    );
  };

  // Save event and close modal
  const handleAddEvent = () => {
    if (isOverlap(newEvent)) {
      alert('This time slot is already taken. Please choose a different time.');
    } else {
      setEvents((prev) => [...prev, { ...newEvent, color: getRandomColor() }]); // Assign random color
      setOpenAddDialog(false);
    }
  };

  // Show event details in a dialog
  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setOpenDetailsDialog(true); // Open the Event Details modal
  }, []);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 8),
    }),
    []
  );

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Custom function to style each event
  const eventPropGetter = (event) => {
    const backgroundColor = event.color || '#3174ad'; // Default if no color is assigned
    return { style: { backgroundColor } };
  };

  // Format the start and end date/time for display
  const formatDateTime = (date) => {
    return dayjs(date).format('MMMM D, YYYY h:mm A'); // Example: October 7, 2024 3:00 PM
  };

  return (
    <Fragment>
      <div style={{ height: '60vh',width:'100%',marginTop:'5%' }}>
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          eventPropGetter={eventPropGetter} // Apply custom styles

          // Restrict time to show from 8:00 AM to 6:00 PM
          min={new Date(1970, 1, 1, 6, 0, 0)} // 6:00 AM
          max={new Date(1970, 1, 1, 21, 0, 0)} // 9:00 PM
        />
      </div>
      <AddBooking openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} handleAddEvent={handleAddEvent} startDttm={newEvent.start} endDttm={newEvent.end} newEvent={newEvent} setNewEvent={setNewEvent}/>
      {/* Dialog for showing event details */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <TextField
                label="Event Title"
                fullWidth
                value={selectedEvent.title}
                readonly
                margin="dense"
              />
              <TextField
                label="Name"
                fullWidth
                value={selectedEvent.name}
                readonly
                margin="dense"
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedEvent.email}
                readonly
                margin="dense"
              />
              <TextField
                label="Contact Number"
                fullWidth
                value={selectedEvent.phone}
                readonly
                margin="dense"
              />
              <TextField
                label="Start Date/Time"
                fullWidth
                value={formatDateTime(selectedEvent.start)}
                readonly
                margin="dense"
              />
              <TextField
                label="End Date/Time"
                fullWidth
                value={formatDateTime(selectedEvent.end)}
                readonly
                margin="dense"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
