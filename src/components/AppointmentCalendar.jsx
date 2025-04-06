import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button, ListGroup } from 'react-bootstrap';
import { Calendar, Clock, User } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock appointments data - in real app, fetch from Firebase
  const appointments = [
    {
      id: 1,
      clientName: "John Doe",
      time: "09:00 AM",
      type: "Initial Consultation"
    },
    {
      id: 2,
      clientName: "Jane Smith",
      time: "11:00 AM",
      type: "Training Session"
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      time: "02:00 PM",
      type: "Progress Review"
    }
  ];

  return (
    <div>
      <div className="mb-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          className="w-100"
        />
      </div>

      <ListGroup>
        {appointments.map(appointment => (
          <ListGroup.Item key={appointment.id} className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-bold">{appointment.clientName}</div>
              <div className="small text-muted">
                <Clock size={14} className="me-1" />
                {appointment.time} - {appointment.type}
              </div>
            </div>
            <Button variant="outline-primary" size="sm">
              View
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AppointmentCalendar;