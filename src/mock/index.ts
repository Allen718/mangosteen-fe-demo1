import { faker } from '@faker-js/faker';
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale('zh_CN');

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
  const { kind } = config.params;
  const pageSize = Number(config.params.pageSize);
  const pageNum = Number(config.params.pageNum);
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
  if (kind === 'expenses' && (pageNum === 1 || !pageNum)) {
    return [200, createBody(25)];
  } else if (kind === 'expenses' && pageNum === 2) {
    return [200, createBody(2)];
  } else if (kind === 'incomes' && (pageNum === 1 || !pageNum)) {
    return [200, createBody(25)];
  } else if (kind === 'expenses' && pageNum === 2) {
    return [200, createBody(2)];
  } else {
    return [200, createBody(20)];
  }
};
//创建记账
export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9900,
        note: null,
        tags_id: [3508],
        happen_at: '2020-10-29T16:00:00.000Z',
        created_at: '2022-07-03T15:35:56.301Z',
        updated_at: '2022-07-03T15:35:56.301Z',
        kind: 'expenses',
      },
    },
  ];
};
export const mockTagCreate: Mock = (config) => {
  return [
    200,
    {
      resources: {
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: config.params.kind,
      },
    },
  ];
};
export const mockTagUpdate: Mock = (config) => {
  return [
    200,
    {
      resources: {
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: config.params.kind,
      },
    },
  ];
};
