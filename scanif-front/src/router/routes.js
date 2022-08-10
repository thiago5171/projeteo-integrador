const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/relatorios",
        component: () => import("src/pages/Reports.vue"),
      },
      {
        path: "/inventario",
        component: () => import("src/pages/Inventory.vue"),
      },
      {
        path: "/items-SIPAC",
        component: () => import("src/pages/ItemsToReport.vue"),
      },
      {
        path: "/gerenciamento/items",
        component: () => import("src/pages/ManagerItem.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
