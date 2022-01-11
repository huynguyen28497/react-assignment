import { Action } from "redux";
import { Method, AxiosRequestConfig } from "axios";
import { CALL_API } from "redux/middleware/api";

interface ICallApiInfo {
  types: string[];
  endpoint: string;
  method: Method;
  body: AxiosRequestConfig;
  stop?: boolean;
}

export interface IApiAction extends Action {
  [CALL_API]: ICallApiInfo;
}

const authToken = localStorage.getItem('authToken') ?? '';

export default <T>(
  dispatch: any,
  { types, endpoint, method, body, stop }: ICallApiInfo
) =>
  dispatch({
    type: "",
    [CALL_API]: {
      types,
      endpoint,
      method,
      body,
      stop,
      authToken
    },
  }) as Promise<T>;
