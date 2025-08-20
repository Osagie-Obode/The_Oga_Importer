<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-primary">
        Welcome, {{ userName || 'Oga' }}
      </h1>
      <button
        class="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        @click="logout"
      >
        Logout
      </button>
    </div>

    <!-- CTA & Agent Contact -->
    <div class="mb-8 flex flex-col md:flex-row justify-between gap-6 items-center">
      <router-link
        to="/order"
        class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 text-sm"
      >
        + Submit New Order
      </router-link>

      <div class="flex items-center gap-4 text-sm">
        <span>Need Help?</span>
        <router-link to="/contact" class="text-blue-600 underline">Talk to an Agent</router-link>
        <a href="https://wa.me/2348012345678" target="_blank" class="text-green-600 underline">WhatsApp</a>
        <a href="https://t.me/yourTelegramUsername" target="_blank" class="text-blue-400 underline">Telegram</a>
      </div>
    </div>

    <!-- Active Orders -->
    <div v-if="orders.length" class="bg-white p-6 rounded shadow mb-8">
      <h2 class="text-lg font-bold mb-4 text-primary">📦 Your Active Orders</h2>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 text-left">Tracking No</th>
            <th class="p-2 text-left">Status</th>
            <th class="p-2 text-left">Service</th>
            <th class="p-2 text-left">Delivery</th>
            <th class="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b">
            <td class="p-2 font-semibold text-primary">{{ order.trackingNo }}</td>
            <td class="p-2 capitalize">{{ order.status }}</td>
            <td class="p-2 capitalize">{{ order.serviceType }}</td>
            <td class="p-2 capitalize">{{ order.deliveryMethod || 'N/A' }}</td>
            <td class="p-2">{{ formatDate(order.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mini Chart -->
    <div v-if="chartData.length" class="bg-white p-6 rounded shadow mb-10">
      <h2 class="text-lg font-bold mb-4 text-primary">📊 Services Requested</h2>
      <apexchart type="pie" height="300" :options="chartOptions" :series="chartData" />
    </div>

    <!-- No Orders -->
    <div v-else class="text-center text-gray-600 italic mb-10">
      You don’t have any orders yet.
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardCard icon="📦" title="Track My Shipments" to="/track" />
      <DashboardCard icon="📁" title="My Service Requests" to="/dashboard/requests" />
      <DashboardCard icon="🎓" title="Import Academy" to="/academy" />
      <DashboardCard icon="⚙️" title="Profile & Settings" to="/dashboard/profile" />
      <DashboardCard icon="📞" title="Contact Us" to="/contact" />
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import VueApexCharts from 'vue3-apexcharts';
import { useRouter } from 'vue-router';

export default {
  name: 'UserDashboard',
  components: {
    DashboardCard,
    apexchart: VueApexCharts
  },
  data() {
    return {
      orders: [],
      userName: localStorage.getItem('userName') || '',
      userEmail: localStorage.getItem('userEmail') || '',
      chartData: [],
      chartOptions: {}
    };
  },
  async mounted() {
    if (!this.userEmail) {
      alert('Session expired. Please log in again.');
      this.logout();
      return;
    }

    await this.fetchOrders();
    this.prepareChart();
  },
  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.clear();
      router.push('/login');
    };
    return { logout };
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/user/${this.userEmail}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        this.orders = await res.json();
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
      }
    },
    prepareChart() {
      const serviceCount = {};
      this.orders.forEach(o => {
        const service = o.serviceType || 'unknown';
        serviceCount[service] = (serviceCount[service] || 0) + 1;
      });

      this.chartData = Object.values(serviceCount);
      this.chartOptions = {
        labels: Object.keys(serviceCount),
        title: { text: 'Your Service Requests Breakdown' }
      };
    },
    formatDate(dateStr) {
      if (!dateStr) return '—';
      const d = new Date(dateStr);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.input {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
</style>
