import weight from "./data/QWeight";

const preCalculate = (Q3Answer, Q4Answer, Q5Answer) => {
  const default_Q3_weight = 0.5;
  const default_Q4_weight = 0.3;
  const default_Q5_weight = 0.2;
  let sum_w1 = 0,
    sum_w2 = 0,
    sum_w3 = 0,
    sum_w4 = 0,
    sum_w5 = 0;
  for (let i = 0; i < weight.length; i++) {
    if (weight[i].code === Q3Answer) {
      sum_w1 += default_Q3_weight * weight[i].w1;
      sum_w2 += default_Q3_weight * weight[i].w2;
      sum_w3 += default_Q3_weight * weight[i].w3;
      sum_w4 += default_Q3_weight * weight[i].w4;
      sum_w5 += default_Q3_weight * weight[i].w5;
    } else if (weight[i].code === Q4Answer) {
      sum_w1 += default_Q4_weight * weight[i].w1;
      sum_w2 += default_Q4_weight * weight[i].w2;
      sum_w3 += default_Q4_weight * weight[i].w3;
      sum_w4 += default_Q4_weight * weight[i].w4;
      sum_w5 += default_Q4_weight * weight[i].w5;
    } else if (weight[i].code === Q5Answer) {
      sum_w1 += default_Q5_weight * weight[i].w1;
      sum_w2 += default_Q5_weight * weight[i].w2;
      sum_w3 += default_Q5_weight * weight[i].w3;
      sum_w4 += default_Q5_weight * weight[i].w4;
      sum_w5 += default_Q5_weight * weight[i].w5;
    }
  }
  return { sum_w1, sum_w2, sum_w3, sum_w4, sum_w5 };
};
export default preCalculate;
