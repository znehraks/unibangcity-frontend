import Loader from "../../Loader";
import { useRecoilValue } from "recoil";
import {
  dataAtom,
  isClickedAtom,
  chartDataAtom,
} from "../../../components/recoil";
import TopChart from "./TopChart";
import BottomChart from "./BottomChart.js";
const Result = () => {
  const data = useRecoilValue(dataAtom);
  const chartData = useRecoilValue(chartDataAtom);
  const isClicked = useRecoilValue(isClickedAtom);

  return (
    <>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <>
          <TopChart />
          {isClicked.rank !== 0 && chartData.hashtagsTotal.length !== 0 && (
            <BottomChart />
          )}
        </>
      )}
    </>
  );
};

export default Result;
