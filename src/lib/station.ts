import { ArrivalInfo, StationData, Subway } from "@/types/arrival-info";

export const subwayIdTransfer = (stationId: string) => {
  switch (stationId) {
    case "1001":
      return "1호선";
    case "1002":
      return "2호선";
    case "1003":
      return "3호선";
    case "1004":
      return "4호선";
    case "1005":
      return "5호선";
    case "1006":
      return "6호선";
    case "1007":
      return "7호선";
    case "1008":
      return "8호선";
    case "1009":
      return "9호선";
    case "1032":
      return "GTX-A";
    case "1063":
      return "경의중앙선";
    case "1065":
      return "공항철도";
    case "1067":
      return "경춘선";
    case "1075":
      return "수인분당선";
    case "1077":
      return "신분당선";
    case "1081":
      return "경강선";
    case "1092":
      return "우이신설선";
    case "1093":
      return "서해선";
    case "1094":
      return "신림선";

    default:
      return "Unknown";
  }
};

export const lineColor = async (line: string) => {
  switch (line) {
    case "1호선":
      return "#0052A4";
    case "2호선":
      return "#00A84D";
    case "3호선":
      return "#EF7C1C";
    case "4호선":
      return "#00A4E3";
    case "5호선":
      return "#996cac";
    case "6호선":
      return "#CD7F00";
    case "7호선":
      return "#747F00";
    case "8호선":
      return "#E6186C";
    case "9호선":
      return "#BDB092";
    case "GTX-A":
      return "#0032A0";
    case "경의중앙선":
      return "#77C4A3";
    case "공항철도":
      return "#0090D2";
    case "경춘선":
      return "#178C72";
    case "수인분당선":
      return "#FABE00";
    case "신분당선":
      return "#D31145";
    case "경강선":
      return "#0054A6";
    case "우이신설선":
      return "#B0CE18";
    case "서해선":
      return "#8FC31F";
    case "신림선":
      return "#789CA";

    default:
      return "#000000";
  }
};

interface subwayItemCastingProps {
  existingData?: StationData[];
  newData: Record<string, any>;
}

export const subwayItemCasting = ({
  existingData,
  newData,
}: subwayItemCastingProps): Subway[] => {
  //Map객체 형변환
  //호선별 그룹화
  const subwayGroup = newData.reduce((acc: any, obj: any) => {
    let key = subwayIdTransfer(obj.subwayId);

    // console.log("키값 : ", key);
    if (!acc[key]) {
      acc[key] = { upLine: [], downLine: [] };
    }
    const upDown = obj.ordkey.slice(0, 1);
    // console.log("상하행 : ", upDown);
    if (upDown === "0") {
      //상행
      acc[key].upLine.push(
        new ArrivalInfo({
          subwayId: obj.subwayId,
          subwayName: obj.statnNm,
          updnLine: obj.updnLine,
          bstatnNm: obj.bstatnNm,
          barvlDt: obj.barvlDt,
        })
      );
    } else {
      acc[key].downLine.push(
        new ArrivalInfo({
          subwayId: obj.subwayId,
          subwayName: obj.statnNm,
          updnLine: obj.updnLine,
          bstatnNm: obj.bstatnNm,
          barvlDt: obj.barvlDt,
        })
      );
    }

    return acc;
  }, {});

  //Subway 타입 변경

  const subway = Object.entries(subwayGroup).map(([key, value]) => {
    return new Subway({
      name: key,
      upLine: subwayGroup[key].upLine,
      downLine: subwayGroup[key].downLine,
    });
  });

  return subway;
};
