import { First } from "./pages/welcome/components/First";
import { FirstAction } from "./pages/welcome/components/FirstAction";
import { Forth } from "./pages/welcome/components/Forth";
import { Second } from "./pages/welcome/components/Second";
import { SecondAction } from "./pages/welcome/components/SecondAction";
import { Third } from "./pages/welcome/components/Third";
import { ThirdAction } from "./pages/welcome/components/ThirdAction";
import { ForthAction } from "./pages/welcome/components/ForthAction";
import { Welcome } from "./pages/welcome/Welcome";
import { StartPage } from "./pages/start/StartPage";
import { ItemList } from "./pages/item_list/ItemList";
import { ItemCreate } from "./pages/item_create/ItemCreate";
import { ItemPage } from "./pages/item_page/ItemPage";

import { TagPage } from "./pages/tag/tag_page/TagPage";
import { TagList } from "./pages/tag/tag_list/TagList";
import { TagEdit } from "./pages/tag/tag_edit/TagEdit";

export const routes = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        name: "welcome1",
        components: { main: First, footer: FirstAction },
      },
      {
        path: "2",
        name: "welcome2",
        components: { main: Second, footer: SecondAction },
      },
      {
        path: "3",
        name: "welcome3",
        components: { main: Third, footer: ThirdAction },
      },
      {
        path: "4",
        name: "welcome4",
        components: { main: Forth, footer: ForthAction },
      },
    ],
  },
  {
    path: "/start",
    component: StartPage,
  },
  {
    path: "/item",
    component:ItemPage,
    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tag",
    component:TagPage,
    children: [
      { path: "", component: TagList },
      { path: "edit", component: TagEdit },
    ],
  },
];
