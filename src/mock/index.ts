import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};
let id = 0;
export const mockTagIndex: Mock = (config) => {
  console.log("TCL: mockTagIndex:Mock -> config", config)
  const { kind} = config.params;
  const pageSize=Number(config.params.pageSize)
  const pageNum=Number(config.params.pageNum)
  const createBody = (n = 1, attrs?: any) => {
    const resources = Array.from({ length: n }).map(() => ({
      id: (id += 1),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }));
    return {
      pager: {
        total: 27,
        pageSize,
        pageNum,
      },
      resources,
    };
  };
  if (kind === "expenses" && (pageNum === 1 || !pageNum)) {
    return [200, createBody(25)];
  } else if (kind === "expenses" && pageNum === 2) {
    return [200, createBody(2)];
  } else if (kind === "incomes" && (pageNum === 1 || !pageNum)) {
    return [200, createBody(25)];
  } else if (kind === "expenses" && pageNum === 2) {
    return [200, createBody(2)];
  } else {
    return [200, createBody(20)];
  }
};
