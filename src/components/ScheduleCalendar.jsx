import React, { useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { Button, ButtonGroup } from "@mui/material";

const ScheduleCalendar = () => {
  const [view, setView] = useState("week");
  const calendars = [
    {
      id: "cal1",
      name: "Personal",
      color: "white",
      backgroundColor: "#2196f3",
    },
  ];
  const template = {
    task(event) {
      return `<span style="color: red;">${event.title} hello</span>`;
    },
  };
  const initialEvents = [
    {
      id: "1",
      calendarId: "cal1",
      title: "Lunch",
      category: "time",
      start: "2024-09-25T12:00:00",
      end: "2024-09-25T13:30:00",
    },
    {
      id: "2",
      calendarId: "cal1",
      title: "Coffee Break",
      category: "time",
      start: "2024-09-28T15:00:00",
      end: "2024-09-28T15:30:00",
    },
  ];

  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      >
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            variant={view === "month" ? "contained" : "outlined"}
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button
            variant={view === "week" ? "contained" : "outlined"}
            onClick={() => setView("week")}
          >
            Week
          </Button>
          <Button
            variant={view === "day" ? "contained" : "outlined"}
            onClick={() => setView("day")}
          >
            Day
          </Button>
        </ButtonGroup>
      </div>
      <Calendar
        height="900px"
        view={view}
        month={{
          dayNames: ["S", "M", "T", "W", "T", "F", "S"],
          visibleWeeksCount: 3,
        }}
        calendars={calendars}
        events={initialEvents}
        setOptions={template}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
  );
};

export default ScheduleCalendar;
