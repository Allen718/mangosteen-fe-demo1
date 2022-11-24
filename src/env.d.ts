/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
type Tag = {
  id: number;
  name: string;
  user_id: number;
  sign: string;
  catogary: "expenses" | "income";
};
type Resources<T = any> = {
  resources: T[];
  pager: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
};
