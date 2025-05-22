class NaverData {
  display: number;
  items: NaverItem[];
  lastBuildDate: string;
  start: number;
  total: number;

  constructor({
    display,
    items,
    lastBuildDate,
    start,
    total,
  }: {
    display: number;
    items: NaverItem[];
    lastBuildDate: string;
    start: number;
    total: number;
  }) {
    (this.display = display),
      (this.items = items),
      (this.lastBuildDate = lastBuildDate),
      (this.start = start),
      (this.total = total);
  }
}

class NaverItem {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  bloggerlink: string;

  constructor({
    title,
    link,
    description,
    bloggername,
    bloggerlink,
  }: {
    title: string;
    link: string;
    description: string;
    bloggername: string;
    bloggerlink: string;
  }) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.bloggername = bloggerlink;
    this.bloggerlink = bloggerlink;
  }
}
