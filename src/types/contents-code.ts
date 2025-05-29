export class Contents {
  code: number;
  name: string;
  description?: string;
  image?: string;

  constructor({
    code,
    name,
    description,
    image,
  }: {
    code: number;
    name: string;
    description?: string;
    image?: string;
  }) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
  }
}

export const mockContents: Contents[] = [
  {
    code: 1,
    name: "뉴스",
    description: "검색어를 기반으로 가장 최신의 네이버 뉴스를 조회합니다.",
  },
  {
    code: 2,
    name: "날씨",
    description: "지역별 날씨를 조회합니다.",
  },
  {
    code: 3,
    name: "유튜브",
  },
  {
    code: 4,
    name: "환율",
    description: "대한민국을 기준으로 국가별 환율을 조회합니다.",
  },
  {
    code: 5,
    name: "캘린더",
    description: "구글 캘린더",
  },
  {
    code: 6,
    name: "증권",
    description: "주식 정보",
  },
  {
    code: 7,
    name: "할일",
    description: "To do List 할일을 기록할 수 있습니다.",
  },
  {
    code: 8,
    name: "지하철 도착정보",
    description: "서울특별시 지하철 도착정보입니다.",
  },
  {
    code: 9,
    name: "스케줄러",
    description: "일정을 관리할 수 있는 스케줄러",
  },
];
