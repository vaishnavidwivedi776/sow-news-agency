export const categories = [
  { slug: "politics", en: "Politics", hi: "राजनीति" },
  { slug: "national", en: "National", hi: "राष्ट्रीय" },
  { slug: "international", en: "International", hi: "अंतरराष्ट्रीय" },
  { slug: "business", en: "Business", hi: "बिजनेस" },
  { slug: "sports", en: "Sports", hi: "खेल" },
  { slug: "entertainment", en: "Entertainment", hi: "मनोरंजन" },
  { slug: "technology", en: "Technology", hi: "टेक्नोलॉजी" }
];

export const seedArticles = [
  {
    id: 1, language: "en", category: "national", featured: true,
    title: "Cities prepare for a new phase of smarter public services",
    excerpt: "Local administrations are moving towards connected services, cleaner mobility and faster digital access for citizens.",
    body: "Across major cities, public-service teams are combining technology with practical civic planning. The focus is on simpler access, better communication and services that work well on both phones and desktops.",
    author: "SOW Desk", date: "12 Oct 2026", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    tags: ["cities", "technology", "national"]
  },
  {
    id: 2, language: "hi", category: "politics", featured: true,
    title: "देशभर में नई नीतियों पर चर्चा, राज्यों ने रखे अपने सुझाव",
    excerpt: "नीति और विकास से जुड़े मुद्दों पर विभिन्न राज्यों के प्रतिनिधियों ने अपने सुझाव साझा किए।",
    body: "नई नीतियों को लेकर राज्यों और प्रशासनिक अधिकारियों के बीच चर्चा का दौर जारी है। बैठक में स्थानीय जरूरतों, डिजिटल सेवाओं और नागरिक सुविधाओं को लेकर कई सुझाव सामने आए।",
    author: "SOW संवाददाता", date: "12 अक्टूबर 2026", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    tags: ["नीति", "राज्य", "विकास"]
  },
  {
    id: 3, language: "en", category: "business",
    featured: false,
    title: "Small businesses turn to digital tools to reach wider markets",
    excerpt: "From payments to customer support, small teams are adopting simple digital workflows.",
    body: "Digital tools are becoming a practical part of everyday business operations. Small teams are using online payments, social platforms and lightweight software to stay connected with customers.",
    author: "Business Desk", date: "11 Oct 2026", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    tags: ["business", "digital"]
  },
  {
    id: 4, language: "hi", category: "sports",
    featured: false,
    title: "खेल जगत में युवा खिलाड़ियों का बढ़ता प्रभाव",
    excerpt: "युवा प्रतिभाएं लगातार राष्ट्रीय और अंतरराष्ट्रीय स्तर पर अपनी पहचान बना रही हैं।",
    body: "युवा खिलाड़ियों की मेहनत और नए प्रशिक्षण तरीकों ने खेल जगत में नई ऊर्जा पैदा की है। कई प्रतिभाएं अब कम उम्र में बड़े मंच तक पहुंच रही हैं।",
    author: "Sports Desk", date: "11 अक्टूबर 2026", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    tags: ["खेल", "युवा"]
  },
  {
    id: 5, language: "en", category: "technology",
    featured: false,
    title: "AI tools become part of everyday creative workflows",
    excerpt: "Creators and teams are using AI to speed up research, drafting and repetitive production work.",
    body: "AI-assisted workflows are becoming more common in creative teams. The strongest results still depend on human review, clear instructions and a thoughtful editing process.",
    author: "Tech Desk", date: "10 Oct 2026", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "technology"]
  },
  {
    id: 6, language: "hi", category: "entertainment",
    featured: false,
    title: "नई फिल्मों और डिजिटल कंटेंट को लेकर दर्शकों में उत्साह",
    excerpt: "सिनेमाघरों के साथ-साथ डिजिटल प्लेटफॉर्म पर भी नए कंटेंट की मांग बढ़ रही है।",
    body: "दर्शक अब अलग-अलग भाषाओं और फॉर्मेट में कंटेंट देखना पसंद कर रहे हैं। नए प्रोजेक्ट्स में कहानी, संगीत और तकनीक के साथ प्रयोग देखने को मिल रहे हैं।",
    author: "Entertainment Desk", date: "10 अक्टूबर 2026", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    tags: ["फिल्म", "मनोरंजन"]
  }
];

export const seedVideos = [
  { id: 1, language: "en", category: "technology", title: "How digital newsrooms are changing", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", featured: true },
  { id: 2, language: "hi", category: "national", title: "आज की बड़ी खबरें — SOW News", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", featured: false },
  { id: 3, language: "en", category: "business", title: "Business desk: weekly roundup", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", featured: false }
];

export const getCategoryName = (slug, language) => {
  const item = categories.find(c => c.slug === slug);
  return item ? item[language === "hi" ? "hi" : "en"] : slug;
};
