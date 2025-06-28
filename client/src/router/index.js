import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import UserForm from '@/pages/UserForm.vue';
import OrderForm from '@/pages/OrderForm.vue';
import ServiceList from '@/pages/ServiceList.vue';
import ContactUs from '@/pages/ContactUs.vue';
import CBMCalculator from '@/pages/tools/CBMCalculator.vue';
import LandingCostCalculator from '@/pages/tools/LandingCostCalculator.vue';
import ShipmentTracking from '@/pages/tools/ShipmentTracking.vue';
import Jobs from '@/pages/Jobs.vue';
import Terms from '@/pages/Terms.vue';
import Privacy from '@/pages/Privacy.vue';
import About from '@/pages/About.vue';
import AdminDashboard from '@/pages/admin/AdminDashboard.vue';



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'UserForm', component: UserForm },
  { path: '/order', name: 'OrderForm', component: OrderForm },
  { path: '/services', name: 'ServiceList', component: ServiceList },
  { path: '/contact', name: 'ContactUs', component: ContactUs },
  { path: '/tools/cbm-calculator', name: 'CBMCalculator', component: CBMCalculator },
  { path: '/tools/landing-cost', name: 'LandingCostCalculator', component: LandingCostCalculator },
  { path: '/track', name: 'ShipmentTracking', component: ShipmentTracking },
  { path: '/jobs', name: 'Jobs', component: Jobs },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  { path: '/about', name: 'about', component: About },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
