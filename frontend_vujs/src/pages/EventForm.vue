
<template>
  <div class="form-container">
    <h2>{{ isEditMode ? 'Edit Event' : 'Create Event' }}</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <input name="title" placeholder="Title" v-model="formData.title" required />
      <input name="datetime" type="datetime-local" v-model="formData.datetime" required />
      <input name="location" placeholder="Location" v-model="formData.location" required />
      <textarea name="description" placeholder="Description" v-model="formData.description" required rows="4" />
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>

    <div v-if="loading" class="loading">Loading event data...</div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import eventService from '../services/eventService';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const formData = ref({
      title: '',
      datetime: '',
      location: '',
      description: '',
    });

    const isEditMode = computed(() => !!route.params.id);

    const loadEvent = async () => {
      if (isEditMode.value) {
        loading.value = true;
        try {
          const data = await eventService.getEventById(route.params.id);
          formData.value = data;
        } catch (error) {
          console.error('Failed to load event:', error);
          router.push('/error');
        } finally {
          loading.value = false;
        }
      }
    };

    const handleSubmit = async () => {
      try {
        if (isEditMode.value) {
          await eventService.updateEvent(route.params.id, formData.value);
        } else {
          await eventService.createEvent(formData.value);
        }
        router.push('/dashboard');
      } catch (error) {
        console.error('Failed to submit event:', error);
        router.push('/error');
      }
    };

    onMounted(loadEvent);

    return {
      formData,
      isEditMode,
      handleSubmit,
      loading,
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.loading {
  text-align: center;
  margin-top: 1rem;
  color: #555;
}

@media (max-width: 600px) {
  .form-container {
    padding: 1rem;
  }

  input, textarea, button {
    font-size: 0.95rem;
  }
}
</style>
