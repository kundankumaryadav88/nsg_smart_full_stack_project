const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/events`;

async function getAllEvents() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch events");
  return await response.json();
}

async function getEventById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch event");
  return await response.json();
}

async function createEvent(eventData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error("Failed to create event");
  return await response.json();
}

async function updateEvent(id, eventData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return await response.json();
}

async function deleteEvent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
  return true;
}

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
