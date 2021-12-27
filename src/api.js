import axios from "axios";
const api = axios.create({
  baseURL: "https://capstone.run.goorm.io/",
  // baseURL: "http://localhost:5000/",
  // baseURL: "https://resi-reco-backend.herokuapp.com/",
});

//api 모아두기
export const Api = {
  getResidence: (
    univ_name,
    univ_lon,
    univ_lat,
    Q2Answer,
    Q3Answer,
    Q4Answer,
    Q5Answer,
    w1,
    w2,
    w3,
    w4,
    w5
  ) =>
    api.post(`/recommendation`, {
      univ_name,
      univ_lon,
      univ_lat,
      Q2Answer,
      Q3Answer,
      Q4Answer,
      Q5Answer,
      w1,
      w2,
      w3,
      w4,
      w5,
    }),

  addDIYRecoHistory: (
    user_no,
    w_1st,
    w_2nd,
    w_3rd,
    w1,
    w2,
    w3,
    w4,
    w5,
    total_w,
    Q1,
    Q2,
    Q3,
    Q4,
    Q5,
    univ_lat,
    univ_lon,
    T_set,
    eval_01,
    eval_02,
    eval_03,
    eval_04,
    eval_05
  ) =>
    api.post(`/add_diy`, {
      user_no,
      w_1st,
      w_2nd,
      w_3rd,
      w1,
      w2,
      w3,
      w4,
      w5,
      total_w,
      Q1,
      Q2,
      Q3,
      Q4,
      Q5,
      univ_lat,
      univ_lon,
      T_set,
      eval_01,
      eval_02,
      eval_03,
      eval_04,
      eval_05,
    }),

  addEval: (
    evaluation_category_no,
    univ_name,
    T_set,
    rank01_score,
    rank02_score,
    rank03_score,
    rank04_score,
    rank05_score,
    user_no
  ) =>
    api.post(`/add_eval`, {
      evaluation_category_no,
      univ_name,
      T_set,
      rank01_score,
      rank02_score,
      rank03_score,
      rank04_score,
      rank05_score,
      user_no,
    }),

  Login: (user_id, user_pwd) => api.post(`/signin`, { user_id, user_pwd }),
  Signup: (user_id, user_pwd, user_email, authNum) =>
    api.post(`/signup`, { user_id, user_pwd, user_email, authNum }),
  SendEmail: (user_email, authNum) =>
    api.post(`/sendEmail`, { user_email, authNum }),
  Resend: (user_email, user_id, user_pwd, authNum) =>
    api.post(`/resend`, { user_email, user_id, user_pwd, authNum }),
  Validate: (authNum) => api.post(`/validate`, { authNum }),

  getDiyHistory: (user_id) => api.get(`/getDiyHistory/${user_id}`),
};
