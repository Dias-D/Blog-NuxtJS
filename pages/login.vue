<template>
  <div class="container mx-auto w-1/3 py-8">
    <Title>Login | {{ title }}</Title>
    <ul
      v-if="errors.length > 0"
      className="mb-4 list-disc list-inside text-sm text-red-600"
    >
    </ul>
    <form action="#" class="space-y-6" @submit.prevent="login">
      <div>
        <label for="email" class="block font-semibold">Email</label>
        <input
          type="text"
          v-model="email"
          id="email"
          class="px-2 py-2 w-full shadow rounded mt-2"
        />
      </div>
      <div>
        <label for="password" class="block font-semibold">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="px-2 py-2 w-full shadow rounded mt-2"
        />
      </div>

      <div>
        <button
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Login
        </button>
        <span v-if="isLoading">Loading...</span>
      </div>
    </form>
  </div>
</template>
  
<script setup>
definePageMeta({
  middleware: ['guest'],
})

const title = useState("title");

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref([]);

const { $apiFetch } = useNuxtApp();

async function login() {
  isLoading.value = true;

  try {
    const auth = await $apiFetch("/users/tokens/sign_in", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await $apiFetch(`/users/${auth.resource_owner.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
    });

    const { setToken } = useAuth()
    const { setUser } = useUser()
    
    setToken(`Bearer ${auth.token}`)
    setUser( user )

    window.location.pathname = '/my-info'
  } catch (err) {
    console.log(err.data);
  }

  isLoading.value = false;
}
</script>
  