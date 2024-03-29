import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  mockItemCreate,
  mockItemIndex,
  mockSession,
  mockTagCreate,
  mockTagIndex,
  mockTagUpdate,
} from '../mock/index';
type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };
type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>;
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>;
type UpdateConfig = Omit<AxiosRequestConfig, 'url' | 'data'>;
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>;

class Request {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  //read
  get<R = unknown>(
    url: string,
    query?: Record<string, JSONValue>,
    config?: GetConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get',
    });
  }
  // create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PostConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' });
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: UpdateConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' });
  }
  // destroy
  delete<R = unknown>(
    url: string,
    query?: Record<string, JSONValue>,
    config?: DeleteConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'delete',
    });
  }
}
//关于mock 数据
const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== 'localhost' &&
    location.hostname !== '127.0.0.1' &&
    location.hostname !== '192.168.3.57'
  ) {
    return false;
  }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case 'itemIndex':
      [response.status, response.data] = mockItemIndex(response.config);
      return true;
    case 'tagCreate':
      [response.status, response.data] = mockTagCreate(response.config);
    case 'tagUpdate':
      [response.status, response.data] = mockTagUpdate(response.config);
    case 'session':
      [response.status, response.data] = mockSession(response.config);
      return true;
  }
  return false;
};

export const request = new Request('/api/v1/');

//请求拦截器

request.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

//响应拦截器
request.instance.interceptors.response.use(
  (response) => {
    mock(response);
    return response;
  },
  (error) => {
    if (mock(error.response)) {
      return error.response;
    } else {
      throw error;
    }
  }
);
request.instance.interceptors.response.use(
  (response) => {
    console.log('response');
    return response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert('你太频繁了');
      }
    }
    throw error;
  }
);
