<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h3 class="text-xl font-bold mb-4 text-primary">Choose a Service</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="svc in services"
        :key="svc.id"
        @click="selectService(svc)"
        :class="[
          'border rounded p-4 cursor-pointer transition text-center flex flex-col items-center',
          selected?.id === svc.id ? 'bg-purple-100 border-primary' : 'hover:border-primary'
        ]"
      >
        <img :src="svc.icon" alt="Service Icon" class="w-12 h-12 mb-2 mx-auto" />
        <h4 class="font-semibold text-lg text-primary">{{ svc.name }}</h4>
        <p class="text-sm text-gray-600">{{ svc.description }}</p>
      </div>
    </div>
    <div v-if="selected" class="mt-4 text-sm text-green-600 text-center">
      ✅ You selected: <strong>{{ selected.name }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceSelector',
  emits: ['selected'],
  data() {
    return {
      selected: null,
      services: [
        {
          id: 'svc1',
          name: 'Procurement & Sourcing',
          description: 'We help you find the best products and suppliers in China.',
          icon: new URL('@/assets/branding/icons/procure.png', import.meta.url).href
        },
        {
          id: 'svc2',
          name: 'OEM Manufacturing',
          description: 'We manage your custom manufacturing and packaging.',
          icon: new URL('@/assets/branding/icons/oem.png', import.meta.url).href
        },
        {
          id: 'svc3',
          name: 'Secure Payments',
          description: 'Pay Chinese suppliers through us with security and ease.',
          icon: new URL('@/assets/branding/icons/payment.png', import.meta.url).href
        },
        {
          id: 'svc4',
          name: 'Shipping & Customs',
          description: 'We handle delivery, tracking and clearance to Nigeria.',
          icon: new URL('@/assets/branding/icons/ship.png', import.meta.url).href
        },
        {
          id: 'svc5',
          name: 'Supplier Verification',
          description: 'Avoid scams by letting us verify suppliers for you.',
          icon: new URL('@/assets/branding/icons/verify.png', import.meta.url).href
        },
        {
          id: 'svc6',
          name: 'Import Coaching',
          description: 'Join our academy and learn how to import profitably.',
          icon: new URL('@/assets/branding/icons/coach.png', import.meta.url).href
        }
      ]
    };
  },
  methods: {
    selectService(service) {
      this.selected = service;
      this.$emit('selected', service);
    }
  }
};
</script>
