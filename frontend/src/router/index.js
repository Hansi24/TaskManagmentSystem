import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTaskView from '../views/CreateTaskView'
import EditTaskView from '../views/EditTaskView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTaskView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditTaskView,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
