import request from "../utils/request";

export const test = () => {
  return request({
    url: "/test",
    method: "get",
  });
};
