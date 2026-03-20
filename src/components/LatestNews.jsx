import React from "react";
import { Link } from "react-router-dom";
import { User, Calendar, MessageCircle, ArrowRight } from "lucide-react";

// =========================================
// البيانات الوهمية للأخبار (Mock Data)
// =========================================
const newsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=400", // Smartwatch image
    author: "Kristin",
    date: "19 Dec, 2013",
    comments: 453,
    title:
      "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    excerpt:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", // Motherboard/Tech image
    author: "Robert",
    date: "28 Nov, 2015",
    comments: 738,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    excerpt:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400", // Smartphone image
    author: "Arlene",
    date: "9 May, 2014",
    comments: 826,
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    excerpt:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

export default function LatestNews() {
  return (
    // خلفية رمادية فاتحة جداً مشابهة للصورة
    <section className=" w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Latest News
        </h2>

        {/* شبكة الأخبار (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group"
            >
              {/* صورة الخبر */}
              <Link
                to={`/blog/${news.id}`}
                className="block relative h-56 overflow-hidden"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* محتوى الخبر */}
              <div className="p-6 flex flex-col flex-grow">
                {/* البيانات الوصفية (الكاتب، التاريخ، التعليقات) */}
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={16} className="text-[#FA8232]" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-[#FA8232]" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={16} className="text-[#FA8232]" />
                    <span>{news.comments}</span>
                  </div>
                </div>

                {/* العنوان */}
                <Link
                  to={`/blog/${news.id}`}
                  className="hover:text-[#FA8232] transition-colors"
                >
                  <h3 className="text-gray-900 font-semibold text-lg mb-3 leading-snug line-clamp-2">
                    {news.title}
                  </h3>
                </Link>

                {/* المقتطف */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* زر القراءة */}
                <div className="mt-auto">
                  <Link
                    to={`/blog/${news.id}`}
                    className="inline-flex items-center gap-2 text-[#FA8232] font-bold text-sm px-5 py-2.5 border-2 border-[#FFE5D3] rounded-sm hover:bg-[#FA8232] hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Read More <ArrowRight size={16} />
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
