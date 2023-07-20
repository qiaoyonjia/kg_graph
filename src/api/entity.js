import request from "../utils/request";

export const getEntityData = (text) => {
  return request({
    url: "/er_post",
    method: "get",
    params: {
      text,
    },
  });
};
