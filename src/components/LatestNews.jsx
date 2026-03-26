import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Calendar,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const newsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=400",
    author: "Kristin",
    date: "19 Dec, 2023",
    comments: 453,
    title:
      "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    excerpt:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
    author: "Robert",
    date: "28 Nov, 2023",
    comments: 738,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    excerpt:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400",
    author: "Arlene",
    date: "9 May, 2023",
    comments: 826,
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    excerpt:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

export default function LatestNews() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="w-full py-16 md:py-24 bg-[#F2F4F5]/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            {t("LatestNews.title")}
          </h2>
          <div className="w-20 h-1.5 bg-[#FA8232] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group border border-gray-100"
            >
              <Link
                to={`/blog/${news.id}`}
                className="block relative h-64 overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Link>

              <div
                className={`p-8 flex flex-col flex-grow ${isRTL ? "text-right" : "text-left"}`}
              >
                <div
                  className={`flex flex-wrap items-center gap-y-2 gap-x-4 text-[13px] font-medium text-gray-500 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[#FA8232]" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#FA8232]" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-[#FA8232]" />
                    <span>
                      {news.comments} {t("LatestNews.comments")}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/blog/${news.id}`}
                  className="hover:text-[#FA8232] transition-colors mb-4"
                >
                  <h3 className="text-gray-900 font-bold text-xl leading-snug line-clamp-2">
                    {news.title}
                  </h3>
                </Link>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {news.excerpt}
                </p>

                <div className={`mt-auto ${isRTL ? "ml-auto" : "mr-auto"}`}>
                  <Link
                    to={`/blog/${news.id}`}
                    className="inline-flex items-center gap-2 text-gray-900 font-extrabold text-sm group/btn relative"
                  >
                    <span className="relative z-10 uppercase tracking-widest">
                      {t("LatestNews.read_more")}
                    </span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                      {isRTL ? (
                        <ArrowLeft size={18} className="text-[#FA8232]" />
                      ) : (
                        <ArrowRight size={18} className="text-[#FA8232]" />
                      )}
                    </span>
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FA8232] transition-all duration-300 group-hover/btn:w-full"></span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
