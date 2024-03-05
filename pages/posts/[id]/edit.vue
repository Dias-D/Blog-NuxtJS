<template>
  <div class="container mx-auto w-1/2 py-8">
    <ul
      className="mb-4 list-disc list-inside text-sm text-red-600"
    >
    </ul>
    <h2 class="text-2xl">Edit Post</h2>
    <form action="#" class="space-y-6" @submit.prevent="updatePost">
      <div>
        <label for="title" class="block font-semibold">Title</label>
        <input
          type="text"
          v-model="title"
          id="title"
          class="px-2 py-2 w-full shadow rounded mt-2"
        />
      </div>
      <div>
        <label for="body" class="block font-semibold">Body</label>
        <textarea
          v-model="body"
          name="body"
          id="body"
          cols="30"
          rows="10"
          class="px-2 py-2 w-full shadow rounded mt-2"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Update Post
        </button>
        <span v-show="isLoading">Loading...</span>
      </div>
    </form>
    <div class="mt-4">
      <button @click="deletePost">Delete Post</button>
    </div>
  </div>
</template>
  
  <script setup>
definePageMeta({
  middleware: ["auth"],
});

const body = ref("");
const isLoading = ref(false);
const title = ref("");
const post = ref(null);

const { $apiFetch } = useNuxtApp();
const { getToken } = useAuth();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const token = getToken();

  try {
    post.value = await $apiFetch(`/posts/${route.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    title.value = post.value.title;
    body.value = post.value.body;
  } catch (err) {
    window.location.pathname = "/my-info";
  }
});

async function updatePost() {
  isLoading.value = true;
  try {
    const post = await $apiFetch(`/posts/${route.params.id}`, {
      method: "PUT",
      body: {
        title: title.value,
        body: body.value,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    isLoading.value = false;

    title.value = "";
    body.value = "";

    alert("updated post");

    router.push("/my-info");
  } catch (err) {
    if (err.response.status === 403) {
      alert(err.data.message);
      return;
    }
    console.log(err.data);
    isLoading.value = false;
  }
}

async function deletePost() {
  isLoading.value = true;
  try {
    const post = await $apiFetch(`/posts/${route.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    isLoading.value = false;

    title.value = "";
    body.value = "";

    alert("deleted post");

    router.push("/my-info");
  } catch (err) {
    console.log(err.data);
    isLoading.value = false;
  }
}
</script>
  