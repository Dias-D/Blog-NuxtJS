<template>
  <div class="container mx-auto w-1/2 py-8">
    <Title>{{ postTitle }} | {{ title }}</Title>
    <h3 class="text-3xl font-bold">
      {{ postTitle }}
    </h3>
    <div class="post-meta text-gray-700 flex items-center space-x-2">
      <div>{{ createdAt }}</div>
      <div>&middot;</div>
      <div>{{ userName }}</div>
    </div>
    <div class="post-content mt-4">{{ body }}</div>
  </div>
</template>
  
  <script setup>
import { format } from 'date-fns'

definePageMeta({
  middleware: ["auth"],
});

const { $apiFetch } = useNuxtApp();
const { getToken } = useAuth();
const title = useState("title");
const route = useRoute();

const post = ref(null);
const postTitle = ref("");
const createdAt = ref("");
const body = ref("");
const userName = ref("");

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

    postTitle.value = post.value.title;
    createdAt.value = format(new Date(post.value.created_at), 'MMMM dd, yyyy');
    body.value = post.value.body;
    userName.value = post.value.user.name;

  } catch (err) {
    window.location.pathname = "/my-info";
  }
});
</script>