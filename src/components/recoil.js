import { atom } from "recoil";
import { ALL, INTRO, MONTHRESERV } from "./Enum";
export const modeAtom = atom({
  key: "mode",
  default: INTRO,
});

export const answersAtom = atom({
  key: "answers",
  default: {
    Q1Answer: "",
    univ_lat: "",
    univ_lon: "",
    Q2Answer: "",
    Q3Answer: "",
    Q4Answer: "",
    Q5Answer: "",
    Q3Answer_kr: "",
    Q4Answer_kr: "",
    Q5Answer_kr: "",
  },
});

export const dataAtom = atom({
  key: "data",
  default: [],
});

export const aggregatedAtom = atom({
  key: "aggregated",
  default: [],
});

export const currentAddressAtom = atom({
  key: "currentAddress",
  default: "",
});

export const houseAtom = atom({
  key: "house",
  default: "",
});

export const isClickedAtom = atom({
  key: "isClicked",
  default: {
    T1: 0,
    T1_avg: 0,
    T2: 0,
    T2_avg: 0,
    T3: 0,
    T3_avg: 0,
    T4: 0,
    T4_avg: 0,
    T5: 0,
    T5_avg: 0,
    code: "",
    lat: 0,
    lon: 0,
    rank: 0,
    rooms_desc: [],
    rooms_desc2: [],
    rooms_hash_tags: [],
    rooms_hash_tags_count: [],
    rooms_id: [],
    rooms_img_url_01: [],
    rooms_location_lat: [],
    rooms_price_title: [],
    rooms_selling_type: [],
    rooms_type: [],
    total_weight: "",
    total_weight_avg: "",
  },
});

export const isHoveredAtom = atom({
  key: "isHovered",
  default: {
    T1: 0,
    T1_avg: 0,
    T2: 0,
    T2_avg: 0,
    T3: 0,
    T3_avg: 0,
    T4: 0,
    T4_avg: 0,
    T5: 0,
    T5_avg: 0,
    code: "",
    lat: 0,
    lon: 0,
    rank: 0,
    rooms_desc: [],
    rooms_desc2: [],
    rooms_hash_tags: [],
    rooms_hash_tags_count: [],
    rooms_id: [],
    rooms_img_url_01: [],
    rooms_location_lat: [],
    rooms_price_title: [],
    rooms_selling_type: [],
    rooms_type: [],
    total_weight: "",
    total_weight_avg: "",
  },
});

export const chartDataAtom = atom({
  key: "chartData",
  default: {
    hashtagsEach: [],
    monthlyDepositEachAggregated: {},
    monthlyPayEachAggregated: {},
    reservDepositEachAggregated: {},
    hashtagsTotal: [],
    monthlyDepositTotalAggregated: {},
    monthlyPayTotalAggregated: {},
    reservDepositTotalAggregated: {},
  },
});

export const isCheckedAtom = atom({
  key: "isChecked",
  default: MONTHRESERV,
});

export const chartmodeAtom = atom({
  key: "chartmode",
  default: ALL,
});

export const positionsAtom = atom({
  key: "positions",
  default: [],
});

export const mobileAtom = atom({
  key: "mobile",
  default: window.innerWidth <= 550,
});
