<template>
  <div class="p-6">
    <div class="dashboard-header">
      <h1>Event Dashboard</h1>
      <div class="dashboard-actions">
        <input
          type="text"
          class="search-input"
          placeholder="Search by title or description..."
          v-model="searchTerm"
        />
        <router-link to="/event/new" class="create-button">
          Create Event
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading events...</div>

    <table v-else class="w-full mt-4 border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date & Time</th>
          <th>Location</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in filteredEvents" :key="event._id">
          <td data-label="Title">{{ event.title }}</td>
          <td data-label="Date & Time">{{ new Date(event.datetime).toLocaleString() }}</td>
          <td data-label="Location">{{ event.location }}</td>
          <td data-label="Description">
  <span class="description-text" :title="event.description">{{ event.description }}</span>
</td>
          <td data-label="Actions">
            <div class="action-buttons">
              <router-link :to="`/event/${event._id}/edit`" style="margin-right: 8px; color: red;">
                Edit
              </router-link>
              <button @click="handleDelete(event._id)">Delete</button>
            </div>
          </td>
        </tr>
        <tr v-if="filteredEvents.length === 0">
          <td colspan="4" style="text-align: center; padding: 16px; color: #6b7280;">
            No events found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import eventService from '../services/eventService';

export default {
  setup() {
    const events = ref([]);
    const searchTerm = ref('');
    const loading = ref(false);
    const router = useRouter();

    const loadEvents = async () => {
      loading.value = true;
      try {
        events.value = await eventService.getAllEvents();
      } catch (error) {
        console.error('Failed to load events:', error);
        router.push('/error');
      } finally {
        loading.value = false;
      }
    };

    const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await eventService.deleteEvent(id);
          await loadEvents();
        } catch (error) {
          console.error('Failed to delete event:', error);
          router.push('/error');
        }
      }
    };

    const filteredEvents = computed(() => {
      const term = searchTerm.value.toLowerCase();
      return events.value.filter(event =>
        event.title.toLowerCase().includes(term) ||
        (event.description && event.description.toLowerCase().includes(term)) ||
        (event.location && event.location.toLowerCase().includes(term))
      );
    });

    onMounted(loadEvents);

    return {
      searchTerm,
      filteredEvents,
      handleDelete,
      loading,
    };
  },
};
</script>

<style scoped>
.dashboard-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.dashboard-actions {
  display: flex;
  gap: 12px;
  margin-top: 1rem;
}
.description-text {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
}


.search-input {
  flex: 1 1 300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.create-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.create-button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

.action-buttons button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.action-buttons button:hover {
  background-color: #a71d2a;
}

/* Responsive table on small screens */
@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    display: none;
  }

  tr {
    margin-bottom: 1rem;
    border-bottom: 2px solid #eee;
  }

  td {
    padding-left: 50%;
    position: relative;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.loading {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #555;
}
</style>
