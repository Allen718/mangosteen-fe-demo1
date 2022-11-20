import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { App } from "./App";
import '@svgstore';
import { routes } from "./routes";
// import { mePromise } from "./utils/me";
 
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// router.beforeEach(async (to, from) => {
//   if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')
//     || to.path === '/start') {
//     return true
//   } else {
//     const path = await mePromise!.then(
//       () => true,
//       () => {
//         return '/sign_in?return_to=' + to.path
//       }
//     )
//     return path
//   }
// })

const app = createApp(App);
app.use(router);
app.mount("#app");
