<template>
  <div class="error-page">
    <h1>Oops! Something went wrong.</h1>
    <p>We couldn’t complete your request. Please try again later.</p>
    <router-link to="/dashboard" class="back-button">Back to Dashboard</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error-page {
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  text-align: center;
  background: #f8d7da;
  border-radius: 12px;
  color: #721c24;
  box-shadow: 0 4px 12px rgba(114, 28, 36, 0.3);
}

.back-button {
  margin-top: 20px;
  display: inline-block;
  background: #721c24;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.back-button:hover {
  background: #501217;
}
</style>
