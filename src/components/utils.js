import { COST, DISTANCE, HOUSE, SAFETY, SUBWAY } from "./Enum";

import distance_img from "./styles/images/distance.png";
import subway_img from "./styles/images/subway.png";
import cost_img from "./styles/images/cost.png";
import safety_img from "./styles/images/safety.png";
import house_img from "./styles/images/house.png";
import distance_red_img from "./styles/images/distance_red.png";
import subway_red_img from "./styles/images/subway_red.png";
import cost_red_img from "./styles/images/cost_red.png";
import safety_red_img from "./styles/images/safety_red.png";
import house_red_img from "./styles/images/house_red.png";

export const ArticleButtonElements = (answers) => {
  return [
    {
      name: DISTANCE,
      kr_name: "거리",
      black_img: distance_img,
      red_img: distance_red_img,
      isSelected: answers.Q3Answer === DISTANCE,
    },
    {
      name: SUBWAY,
      kr_name: "역세권",
      black_img: subway_img,
      red_img: subway_red_img,
      isSelected: answers.Q3Answer === SUBWAY,
    },
    {
      name: COST,
      kr_name: "가성비",
      black_img: cost_img,
      red_img: cost_red_img,
      isSelected: answers.Q3Answer === COST,
    },
    {
      name: SAFETY,
      kr_name: "안전",
      black_img: safety_img,
      red_img: safety_red_img,
      isSelected: answers.Q3Answer === SAFETY,
    },
    {
      name: HOUSE,
      kr_name: "매물 개수",
      black_img: house_img,
      red_img: house_red_img,
      isSelected: answers.Q3Answer === HOUSE,
    },
  ];
};

export const unitTransformer = (value) => {
  return value >= 10000
    ? `${Math.floor(value / 10000)}억 ${
        value % 10000 === 0 ? "(원)" : `${value % 10000}(만 원)`
      }`
    : `${value}(만 원)`;
};
