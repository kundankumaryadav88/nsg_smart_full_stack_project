import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api/events`;

const getAllEvents = async () => {
  const res = await axios.get(API);
  return res.data;
};

const getEventById = async id => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};


const createEvent = async data => {
  const res = await axios.post(API, data);
  return res.data;
};

const updateEvent = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

const deleteEvent = async id => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
