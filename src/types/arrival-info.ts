export class StationData {
  name: string;
  arrivalInfo: ArrivalInfo[];

  constructor({
    name,
    arrivalInfo,
  }: {
    name: string;
    arrivalInfo: ArrivalInfo[];
  }) {
    (this.name = name), (this.arrivalInfo = arrivalInfo);
  }
}

export class ArrivalInfo {
  //호선ID
  subwayId: string;
  subwayName: string;
  //상행/내선 하행/외선
  updnLine: string;
  //종착지명
  bstatnNm: string;
  //열차도착예정시간
  barvlDt: string;

  constructor({
    subwayId,
    subwayName,

    updnLine,

    bstatnNm,

    barvlDt,
  }: {
    subwayId: string;
    subwayName: string;

    updnLine: string;

    bstatnNm: string;

    barvlDt: string;
  }) {
    this.subwayId = subwayId;
    this.subwayName = subwayName;
    this.updnLine = updnLine;
    this.bstatnNm = bstatnNm;
    this.barvlDt = barvlDt;
  }
}
