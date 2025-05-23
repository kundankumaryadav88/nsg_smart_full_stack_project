import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventService from '../services/eventService';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    datetime: '',
    location: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      eventService.getEventById(id).then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await eventService.updateEvent(id, formData);
    } else {
      await eventService.createEvent(formData);
    }
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
  <h2>{id ? "Edit Event" : "Create Event"}</h2>
  <form onSubmit={handleSubmit}>
    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
    <input name="datetime" type="datetime-local" value={formData.datetime} onChange={handleChange} required />
    <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="4" />
    <button type="submit">{id ? "Update" : "Create"}</button>
  </form>
</div>

  );
};

export default EventForm;
