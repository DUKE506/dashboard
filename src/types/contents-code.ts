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
];
