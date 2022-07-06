import { Foo } from "./pages/Foo";
import { Home } from "./pages/Home";
import { First } from "./pages/welcome/components/First";
import { FirstAction } from "./pages/welcome/components/FirstAction";
import { Forth } from "./pages/welcome/components/Forth";
import { Second } from "./pages/welcome/components/Second";
import { SecondAction } from "./pages/welcome/components/SecondAction";
import { Third } from "./pages/welcome/components/Third";
import { ThirdAction } from "./pages/welcome/components/ThirdAction";
import { ForthAction } from "./pages/welcome/components/ForthAction";
import { Welcome } from "./pages/welcome/Welcome";

export const routes = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      { path: "1",  components: { main: First, footer: FirstAction }, },
      { path: "2", components: {main:Second,footer:SecondAction}},
      { path: "3", components: {main:Third,footer:ThirdAction}},
      { path: "4", components: {main:Forth,footer:ForthAction} },
    ],
  },
];
