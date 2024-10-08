import React, { Fragment, useState, useCallback, useMemo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

export default function BigCalendar() {
  const [myEvents, setEvents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', name: '', contact: '', start: null, end: null });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const localizer = dayjsLocalizer(dayjs);

  // Open dialog when user selects a slot, but only allow times between 8:00 AM and 6:00 PM
  const handleSelectSlot = useCallback(({ start, end }) => {
    const startHour = start.getHours();
    const endHour = end.getHours();

    if (startHour >= 8 && endHour <= 18) {
      setNewEvent({ title: '', name: '', contact: '', start, end }); // Reset form for new event
      setOpenAddDialog(true); // Open the Add Event modal
    } else {
      alert('You can only add events between 8:00 AM and 6:00 PM.');
    }
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
      defaultDate: new Date(2024, 10, 7),
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
      <div style={{ height: '60vh' }}>
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
          min={new Date(1970, 1, 1, 8, 0, 0)} // 8:00 AM
          max={new Date(1970, 1, 1, 18, 0, 0)} // 6:00 PM
        />
      </div>

      {/* Dialog for adding a new event */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Name"
            fullWidth
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Contact Number"
            fullWidth
            value={newEvent.contact}
            onChange={(e) => setNewEvent({ ...newEvent, contact: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>

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
                InputProps={{ readOnly: true }}
                margin="dense"
              />
              <TextField
                label="Name"
                fullWidth
                value={selectedEvent.name}
                InputProps={{ readOnly: true }}
                margin="dense"
              />
              <TextField
                label="Contact Number"
                fullWidth
                value={selectedEvent.contact}
                InputProps={{ readOnly: true }}
                margin="dense"
              />
              <TextField
                label="Start Date/Time"
                fullWidth
                value={formatDateTime(selectedEvent.start)}
                InputProps={{ readOnly: true }}
                margin="dense"
              />
              <TextField
                label="End Date/Time"
                fullWidth
                value={formatDateTime(selectedEvent.end)}
                InputProps={{ readOnly: true }}
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
