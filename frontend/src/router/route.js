import { createRouter, createWebHistory } from 'vue-router';
import BdcNewStock from "../components/BdcNewStock.vue";
import DashboardView from "../components/DashboardView.vue";
import AddStock from "../components/AddStock.vue";
import ReportsPage from "../components/ReportsPage.vue";
import RequestsPage from "../components/RequestsPage.vue";
import UserManagement from "../components/UserManagement.vue";
import PbwNewStock from "../components/PbwNewStock.vue";
import SodNewStock from "../components/SodNewStock.vue";
import CsaNewStock from '../components/CsaNewStock.vue';
import teacherRoutes from './teachers.js';
import AlertsView from '../components/AlertsView.vue';
import StockManagement from '../components/StockManagement.vue';
import AllStock from '../components/AllStock.vue';
import ProfilePage from '../components/ProfilePage.vue';
import AdminLogin from '../components/AdminLogin.vue';

const routes = [
  { path: '/bdcnewstock', component: BdcNewStock },
  { path: '/dashboard', component: DashboardView },
  { path: '/addstock', component: AddStock },
  { path: '/requests', component: RequestsPage },
  { path: '/reports', component: ReportsPage },
  { path: '/usermanagement', component: UserManagement },
  { path: '/pbwnewstock', component: PbwNewStock },
  { path: '/sodnewstock', component: SodNewStock },
  { path: '/csanewstock', component: CsaNewStock },
  { path: '/alerts', component: AlertsView },
  { path: '/stockmanagement', component: StockManagement },
  { path: '/allstock', component: AllStock },
  { path: '/profile', component: ProfilePage },
  { path: '/', component: AdminLogin },
  ...teacherRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;