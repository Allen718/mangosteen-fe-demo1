 import { AxiosResponse } from "axios";
import { request } from "./request"
 export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number;
  };
}>> | undefined

export const refreshMe = () => {
  mePromise = request.get<{ resource: { id: number } }>('/me')
  return mePromise
}

export const fetchMe = refreshMe