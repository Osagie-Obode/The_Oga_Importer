<template>
  <div class="py-16 px-6 bg-gray-100 min-h-screen">
    <div class="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">Shipment Tracking</h1>

      <form @submit.prevent="trackShipment" class="space-y-4">
        <input
          v-model="trackingNo"
          type="text"
          placeholder="Enter Tracking Number (E.g OGA000123)"
          class="input"
          required
        />
        <button
          type="submit"
          class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition w-full"
        >
          Track
        </button>
      </form>

      <!-- Error -->
      <div v-if="error" class="mt-6 text-center text-red-600 font-semibold">
        {{ error }}
      </div>

      <!-- Shipment Info -->
      <div v-if="shipment" class="mt-6 text-sm bg-gray-100 p-4 rounded shadow">
        <h3 class="text-lg font-bold text-primary mb-2">
          Shipment Details: "{{ shipment.trackingNo }}"
        </h3>

        <p><strong>Date Created:</strong> {{ formatDate(shipment.created_at) }}</p>

        <p>
          <strong>Delivery Address:</strong>
          <span v-if="shipment.deliveryMethod === 'pickup'">
            The Oga Importer Pickup Center, 12 Allen Avenue, Ikeja, Lagos.
          </span>
          <span v-else>
            {{ shipment.deliveryAddress || 'Not provided' }}
          </span>
        </p>

        <p><strong>State:</strong> {{ shipment.state }}</p>
        <p><strong>Country:</strong> {{ shipment.country }}</p>
        <p><strong>Expected Arrival:</strong> {{ predictArrival(shipment.created_at) }}</p>

        <div class="mt-4">
          <strong>Order Summary:</strong>
          <p class="bg-white border p-2 rounded text-gray-800 whitespace-pre-wrap max-h-32 overflow-auto">
            {{ summarizeOrder(shipment.orderList) }}
          </p>
          <div class="mt-2">
            <a
              v-if="shipment.invoiceUrl"
              :href="`http://localhost:5000/${shipment.invoiceUrl}`"
              class="text-sm text-primary font-semibold underline"
              target="_blank"
            >
              📎 View Uploaded Invoice
            </a>
            <p v-else class="text-xs text-gray-500 italic">Invoice not yet uploaded</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-6">
          <h4 class="text-md font-semibold mb-2 text-primary">Shipment Progress</h4>
          <div class="flex flex-col space-y-3">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center gap-3">
              <div
                :class="{
                  'bg-green-500': index <= currentStep,
                  'bg-gray-300': index > currentStep
                }"
                class="w-4 h-4 rounded-full"
              ></div>
              <span
                :class="{
                  'text-green-700 font-medium': index <= currentStep,
                  'text-gray-500': index > currentStep
                }"
              >
                {{ step }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipmentTracking',
  data() {
    return {
      trackingNo: '',
      shipment: null,
      error: '',
      steps: [
        'Order Received',
        'Awaiting Payment',
        'Processing',
        'Shipped',
        'In Transit',
        'Delivered'
      ],
      currentStep: 0
    };
  },
  methods: {
    async trackShipment() {
      this.error = '';
      this.shipment = null;
      this.currentStep = 0;

      try {
        const res = await fetch(`http://localhost:5000/api/orders/${this.trackingNo}`);
        if (!res.ok) throw new Error('Tracking number not found.');
        const data = await res.json();
        this.shipment = data;

        const statusToStep = {
          received: 0,
          awaiting_payment: 1,
          processing: 2,
          shipped: 3,
          in_transit: 4,
          delivered: 5
        };

        this.currentStep = statusToStep[data.status?.toLowerCase()] ?? 0;
      } catch (err) {
        this.error = err.message;
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-NG', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    predictArrival(dateStr) {
      const base = new Date(dateStr);
      const min = new Date(base);
      const max = new Date(base);
      min.setDate(min.getDate() + 14);
      max.setDate(max.getDate() + 17);
      return `${min.toLocaleDateString()} - ${max.toLocaleDateString()}`;
    },

    summarizeOrder(orderList) {
      if (!orderList) return '—';
      const lines = orderList.split('\n').filter(Boolean);
      return lines.slice(0, 3).join('\n') + (lines.length > 3 ? '\n...' : '');
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
