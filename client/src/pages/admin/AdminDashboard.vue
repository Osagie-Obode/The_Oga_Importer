<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6 text-primary">Admin: Order Management</h1>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <input v-model="searchQuery" type="text" placeholder="Search by name, email, or tracking number" class="input w-full md:w-1/3" />
      <div class="flex gap-4 flex-wrap">
        <select v-model="filterStatus" class="input">
          <option value="">Status</option>
          <option v-for="s in statuses" :key="s">{{ s }}</option>
        </select>
        <select v-model="filterDelivery" class="input">
          <option value="">Delivery Method</option>
          <option value="pickup">Pick‑Up</option>
          <option value="delivery">Delivery</option>
        </select>
        <select v-model="filterService" class="input">
          <option value="">Services</option>
          <option value="procurement">Procurement</option>
          <option value="sourcing">Sourcing</option>
        </select>
        <button @click="exportToExcel" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">Export to Excel</button>
      </div>
    </div>

    <!-- Order Table -->
    <div class="bg-white shadow rounded p-4 overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse">
        <thead>
          <tr class="bg-primary text-white">
            <th class="p-2">Tracking No</th>
            <th class="p-2">Customer</th>
            <th class="p-2">Email</th>
            <th class="p-2">Phone</th>
            <th class="p-2">State</th>
            <th class="p-2">Country</th>
            <th class="p-2">Status</th>
            <th class="p-2">Delivery</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order.id" class="border-b hover:bg-gray-50">
            <td class="p-2 font-semibold text-primary">{{ order.trackingNo }}</td>
            <td class="p-2">{{ order.name }}</td>
            <td class="p-2">{{ order.email }}</td>
            <td class="p-2">{{ order.phone }}</td>
            <td class="p-2">{{ order.state }}</td>
            <td class="p-2">{{ order.country }}</td>
            <td class="p-2 capitalize">{{ order.status }}</td>
            <td class="p-2 capitalize">{{ order.deliveryMethod }}</td>
            <td class="p-2">
              <button @click="selectOrder(order)" class="bg-yellow-400 px-3 py-1 rounded text-xs">View</button>
            </td>
          </tr>
          <tr v-if="paginatedOrders.length === 0">
            <td colspan="9" class="p-4 text-center text-gray-500">No orders found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div>
          <label class="text-sm">Results per page:</label>
          <select v-model="pageSize" class="input text-sm w-24 ml-2">
            <option v-for="s in [5, 10, 20, 50]" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border rounded">◀</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded">▶</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-2xl h-[80vh] overflow-y-auto p-6 rounded shadow relative">
        <div class="absolute top-2 right-2 flex gap-2">
          <button @click="refreshSelectedOrder" class="text-primary border px-2 py-1 rounded">🔄</button>
          <button @click="selectedOrder = null" class="text-lg text-gray-600 hover:text-black">✖</button>
        </div>

        <h2 class="text-xl font-bold mb-4 text-primary">Order: {{ selectedOrder.trackingNo }}</h2>
        <p><strong>Name:</strong> {{ selectedOrder.name }}</p>
        <p><strong>Email:</strong> {{ selectedOrder.email }}</p>
        <p><strong>Phone:</strong> {{ selectedOrder.phone }}</p>
        <p><strong>State:</strong> {{ selectedOrder.state }}</p>
        <p><strong>Delivery Method:</strong> {{ selectedOrder.deliveryMethod }}</p>
        <p><strong>Address:</strong> {{ selectedOrder.deliveryAddress }}</p>
        <p class="mt-3"><strong>Order List:</strong></p>
        <pre class="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">{{ selectedOrder.orderList }}</pre>

        <!-- Invoice Upload -->
        <div class="mt-4">
          <label class="font-semibold">Upload Invoice</label>
          <input type="file" @change="handleFile" />
          <button @click="uploadInvoice" :disabled="!invoiceFile" class="bg-primary text-white px-3 py-1 rounded text-sm mt-2">Upload</button>
          <div v-if="selectedOrder.invoiceUrl">
            <a :href="`http://localhost:5000/${selectedOrder.invoiceUrl}`" target="_blank" class="text-primary underline text-sm">View Invoice</a>
          </div>
        </div>

        <!-- Status Update -->
        <div class="mt-4">
          <label class="block mb-1">Update Status</label>
          <select v-model="updatedStatus" class="input">
            <option disabled value="">Select...</option>
            <option v-for="s in statuses" :key="s">{{ s }}</option>
          </select>
          <button @click="updateOrderStatus" class="mt-2 bg-primary text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="mt-10 space-y-10 bg-white p-6 rounded shadow">
      <div class="flex flex-col md:flex-row gap-8 justify-center items-start">
        <apexchart type="pie" height="300" :options="statusOptions" :series="statusSeries" class="flex-1" />
        <apexchart type="pie" height="300" :options="deliveryOptions" :series="deliverySeries" class="flex-1" />
      </div>
      <apexchart type="bar" height="320" :options="stateOptions" :series="stateSeries" />
      <apexchart type="bar" height="320" :options="productOptions" :series="productSeries" />
      <apexchart type="line" height="320" :options="timeOptions" :series="timeSeries" />
      <apexchart type="bar" height="320" :options="serviceStatusOptions" :series="serviceStatusSeries" />
      <apexchart type="bar" height="320" :options="statusDeliveryOptions" :series="statusDeliverySeries" />
    </div>

    <!-- Activity Logs Section -->
     <div class="mt-10 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold mb-4 text-primary">🕵️ Activity Logs</h2>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="p-2">Date</th>
            <th class="p-2">Tracking No</th>
            <th class="p-2">Action</th>
            <th class="p-2">Performed By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in paginatedLogs" :key="log.id" class="border-b">
            <td class="p-2">{{ formatDate(log.timestamp) }}</td>
            <td class="p-2">{{ log.trackingNo }}</td>
            <td class="p-2 font-semibold">{{ log.action }}</td>
            <td class="p-2">{{ log.performedBy }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination for logs -->
       <div class="flex justify-between items-center mt-4">
        <div>
          <label class="text-sm">Logs per page:</label>
          <select v-model="logPageSize" class="input text-sm w-24 ml-2">
            <option v-for="s in [5, 10, 20]" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button @click="logCurrentPage--" :disabled="logCurrentPage === 1" class="px-3 py-1 border rounded">◀</button>
          <span>Page {{ logCurrentPage }} of {{ logTotalPages }}</span>
          <button @click="logCurrentPage++" :disabled="logCurrentPage === logTotalPages" class="px-3 py-1 border rounded">▶</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  components: { apexchart: VueApexCharts },
  data() {
    return {
      orders: [],
      logs: [],
      selectedOrder: null,
      updatedStatus: '',
      invoiceFile: null,
      searchQuery: '',
      filterStatus: '',
      filterDelivery: '',
      filterService: '',
      currentPage: 1,
      pageSize: 10,
      logPageSize: 10,
      logCurrentPage: 1,
      statuses: ['received', 'awaiting_payment', 'processing', 'shipped', 'in_transit', 'delivered'],
      statusSeries: [],
      deliverySeries: [],
      stateSeries: [],
      productSeries: [],
      timeSeries: [],
      serviceStatusSeries: [],
      statusDeliverySeries: [],
      statusOptions: {},
      deliveryOptions: {},
      stateOptions: {},
      productOptions: {},
      timeOptions: {},
      serviceStatusOptions: {},
      statusDeliveryOptions: {}
    };
  },
  computed: {
    filteredOrders() {
      const q = this.searchQuery.toLowerCase();
      return this.orders
        .filter(o =>
          [o.name, o.email, o.trackingNo]
            .some(val => (val || '').toLowerCase().includes(q))
        )
        .filter(o => !this.filterStatus || o.status === this.filterStatus)
        .filter(o => !this.filterDelivery || o.deliveryMethod === this.filterDelivery)
        .filter(o => !this.filterService || o.serviceType === this.filterService);
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredOrders.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
    paginatedLogs() {
      const start = (this.logCurrentPage - 1) * this.logPageSize;
      return this.logs.slice(start, start + this.logPageSize);
    },
    logTotalPages() {
      return Math.ceil(this.logs.length / this.logPageSize);
    }
  },
  mounted() {
    this.fetchOrders();
    this.fetchLogs();
  },
  methods: {
    async fetchOrders() {
      const res = await fetch('http://localhost:5000/api/orders');
      this.orders = await res.json();
      this.prepareCharts();
    },
    async fetchLogs() {
      const res = await fetch('http://localhost:5000/api/orders/logs');
      this.logs = await res.json();
    },
    selectOrder(order) {
      this.selectedOrder = order;
      this.updatedStatus = order.status;
    },
    handleFile(e) {
      this.invoiceFile = e.target.files[0];
    },
    async uploadInvoice() {
      const fd = new FormData();
      fd.append('invoice', this.invoiceFile);
      await fetch(`http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}/invoice`, {
        method: 'POST',
        body: fd
      });
      alert('✅ Invoice uploaded');
      this.refreshSelectedOrder();
    },
    async refreshSelectedOrder() {
      const res = await fetch(`http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}`);
      const updated = await res.json();
      this.selectedOrder = updated;
      this.updatedStatus = updated.status;
    },
    async updateOrderStatus() {
      if (
        this.updatedStatus === 'awaiting_payment' &&
        !this.selectedOrder.invoiceUrl
      ) {
        return alert('⚠️ Upload invoice first.');
      }
      await fetch(`http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: this.updatedStatus })
      });
      alert('✅ Status updated');
      this.selectedOrder = null;
      this.fetchOrders();
    },
    exportToExcel() {
      const rows = this.filteredOrders.map(o => ({
        TrackingNo: o.trackingNo,
        Name: o.name,
        Email: o.email,
        Phone: o.phone,
        State: o.state,
        Country: o.country,
        Status: o.status,
        Service: o.serviceType,
        Delivery: o.deliveryMethod
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buf]), 'OgaImporter_Orders.xlsx');
    },
    prepareCharts() {
      const count = (key, val) => this.orders.filter(o => o[key] === val).length;
      this.statusSeries = this.statuses.map(s => count('status', s));
      this.statusOptions = { labels: this.statuses, title: { text: 'Order Status Distribution' } };

      this.deliverySeries = ['pickup', 'delivery'].map(m => count('deliveryMethod', m));
      this.deliveryOptions = { labels: ['Pick‑Up', 'Delivery'], title: { text: 'Delivery Method Preferences' } };

      const stateMap = {};
      this.orders.forEach(o => {
        stateMap[o.state] = (stateMap[o.state] || 0) + 1;
      });
      const sortedStates = Object.entries(stateMap).sort((a, b) => b[1] - a[1]);
      const stateNames = sortedStates.map(([s]) => s);
      const stateCounts = sortedStates.map(([_, c]) => c);
      this.stateSeries = [{ name: 'Orders', data: stateCounts }];
      this.stateOptions = { xaxis: { categories: stateNames }, title: { text: 'Orders by State' } };

      const productCount = {};
      this.orders.forEach(o => {
        o.orderList.split('\n').forEach(line => {
          const item = line.trim().toLowerCase().split(' ')[0];
          if (item) productCount[item] = (productCount[item] || 0) + 1;
        });
      });
      const topProducts = Object.entries(productCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
      this.productSeries = [{ name: 'Top Products', data: topProducts.map(p => p[1]) }];
      this.productOptions = { xaxis: { categories: topProducts.map(p => p[0]) }, title: { text: 'Top Ordered Products' } };

      const last60 = [...Array(60)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (59 - i));
        return d.toISOString().split('T')[0];
      });
      this.timeSeries = [{
        name: 'Orders',
        data: last60.map(date => this.orders.filter(o => o.created_at?.startsWith(date)).length)
      }];
      this.timeOptions = { xaxis: { categories: last60 }, title: { text: 'Orders Over Last 60 Days' } };

      this.serviceStatusSeries = ['procurement', 'sourcing'].map(service => ({
        name: service,
        data: this.statuses.map(s => this.orders.filter(o => o.serviceType === service && o.status === s).length)
      }));
      this.serviceStatusOptions = {
        xaxis: { categories: this.statuses },
        title: { text: 'Status vs Service Type' },
        chart: { stacked: false }
      };

      this.statusDeliverySeries = ['pickup', 'delivery'].map(method => ({
        name: method,
        data: this.statuses.map(s => this.orders.filter(o => o.deliveryMethod === method && o.status === s).length)
      }));
      this.statusDeliveryOptions = {
        xaxis: { categories: this.statuses },
        title: { text: 'Status vs Delivery Method' },
        chart: { stacked: false }
      };
    },
    formatDate(timestamp) {
      if (!timestamp || isNaN(Date.parse(timestamp))) return '—';
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
</style>
