import { createRouter , createWebHistory } from "vue-router";
import Catalog from "./components/Catalog.vue";
const routes = [
    {
        path: "/",
        component: Catalog,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;