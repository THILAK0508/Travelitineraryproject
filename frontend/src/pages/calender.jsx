import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import '../css/calendar.css';
import Footer from '../components/footer';
const Calendar = () => {
  const [daysInMonth] = useState(31);
  const [calendar, setCalendar] = useState([]);
  const [activities, setActivities] = useState({}); 
  const [selectedDate, setSelectedDate] = useState('');
  const [activity, setActivity] = useState('');


  useEffect(() => {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setCalendar(days);
  }, [daysInMonth]);

  const handleAddActivity = (e) => {
    e.preventDefault();

    if (!selectedDate || !activity.trim()) {
      alert('Please select a valid date and activity!');
      return;
    }

    const day = new Date(selectedDate).getDate();
    setActivities((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), activity],
    }));

    setSelectedDate('');
    setActivity('');
  };

  return (
    <div className="container">
        <Header />

      <section className="calendar">
        <h2>Plan Your Activities</h2>
        <div id="calendar" className="calendar-grid">
          {calendar.map((day) => (
            <div key={day} className="day-box">
              <span className="day-label">{day}</span>
              <ul>
                {activities[day]?.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <form id="eventForm" onSubmit={handleAddActivity}>
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />

          <label htmlFor="event">Add Activity:</label>
          <input
            type="text"
            id="event"
            placeholder="e.g., Visit Eiffel Tower"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />

          <button type="submit">Add to Calendar</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Calendar;
