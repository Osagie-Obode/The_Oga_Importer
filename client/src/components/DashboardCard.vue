<template>
  <router-link :to="to" class="bg-white p-4 rounded shadow hover:bg-gray-50 transition flex items-center gap-4">
    <div class="text-3xl">{{ icon }}</div>
    <div class="text-lg font-semibold">{{ title }}</div>
  </router-link>
</template>

<script>
export default {
  props: ['icon', 'title', 'to']
};
</script>
