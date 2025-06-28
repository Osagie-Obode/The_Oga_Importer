<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6 text-primary">Admin: Order Management</h1>

    <!-- ▸ SEARCH • FILTERS • EXPORT  ------------------------------------- -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name, email, or tracking number"
        class="input w-full md:w-1/3"
      />
      <div class="flex gap-4">
        <select v-model="filterStatus" class="input">
          <option value="">All Statuses</option>
          <option value="received">Received</option>
          <option value="awaiting_payment">Awaiting Payment</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
        <select v-model="filterDelivery" class="input">
          <option value="">All Delivery Methods</option>
          <option value="pickup">Pick‑Up</option>
          <option value="delivery">Home Delivery</option>
        </select>
        <button
          @click="exportToExcel"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          Export to Excel
        </button>
      </div>
    </div>

    <!-- ▸ TABLE ----------------------------------------------------------- -->
    <div class="bg-white shadow rounded p-4 overflow-x-auto">
      <table class="w-full text-sm text-left border-collapse">
        <thead>
          <tr class="bg-primary text-white">
            <th class="p-2">Tracking No</th>
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
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="p-2 font-semibold text-primary">{{ order.trackingNo }}</td>
            <td class="p-2">{{ order.name }}</td>
            <td class="p-2">{{ order.email }}</td>
            <td class="p-2">{{ order.phone }}</td>
            <td class="p-2">{{ order.state }}</td>
            <td class="p-2">{{ order.country }}</td>
            <td class="p-2 capitalize">{{ order.status }}</td>
            <td class="p-2 capitalize">{{ order.deliveryMethod || 'N/A' }}</td>
            <td class="p-2">
              <button
                class="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 text-xs font-semibold"
                @click="selectOrder(order)"
              >
                View
              </button>
            </td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="9" class="p-4 text-center text-gray-500">No orders found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ▸ MODAL ----------------------------------------------------------- -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white w-full max-w-2xl h-[80vh] overflow-y-auto p-6 rounded shadow relative"
      >
        <div class="absolute top-2 right-2 flex gap-2 items-center">
          <button
            @click="refreshSelectedOrder"
            title="Refresh"
            class="text-primary border px-2 py-1 rounded hover:bg-gray-100 text-xs font-semibold"
          >
            🔄
          </button>
          <button
            class="text-gray-500 hover:text-black text-lg"
            @click="selectedOrder = null"
          >
            ✖
          </button>
        </div>

        <h2 class="text-xl font-bold mb-4 text-primary">
          Order: {{ selectedOrder.trackingNo }}
        </h2>

        <p><strong>Name:</strong> {{ selectedOrder.name }}</p>
        <p><strong>Email:</strong> {{ selectedOrder.email }}</p>
        <p><strong>Phone:</strong> {{ selectedOrder.phone }}</p>
        <p><strong>State:</strong> {{ selectedOrder.state }}</p>
        <p><strong>Country:</strong> {{ selectedOrder.country }}</p>
        <p><strong>Delivery Method:</strong> {{ selectedOrder.deliveryMethod }}</p>
        <p><strong>Delivery Address:</strong> {{ selectedOrder.deliveryAddress }}</p>

        <p class="mt-4"><strong>Order List:</strong></p>
        <pre
          class="bg-gray-100 p-2 rounded text-sm text-gray-800 whitespace-pre-wrap"
        >{{ selectedOrder.orderList }}</pre>

        <!-- ▸ INVOICE ---------------------------------------------------- -->
        <div class="mt-6">
          <label class="block font-semibold mb-1">Invoice (PDF / Image)</label>
          <div class="flex items-center gap-2">
            <input type="file" @change="handleFile" />
            <button
              :disabled="!invoiceFile"
              class="bg-primary text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              @click="uploadInvoice"
            >
              Upload
            </button>
            <a
              v-if="selectedOrder.invoiceUrl"
              :href="`http://localhost:5000/${selectedOrder.invoiceUrl}`"
              target="_blank"
              class="text-primary underline text-sm"
            >
              View current invoice
            </a>
          </div>
        </div>

        <!-- ▸ UPDATE STATUS --------------------------------------------- -->
        <div class="mt-6">
          <label class="block font-semibold mb-1">Update Status</label>
          <select v-model="updatedStatus" class="input">
            <option disabled value="">Select…</option>
            <option value="received">Received</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>

          <button
            class="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
            @click="updateOrderStatus"
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      orders: [],
      selectedOrder: null,
      updatedStatus: '',
      invoiceFile: null,
      searchQuery: '',
      filterStatus: '',
      filterDelivery: ''
    };
  },
  computed: {
    filteredOrders() {
      const q = this.searchQuery.toLowerCase();
      return this.orders
        .filter(o =>
          [o.name, o.email, o.trackingNo].some(s =>
            s.toLowerCase().includes(q)
          )
        )
        .filter(o => (!this.filterStatus || o.status === this.filterStatus))
        .filter(o => (!this.filterDelivery || o.deliveryMethod === this.filterDelivery));
    }
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        this.orders = await res.json();
      } catch (err) {
        console.error('❌ Error loading orders:', err);
      }
    },
    selectOrder(order) {
      this.selectedOrder = order;
      this.updatedStatus = order.status;
    },
    async refreshSelectedOrder() {
      if (!this.selectedOrder) return;
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}`);
        const updated = await res.json();
        this.selectedOrder = updated;
        this.updatedStatus = updated.status;
        console.log('🔄 Order refreshed:', updated);
      } catch (err) {
        alert('❌ Failed to refresh order');
      }
    },
    async uploadInvoice() {
      const fd = new FormData();
      fd.append('invoice', this.invoiceFile);
      await fetch(
        `http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}/invoice`,
        { method: 'POST', body: fd }
      );
      alert('✅ Invoice uploaded');
      this.invoiceFile = null;
      this.refreshSelectedOrder(); // Refresh immediately after upload
    },
    async updateOrderStatus() {
      if (
        this.updatedStatus === 'awaiting_payment' &&
        !this.selectedOrder.invoiceUrl
      ) {
        return alert('Upload invoice first.');
      }
      await fetch(
        `http://localhost:5000/api/orders/${this.selectedOrder.trackingNo}/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: this.updatedStatus
          })
        }
      );
      alert('✅ Status saved');
      this.selectedOrder = null;
      this.fetchOrders();
    },
    handleFile(e) {
      this.invoiceFile = e.target.files[0];
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
        Delivery: o.deliveryMethod,
        OrderList: o.orderList
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buf]), 'The Oga Importer_orders.xlsx');
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 6px;
  padding-bottom: 6px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
</style>
