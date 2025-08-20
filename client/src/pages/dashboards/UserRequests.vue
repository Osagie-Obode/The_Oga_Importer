<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <h2 class="text-2xl font-bold text-primary mb-6">My Service Requests</h2>

    <div v-if="requests.length" class="space-y-4">
      <div
        v-for="(req, idx) in requests"
        :key="idx"
        class="bg-white p-4 rounded shadow"
      >
        <p><strong>Tracking No:</strong> {{ req.trackingNo }}</p>
        <p><strong>Service:</strong> {{ req.serviceType }}</p>
        <p><strong>Status:</strong> {{ req.status }}</p>
        <p><strong>Date:</strong> {{ req.created_at ? formatDate(req.created_at) : 'N/A' }}</p>
      </div>
    </div>

    <p v-else class="text-gray-500">No requests found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requests: []
    };
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/api/orders/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.requests = data;
      })
      .catch(() => alert('Failed to load your requests.'));
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>
