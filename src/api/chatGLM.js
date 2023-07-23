import request from "../utils/request";

export const getChatGLMRes = (text) => {
  return request({
    url: "/chatglm_answering",
    method: "get",
    params: {
      text,
    },
  });
};
