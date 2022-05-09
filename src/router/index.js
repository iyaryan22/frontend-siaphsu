import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import("../views/presensi/Presensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/Presensi',
        name: 'presensi.presensi',
        component: () => import("../views/presensi/Presensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/LihatPresensi',
        name: 'presensi.lihatpresensi',
        component: () => import("../views/presensi/LihatPresensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/CreatePresensi',
        name: 'presensi.createpresensi',
        component: () => import("../views/presensi/CreatePresensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/EditPresensi/:id', //disini error route hilangkan /
        name: 'presensi.editpresensi',
        component: () => import("../views/presensi/EditPresensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/DeletePresensi/:id', //disini error route hilangkan /
        name: 'presensi.deletepresensi',
        component: () => import("../views/presensi/DeletePresensi.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/AkunAdmin',
        name: 'pengaturan.akunadmin',
        component: () => import("../views/pengaturan/AkunAdmin.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/CreateAkunAdmin',
        name: 'pengaturan.createakunadmin',
        component: () => import("../views/pengaturan/CreateAkunAdmin.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/EditAkunAdmin/:id', //disini error route hilangkan /
        name: 'pengaturan.editakunadmin',
        component: () => import("../views/pengaturan/EditAkunAdmin.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/DeleteAkunAdmin/:id', //disini error route hilangkan /
        name: 'pengaturan.deleteakunadmin',
        component: () => import("../views/pengaturan/DeleteAkunAdmin.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/JamKerja',
        name: 'pengaturan.jamkerja',
        component: () => import("../views/pengaturan/JamKerja.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/TitikKoordinat',
        name: 'pengaturan.titikkoordinat',
        component: () => import("../views/pengaturan/TitikKoordinat.vue"),
        meta: { requiresAuth :true}
    },
    {
        path: '/Login',
        name: 'login.loginweb',
        component: () => import("../views/login/LoginWeb.vue"),
        meta: { guest :true}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {  
    const token = localStorage.getItem('jwt') == null;  
    if (to.matched.some(record => record.meta.guest)) {
      if (!token) next({ name: 'presensi.presensi' })
      else next()
    }
    if (to.matched.some(record => record.meta.requiresAuth)) { 
      if (token) {
        next({
            name:'login.loginweb',
            query: { redirect: to.fullPath }
        })
      } else {
        next()
      } 
   }
  })

export default router;