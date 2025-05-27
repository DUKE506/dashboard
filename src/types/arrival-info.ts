export class StationData {
  name: string;
  subway: Subway[];
  selectedAt?: Date;

  constructor({
    name,
    subway,
    selectedAt,
  }: {
    name: string;
    subway: Subway[];
    selectedAt?: Date;
  }) {
    (this.name = name), (this.subway = subway);
    this.selectedAt = selectedAt;
  }
}

export class Subway {
  name: string;
  upLine: ArrivalInfo[];
  downLine: ArrivalInfo[];

  constructor({
    name,
    upLine,
    downLine,
  }: {
    name: string;
    upLine: ArrivalInfo[];
    downLine: ArrivalInfo[];
  }) {
    this.name = name;
    this.upLine = upLine;
    this.downLine = downLine;
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
