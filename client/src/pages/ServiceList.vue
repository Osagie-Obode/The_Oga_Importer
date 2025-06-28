<template>
  <div class="max-w-4xl mx-auto my-10">
    <ServiceSelector @selected="setSelected" />
    <div v-if="selected" class="mt-6 text-center text-lg text-green-700">
      You selected: <strong>{{ selected.name }}</strong>
    </div>
  </div>
</template>

<script>
import ServiceSelector from '@/components/ServiceSelector.vue';

export default {
  components: {
    ServiceSelector,
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    setSelected(service) {
      this.selected = service;
    },
  },
};
</script>
