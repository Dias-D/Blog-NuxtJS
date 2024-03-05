<template>
  <div class="bg-gray-100 min-h-screen text-gray-900">
    <Title>{{ title }}</Title>
    <nav class="bg-white shadow text-lg px-6 py-6">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div>
          <NuxtLink to="/">Logo</NuxtLink>
        </div>
        <div>
          <ul class="flex space-x-12">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li v-if="!isLoggedIn"><NuxtLink to="/login">Login</NuxtLink></li>
            <li v-if="!isLoggedIn">
              <NuxtLink to="/register">Register</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <NuxtLink to="/my-info">My Info</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <NuxtLink to="/create">Create</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
            <li>{{ owner?.name }}</li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup>
const title = useState('title', () => 'Nuxt 3 Blog')
const owner = ref(null);

const { $apiFetch } = useNuxtApp()
const { removeToken, isLoggedIn } = useAuth()
const { getUser, removeUser } = useUser()


onMounted(() => {
  if (!isLoggedIn) {
    owner.value = getUser()
  }
});

async function logout() {
  try {
    await $apiFetch(`/users/token/revoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err.data);
  } finally {
    removeToken();
    removeUser();
    window.location.pathname = "/";
  }
}
</script>

<style>
.router-link-active {
  font-weight: bold;
}
</style>
