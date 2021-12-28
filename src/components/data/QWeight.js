import { COST, DISTANCE, HOUSE, SAFETY, SUBWAY } from "../Enum";

const weight = [
  { code: DISTANCE, w1: 50, w2: 10, w3: 5, w4: 20, w5: 15 },
  { code: SUBWAY, w1: 15, w2: 50, w3: 5, w4: 20, w5: 10 },
  { code: COST, w1: 5, w2: 5, w3: 65, w4: 20, w5: 5 },
  { code: SAFETY, w1: 20, w2: 10, w3: 10, w4: 50, w5: 10 },
  { code: HOUSE, w1: 15, w2: 10, w3: 5, w4: 20, w5: 50 },
];

export default weight;
