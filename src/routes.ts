import { Foo } from "./pages/Foo";
import { Home } from "./pages/Home";
import { First } from "./pages/welcome/components/First";
import { Forth } from "./pages/welcome/components/Forth";
import { Second } from "./pages/welcome/components/Second";
import { Third } from "./pages/welcome/components/Third";
import { Welcome } from "./pages/welcome/Welcome";

export const routes = [
  { path: "/", component: Home},
  { path: "/welcome", component: Welcome,children:[
    { path:'first',component:First},
    { path:'second',component:Second},
    { path:'third',component:Third},
    { path:'forth',component:Forth},
  ] },
];
