import { ResponsiveRadar } from "@nivo/radar";
import { useRecoilValue } from "recoil";
import {
  aggregatedAtom,
  isClickedAtom,
  isHoveredAtom,
  mobileAtom,
} from "../recoil";

const MyResponsiveRadar = () => {
  const mobile = useRecoilValue(mobileAtom);
  const aggregated = useRecoilValue(aggregatedAtom);
  const isHovered = useRecoilValue(isHoveredAtom);
  const isClicked = useRecoilValue(isClickedAtom);
  return (
    <ResponsiveRadar
      data={aggregated}
      keys={[isHovered ? `${isHovered.rank}위` : `${isClicked.rank}위`, "평균"]}
      indexBy="weight"
      maxValue={35}
      margin={{ top: 100, right: 100, bottom: 40, left: 100 }}
      curve="linearClosed"
      borderWidth={2}
      borderColor={{ from: "color" }}
      gridLevels={5}
      gridShape="linear"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={mobile ? 6 : 4}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={{ scheme: "accent" }}
      fillOpacity={0.25}
      blendMode="darken"
      animate={true}
      motionConfig="wobbly"
      isInteractive={true}
      theme={{
        fontSize: mobile ? 10 : 20,
        fontWeight: 800,
      }}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: mobile ? 200 : 80,
          itemHeight: mobile ? 40 : 20,
          itemTextColor: "#000",
          symbolSize: mobile ? 15 : 20,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
export default MyResponsiveRadar;
