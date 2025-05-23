
<template>
  <div>
    <header class="main-header">
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main-header {
  background-color: #007bff;
  padding: 1rem;
  color: white;
}

nav a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  margin-right: 1rem;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 1rem;
  min-height: calc(100vh - 60px);
  background-color: #f5f7fa;
}
</style>
