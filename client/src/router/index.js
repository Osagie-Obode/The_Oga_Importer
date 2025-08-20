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
import Login from '@/pages/auth/Login.vue';
import AdminDashboard from '@/pages/admin/AdminDashboard.vue';
import UserDashboard from '@/pages/dashboards/UserDashboard.vue';
import UserRequests from '@/pages/dashboards/UserRequests.vue';
import UserProfile from '@/pages/dashboards/UserProfile.vue';

import { requireAuth, requireAdmin } from './guards';

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
  { path: '/about', name: 'About', component: About },

  // Auth routes
  { path: '/login', name: 'Login', component: Login },

  // User dashboard and protected routes
  { path: '/dashboard', name: 'UserDashboard', component: UserDashboard, beforeEnter: requireAuth },
  { path: '/dashboard/requests', name: 'UserRequests', component: UserRequests, beforeEnter: requireAuth },
  { path: '/dashboard/profile', name: 'UserProfile', component: UserProfile, beforeEnter: requireAuth },

  // Admin dashboard (protected)
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('userRole') === 'admin';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/dashboard'); // fallback for unauthorized
  } else {
    next();
  }
});

export default router;
