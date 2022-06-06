import { API_KEY, API_URL } from "./constants";

interface Options {
  method?: "GET" | "POST";
  query?: string;
  body?: {
    [key: string]: string | boolean;
  };
}

export const request = async (apiName: string, option: Options = {}) => {
  try {
    const request = await fetch(
      `${API_URL}/${apiName}${option.query ? `?${option.query}` : ""}`,
      {
        method: option.method || "GET",
        headers: {
          "x-api-key": API_KEY,
        },
        body: option.body && JSON.stringify(option.body),
      }
    );

    return request;
  } catch {
    throw new Error("The request was unsuccessful");
  }
};
