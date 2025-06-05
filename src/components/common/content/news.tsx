import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDataState } from "@/store/data-store";
import ky from "ky";
import Link from "next/link";
import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";

const getNews = async (url: string) => {
  const res = await ky.get(url);
  const data = await res.json();

  return data;
};

interface ContentProps {
  data: GridLayout.Layout;
  children?: React.ReactNode;
}

const News = ({ data, children, ...props }: ContentProps) => {
  const [search, setSearch] = useState<string>("속보");
  const NEWS_API_URL = `/api/search/news?query=${search}&display=20`;
  const { setNaverData, naverData } = useDataState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNews(NEWS_API_URL);
      setNaverData(res as NaverNewsData);
    };

    fetchData();
  }, []);

  const onSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.code === "Enter")) return;

    const res = await getNews(NEWS_API_URL);
    setNaverData(res as NaverNewsData);
  };

  return (
    <div className="flex flex-col h-full">
      {children}
      <div className="p-2 flex-shrink-0">
        <Input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => onSearch(e)}
        />
      </div>
      <ScrollArea className="h-full min-h-0 ">
        <div className="flex flex-col gap-4">
          {naverData?.items.map((item, i) => {
            // const cleanTitle = sanitizeHtml(item?.title);
            return (
              <div key={i} className="px-2">
                <Link href={item.link} target="_blank">
                  <span
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default News;
