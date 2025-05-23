import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import eventService from "../services/eventService";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadEvents = async () => {
    const data = await eventService.getAllEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await eventService.deleteEvent(id);
      loadEvents();
    }
  };

  const filteredEvents = events.filter((event) => {
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.description?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term)
     );
  });

  return (
    <div className="p-6">
      <div className="dashboard-header">
        <h1>Event Dashboard</h1>
        <div className="dashboard-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/event/new" className="create-button">
            Create Event
          </Link>
        </div>
      </div>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id}>
              <td data-label="Title">{event.title}</td>
              <td data-label="Date & Time">{new Date(event.datetime).toLocaleString()}</td>
              <td data-label="Location">{event.location}</td>
              <td data-label="Actions">
                <div className="action-buttons">
                  <Link to={`/event/${event._id}/edit`} style={{ marginRight: "8px", color: "red" }}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredEvents.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "16px", color: "#6b7280" }}>
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
