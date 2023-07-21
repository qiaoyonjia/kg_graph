import request from "../utils/request";

export const getQuestionResult = (text) => {
  return request({
    url: "/question_answering",
    method: "get",
    params: {
      text,
    },
  });
};
