import { IApiAction } from "redux/actions/dispatchApi";
import { ErrorKeys } from "redux/actions/error.action";
import { LoadingKeys } from "redux/actions/loading.action";
import axios, { Method, AxiosResponse, AxiosRequestConfig } from "axios";
import { Middleware, AnyAction } from "redux";

export const CALL_API = "CALL_API";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const callApi = async <R>(
  endpoint: string,
  method: Method,
  authToken: string,
  body?: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
  let url = endpoint;
  return await axios.request({
    baseURL: API_BASE_URL,
    url,
    method,
    headers: { Authorization: authToken ? `Bearer ${authToken}` : "" },
    ...body,
  });
};

const apiMiddleware: Middleware =
  (store) =>
  (next) =>
  async <R>(action: AnyAction): Promise<R | null | { error: any }> => {
    if (!action[CALL_API]) {
      next(action);
      return null;
    }
    const { authToken } = store.getState().user || {};
    const [, reqSuccess] = action[CALL_API].types;

    // TODO: Loading when fetch data
    next({ type: LoadingKeys.SET_LOADING });

    // TODO: Fetch data
    const { endpoint, method, body } = (action as IApiAction)[CALL_API];
    try {
      const response = (await callApi(
        endpoint,
        method,
        authToken,
        body
      )) as AxiosResponse;
      next({
        type: reqSuccess,
        payload: response.data.data,
      });
      next({ type: LoadingKeys.REMOVE_LOADING });
      return response.data as R;
    } catch (error: any) {
      let messages = error.response.data.message;
      if (typeof messages === "string") {
        messages = [messages];
      }
      next({ type: LoadingKeys.REMOVE_LOADING });
      next({
        type: ErrorKeys.SET_ERROR,
        payload: {
          messages,
        },
      });
      return null;
    }
  };

export default apiMiddleware;
