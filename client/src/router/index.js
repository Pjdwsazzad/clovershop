import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"
import AdminLoginView from "@/views/AdminLoginView"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/admin/login",
        name: "Log in",
        component: AdminLoginView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router