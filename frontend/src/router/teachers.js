import LoginView from '@/components/TeacherSide/LoginView.vue';
import TeacherDashboard from '@/components/TeacherSide/TeacherDashboard.vue';
import TeacherProfile from '@/components/TeacherSide/TeacherProfile.vue'; // Example additional route

const teacherRoutes = [
  { path: '/teacherlogin', component: LoginView },
  { path: '/teacherdashboard', component: TeacherDashboard },
  { path: '/teacherprofile', component: TeacherProfile }, // Example additional route
];

export default teacherRoutes;