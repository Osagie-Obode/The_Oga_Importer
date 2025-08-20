<template>
  <div class="bg-white p-6 rounded shadow mb-6">
    <h2 class="text-lg font-bold mb-4">Order Status Overview</h2>
    <apexchart
      type="donut"
      width="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'AdminAnalytics',
  props: {
    orders: Array
  },
  computed: {
    statusCounts() {
      const count = {
        received: 0,
        awaiting_payment: 0,
        processing: 0,
        shipped: 0,
        in_transit: 0,
        delivered: 0
      };
      this.orders.forEach(o => {
        if (count[o.status]) count[o.status]++;
      });
      return Object.values(count);
    }
  },
  data() {
    return {
      chartOptions: {
        labels: ['Received', 'Awaiting Payment', 'Processing', 'Shipped', 'In Transit', 'Delivered'],
        colors: ['#6B46C1', '#ECC94B', '#63B3ED', '#48BB78', '#ED8936', '#38A169'],
        legend: {
          position: 'bottom'
        }
      }
    };
  },
  computed: {
    series() {
      return this.statusCounts;
    }
  }
};
</script>
