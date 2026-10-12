import React, { useMemo, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Search, Menu, X, ChevronRight, Play, Clock3, Share2, ArrowLeft,
  LayoutDashboard, Newspaper, Video, Tags, Image as ImageIcon, Users,
  Settings, Plus, Trash2, Edit3, Globe2, TrendingUp, CheckCircle2
} from "lucide-react";
import { categories, seedArticles, seedVideos, getCategoryName } from "./data";

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("sow-language") || "en");
  const [articles, setArticles] = useState(() => load("sow-articles", seedArticles));
  const [videos, setVideos] = useState(() => load("sow-videos", seedVideos));
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("sow-language", lang);
  };

  const updateArticles = (next) => { setArticles(next); save("sow-articles", next); };
  const updateVideos = (next) => { setVideos(next); save("sow-videos", next); };

  return (
    <div className="app">
      <Routes>
        <Route path="/admin/*" element={<Admin articles={articles} videos={videos} updateArticles={updateArticles} updateVideos={updateVideos} />} />
        <Route path="*" element={
          <PublicSite
            language={language}
            changeLanguage={changeLanguage}
            articles={articles}
            videos={videos}
            query={query}
            setQuery={setQuery}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        } />
      </Routes>
    </div>
  );
}

function PublicSite({ language, changeLanguage, articles, videos, query, setQuery, mobileOpen, setMobileOpen }) {
  return (
    <>
      <div className="topline">
        <div className="container top-inner">
          <span>{new Date().toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="top-note">{language === "hi" ? "विश्वसनीय खबर, साफ जानकारी" : "Trusted news. Clear information."}</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-main">
          <button className="icon-btn mobile-only" onClick={() => setMobileOpen(v => !v)} aria-label="menu">{mobileOpen ? <X/> : <Menu/>}</button>
          <Link className="brand" to="/">
            <span className="brand-mark">S</span>
            <span><b>SOW</b><small>NEWS AGENCY</small></span>
          </Link>
          <nav className={`nav ${mobileOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setMobileOpen(false)}>{language === "hi" ? "होम" : "Home"}</Link>
            <Link to="/category/national" onClick={() => setMobileOpen(false)}>{language === "hi" ? "राष्ट्रीय" : "National"}</Link>
            <Link to="/category/politics" onClick={() => setMobileOpen(false)}>{language === "hi" ? "राजनीति" : "Politics"}</Link>
            <Link to="/category/business" onClick={() => setMobileOpen(false)}>{language === "hi" ? "बिजनेस" : "Business"}</Link>
            <Link to="/category/sports" onClick={() => setMobileOpen(false)}>{language === "hi" ? "खेल" : "Sports"}</Link>
            <Link to="/videos" onClick={() => setMobileOpen(false)}>{language === "hi" ? "वीडियो" : "Video"}</Link>
          </nav>
          <div className="header-actions">
            <div className="search-box">
              <Search size={17}/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={language === "hi" ? "खबर खोजें..." : "Search news..."} />
              {query && <Link to={`/search?q=${encodeURIComponent(query)}`} className="search-go">Go</Link>}
            </div>
            <button className="lang-toggle" onClick={() => changeLanguage(language === "en" ? "hi" : "en")}>
              <Globe2 size={16}/> {language === "en" ? "हिन्दी" : "English"}
            </button>
          </div>
        </div>
      </header>
      <div className="breaking">
        <div className="container breaking-inner">
          <span className="breaking-label">{language === "hi" ? "ब्रेकिंग" : "BREAKING"}</span>
          <div className="breaking-track">{language === "hi" ? "देश और दुनिया की महत्वपूर्ण खबरों पर हमारी टीम की लगातार नजर" : "Our newsroom is tracking the important stories shaping the country and the world."}</div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home language={language} articles={articles} videos={videos}/>} />
        <Route path="/category/:slug" element={<CategoryPage language={language} articles={articles}/>} />
        <Route path="/article/:id" element={<ArticlePage language={language} articles={articles}/>} />
        <Route path="/search" element={<SearchPage language={language} articles={articles}/>} />
        <Route path="/videos" element={<VideosPage language={language} videos={videos}/>} />
        <Route path="/about" element={<InfoPage title={language === "hi" ? "हमारे बारे में" : "About Us"} text={language === "hi" ? "SOW News एक द्विभाषी डिजिटल न्यूज़ प्लेटफॉर्म है, जिसका उद्देश्य पाठकों तक स्पष्ट, तेज और जिम्मेदार जानकारी पहुंचाना है।" : "SOW News is a bilingual digital news platform focused on clear, timely and responsible information for readers."} />} />
        <Route path="/contact" element={<InfoPage title={language === "hi" ? "संपर्क करें" : "Contact Us"} text={language === "hi" ? "संपादकीय और सामान्य पूछताछ के लिए newsroom@sownews.in पर संपर्क करें।" : "For editorial and general enquiries, contact newsroom@sownews.in."} />} />
        <Route path="/editorial-policy" element={<InfoPage title={language === "hi" ? "संपादकीय नीति" : "Editorial Policy"} text={language === "hi" ? "हम तथ्यों की जांच, स्रोतों की स्पष्टता और खबरों की जिम्मेदार प्रस्तुति को प्राथमिकता देते हैं।" : "We prioritize verification, source clarity, corrections and responsible presentation of news."} />} />
        <Route path="/privacy" element={<InfoPage title="Privacy Policy" text="This demo portal stores only local browser preferences and demo CMS data. Production privacy, consent and analytics policies should be finalized with the client." />} />
        <Route path="/terms" element={<InfoPage title="Terms & Conditions" text="Content and service terms for the production website should be approved by the news agency before launch." />} />
        <Route path="/disclaimer" element={<InfoPage title="Disclaimer" text="This development build uses demonstration content and images. Production editorial content, logos and third-party credentials should be supplied by the client." />} />
        <Route path="/corrections" element={<InfoPage title="Corrections Policy" text="If a published report contains a material error, the newsroom should review the report and clearly update or correct the affected information." />} />
        <Route path="*" element={<NotFound language={language}/>} />
      </Routes>
      <Footer language={language}/>
    </>
  );
}

function Home({ language, articles, videos }) {
  const featured = articles.find(a => a.featured && a.language === language) || articles.find(a => a.featured);
  const latest = articles.filter(a => a.language === language).slice(0, 5);
  const more = articles.filter(a => a.language === language && a.id !== featured?.id).slice(0, 4);
  const featuredVideo = videos.find(v => v.featured && v.language === language) || videos[0];

  return <main>
    <section className="hero container">
      <div className="hero-copy">
        <span className="eyebrow"><span className="dot"></span>{language === "hi" ? "आज की प्रमुख खबर" : "TOP STORY"}</span>
        <h1>{featured?.title}</h1>
        <p>{featured?.excerpt}</p>
        <div className="meta"><span>{featured?.author}</span><span>•</span><span>{featured?.date}</span></div>
        <Link className="primary-btn" to={`/article/${featured?.id}`}>{language === "hi" ? "पूरी खबर पढ़ें" : "Read full story"} <ChevronRight size={17}/></Link>
      </div>
      <Link to={`/article/${featured?.id}`} className="hero-image">
        <img src={featured?.image} alt={featured?.title}/>
        <span className="image-tag">{getCategoryName(featured?.category, language)}</span>
      </Link>
    </section>

    <section className="container section">
      <SectionHeading title={language === "hi" ? "ताज़ा खबरें" : "Latest News"} linkText={language === "hi" ? "सभी खबरें" : "View all"} link="/category/national"/>
      <div className="latest-grid">
        {latest.map((article, i) => <NewsCard key={article.id} article={article} language={language} featured={i === 0}/>)}
      </div>
    </section>

    <section className="dark-section">
      <div className="container section">
        <SectionHeading title={language === "hi" ? "वीडियो न्यूज़" : "Video News"} light linkText={language === "hi" ? "सभी वीडियो" : "All videos"} link="/videos"/>
        <div className="video-layout">
          <VideoFeature video={featuredVideo}/>
          <div className="video-list">{videos.slice(0,3).map(v => <VideoRow key={v.id} video={v}/>)}</div>
        </div>
      </div>
    </section>

    <section className="container section">
      <SectionHeading title={language === "hi" ? "श्रेणी के अनुसार" : "Across Categories"} />
      <div className="category-grid">
        {categories.map(cat => {
          const item = articles.find(a => a.category === cat.slug && a.language === language);
          return <Link to={`/category/${cat.slug}`} className="category-tile" key={cat.slug}>
            <span>{language === "hi" ? cat.hi : cat.en}</span>
            <ChevronRight size={18}/>
            {item && <small>{item.title}</small>}
          </Link>
        })}
      </div>
    </section>

    <section className="container section split-section">
      <div>
        <SectionHeading title={language === "hi" ? "लोकप्रिय खबरें" : "Popular Reads"} />
        <div className="popular-list">{more.map((a, i) => <PopularRow key={a.id} article={a} rank={i+1} language={language}/>)}</div>
      </div>
      <aside className="newsletter">
        <span className="eyebrow">{language === "hi" ? "न्यूज़लेटर" : "NEWSLETTER"}</span>
        <h3>{language === "hi" ? "महत्वपूर्ण खबरें सीधे इनबॉक्स में" : "The important stories, in your inbox."}</h3>
        <p>{language === "hi" ? "हमारे साप्ताहिक अपडेट के लिए अपना ईमेल दर्ज करें।" : "Get a clean weekly briefing with the stories worth knowing."}</p>
        <div className="subscribe"><input placeholder="Email address"/><button>Join</button></div>
        <small>No spam. Unsubscribe anytime.</small>
      </aside>
    </section>
  </main>;
}

function SectionHeading({title, linkText, link, light=false}) {
  return <div className={`section-heading ${light ? "light" : ""}`}><h2>{title}</h2>{link && <Link to={link}>{linkText} <ChevronRight size={16}/></Link>}</div>;
}

function NewsCard({article, language, featured=false}) {
  return <Link to={`/article/${article.id}`} className={`news-card ${featured ? "large" : ""}`}>
    <div className="card-image"><img src={article.image} alt={article.title}/><span>{getCategoryName(article.category, language)}</span></div>
    <div className="card-content"><h3>{article.title}</h3><p>{article.excerpt}</p><div className="meta"><span>{article.author}</span><span>•</span><span>{article.date}</span></div></div>
  </Link>;
}

function VideoFeature({video}) {
  return <a className="video-feature" href={video?.youtube} target="_blank" rel="noreferrer">
    <div className="video-thumb"><img src={`https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`} alt={video?.title}/><span className="play"><Play fill="currentColor"/></span></div>
    <h3>{video?.title}</h3>
  </a>;
}
function VideoRow({video}) {
  return <a className="video-row" href={video.youtube} target="_blank" rel="noreferrer">
    <div className="mini-thumb"><img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" alt=""/></div>
    <div><span className="video-kicker">VIDEO</span><h4>{video.title}</h4></div><ChevronRight/>
  </a>;
}
function PopularRow({article, rank, language}) {
  return <Link to={`/article/${article.id}`} className="popular-row"><strong>0{rank}</strong><div><span>{getCategoryName(article.category, language)}</span><h4>{article.title}</h4></div></Link>;
}

function CategoryPage({language, articles}) {
  const {slug} = useParams();
  const list = articles.filter(a => a.category === slug && a.language === language);
  return <main className="container page">
    <div className="page-kicker">{language === "hi" ? "श्रेणी" : "CATEGORY"}</div>
    <h1>{getCategoryName(slug, language)}</h1>
    <p className="page-intro">{language === "hi" ? "इस श्रेणी की नवीनतम और महत्वपूर्ण खबरें।" : `Latest stories and updates from ${getCategoryName(slug, language)}.`}</p>
    <div className="article-grid">{list.length ? list.map(a => <NewsCard key={a.id} article={a} language={language} featured={false}/>) : <Empty text="No stories in this category yet."/>}</div>
  </main>;
}

function ArticlePage({language, articles}) {
  const {id} = useParams();
  const article = articles.find(a => String(a.id) === id);
  if (!article) return <NotFound language={language}/>;
  return <main className="container article-page">
    <Link className="back-link" to="/"><ArrowLeft size={17}/> {language === "hi" ? "होम पर वापस" : "Back to home"}</Link>
    <div className="article-head"><span className="eyebrow">{getCategoryName(article.category, language)}</span><h1>{article.title}</h1><p>{article.excerpt}</p>
      <div className="article-meta"><span>{article.author}</span><span>•</span><span>{article.date}</span><button><Share2 size={16}/> Share</button></div>
    </div>
    <img className="article-cover" src={article.image} alt={article.title}/>
    <div className="article-body"><p>{article.body}</p><p>{language === "hi" ? "संपादकीय टीम पाठकों के लिए तथ्य, संदर्भ और उपयोगी जानकारी को एक जगह लाने का प्रयास करती है।" : "Our editorial team works to bring facts, context and useful information together for readers in one place."}</p></div>
    <div className="tags">{article.tags.map(t => <span key={t}>#{t}</span>)}</div>
  </main>;
}

function SearchPage({language, articles}) {
  const params = new URLSearchParams(useLocation().search);
  const q = (params.get("q") || "").toLowerCase();
  const results = articles.filter(a => `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q) && a.language === language);
  return <main className="container page"><div className="page-kicker">SEARCH</div><h1>{q ? `Results for “${q}”` : "Search news"}</h1><div className="article-grid">{results.map(a => <NewsCard key={a.id} article={a} language={language}/>)}</div>{!results.length && <Empty text="No matching stories found."/>}</main>;
}

function VideosPage({language, videos}) {
  const list = videos.filter(v => v.language === language);
  return <main className="container page"><div className="page-kicker">VIDEO NEWS</div><h1>{language === "hi" ? "वीडियो न्यूज़" : "Video News"}</h1><p className="page-intro">News videos, explainers and newsroom updates.</p><div className="video-page-grid">{list.map(v => <VideoFeature key={v.id} video={v}/>)}</div></main>;
}

function InfoPage({title, text}) {
  return <main className="container page info-page"><div className="page-kicker">SOW NEWS</div><h1>{title}</h1><p className="page-intro">{text}</p><div className="info-card"><h3>Editorially focused. Built for the web.</h3><p>The production version can connect this interface to MongoDB, Cloudinary, analytics and the agency's approved domain and accounts.</p></div></main>;
}

function Footer({language}) {
  return <footer className="footer"><div className="container footer-grid"><div><Link className="brand footer-brand" to="/"><span className="brand-mark">S</span><span><b>SOW</b><small>NEWS AGENCY</small></span></Link><p>{language === "hi" ? "विश्वसनीय और स्पष्ट डिजिटल पत्रकारिता।" : "Independent digital journalism with a clear, reader-first experience."}</p></div><div><h4>Explore</h4><Link to="/category/national">National</Link><Link to="/category/business">Business</Link><Link to="/category/sports">Sports</Link><Link to="/videos">Video News</Link></div><div><h4>Information</h4><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/editorial-policy">Editorial Policy</Link><Link to="/privacy">Privacy</Link></div><div><h4>Admin</h4><Link to="/admin">Dashboard</Link><p>newsroom@sownews.in</p></div></div><div className="container copyright">© 2026 SOW News Agency. All rights reserved.</div></footer>;
}

function NotFound({language}) { return <main className="container page not-found"><div className="big404">404</div><h1>{language === "hi" ? "पेज नहीं मिला" : "Page not found"}</h1><Link className="primary-btn" to="/">Go home</Link></main>; }
function Empty({text}) { return <div className="empty"><Newspaper/><p>{text}</p></div>; }

function Admin({articles, videos, updateArticles, updateVideos}) {
  const [active, setActive] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  const stats = [
    ["Published Articles", articles.length, Newspaper],
    ["Hindi Stories", articles.filter(a => a.language === "hi").length, Globe2],
    ["English Stories", articles.filter(a => a.language === "en").length, Globe2],
    ["Video Entries", videos.length, Video]
  ];

  const saveArticle = (form) => {
    if (editArticle) updateArticles(articles.map(a => a.id === editArticle.id ? {...form, id: editArticle.id} : a));
    else updateArticles([{...form, id: Date.now()}, ...articles]);
    setShowForm(false); setEditArticle(null);
  };
  const removeArticle = id => { if(confirm("Delete this article?")) updateArticles(articles.filter(a => a.id !== id)); };

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${sidebar ? "open" : ""}`}>
      <div className="admin-logo"><span className="brand-mark">S</span><div><b>SOW CMS</b><small>NEWSROOM</small></div></div>
      <button className={active==="dashboard"?"active":""} onClick={()=>{setActive("dashboard");setSidebar(false)}}><LayoutDashboard/> Dashboard</button>
      <button className={active==="articles"?"active":""} onClick={()=>{setActive("articles");setSidebar(false)}}><Newspaper/> News Articles</button>
      <button className={active==="videos"?"active":""} onClick={()=>{setActive("videos");setSidebar(false)}}><Video/> Video News</button>
      <button onClick={()=>setActive("categories")}><Tags/> Categories</button>
      <button onClick={()=>setActive("media")}><ImageIcon/> Media Library</button>
      <button onClick={()=>setActive("users")}><Users/> Users & Roles</button>
      <button onClick={()=>setActive("settings")}><Settings/> Settings</button>
      <Link to="/" className="view-site"><Globe2/> View Website</Link>
    </aside>
    <section className="admin-content">
      <header className="admin-top"><button className="icon-btn admin-mobile" onClick={()=>setSidebar(v=>!v)}><Menu/></button><div><span className="admin-label">CONTENT MANAGEMENT</span><h1>{active === "dashboard" ? "Dashboard" : active.replace("-", " ")}</h1></div><Link className="admin-site" to="/">View site <ChevronRight/></Link></header>
      <div className="admin-body">
        {active==="dashboard" && <Dashboard stats={stats} articles={articles}/>}
        {active==="articles" && <ArticleManager articles={articles} onAdd={()=>{setEditArticle(null);setShowForm(true)}} onEdit={a=>{setEditArticle(a);setShowForm(true)}} onDelete={removeArticle}/>}
        {active==="videos" && <VideoManager videos={videos} updateVideos={updateVideos}/>}
        {active==="categories" && <SimpleModule title="Category & Tag Management" icon={Tags} items={categories.map(c=>`${c.en} / ${c.hi}`)}/>}
        {active==="media" && <SimpleModule title="Media Library" icon={ImageIcon} items={articles.map(a=>a.image).slice(0,8)}/>}
        {active==="users" && <SimpleModule title="Users & Roles" icon={Users} items={["Super Admin — Full access","Administrator — Content & configuration","Editor — Review and publish","Reporter — Assigned content and drafts"]}/>}
        {active==="settings" && <SimpleModule title="Site Settings" icon={Settings} items={["General site information","SEO defaults","Social media links","Analytics integration","Security and environment settings"]}/>}
      </div>
    </section>
    {showForm && <ArticleForm initial={editArticle} onClose={()=>{setShowForm(false);setEditArticle(null)}} onSave={saveArticle}/>}
  </div>;
}

function Dashboard({stats, articles}) {
  return <div><div className="stats-grid">{stats.map(([label,value,Icon])=><div className="stat" key={label}><div className="stat-icon"><Icon/></div><span>{label}</span><strong>{value}</strong><small><TrendingUp size={13}/> Active</small></div>)}</div><div className="dashboard-grid"><div className="admin-panel"><div className="panel-head"><div><span className="admin-label">RECENT ACTIVITY</span><h2>Latest articles</h2></div><Link to="/admin" className="text-link">Manage</Link></div>{articles.slice(0,5).map(a=><div className="activity-row" key={a.id}><div className="activity-img"><img src={a.image} alt=""/></div><div><strong>{a.title}</strong><span>{a.author} · {a.date}</span></div><CheckCircle2 className="check"/></div>)}</div><div className="admin-panel quick"><span className="admin-label">QUICK ACTIONS</span><h2>Publish something new</h2><p>Create an article or add a YouTube video from the newsroom.</p><Link to="/admin" className="quick-btn"><Plus/> New Article</Link><div className="quick-note">Demo CMS stores changes in this browser using localStorage.</div></div></div></div>;
}

function ArticleManager({articles,onAdd,onEdit,onDelete}) {
  return <div className="admin-panel"><div className="panel-head"><div><span className="admin-label">PUBLISHING</span><h2>News articles</h2></div><button className="primary-btn" onClick={onAdd}><Plus/> New Article</button></div><div className="table-wrap"><table><thead><tr><th>Story</th><th>Language</th><th>Category</th><th>Date</th><th></th></tr></thead><tbody>{articles.map(a=><tr key={a.id}><td><div className="table-story"><img src={a.image} alt=""/><span>{a.title}</span></div></td><td><span className="pill">{a.language==="hi"?"Hindi":"English"}</span></td><td>{getCategoryName(a.category,a.language)}</td><td>{a.date}</td><td><button className="table-action" onClick={()=>onEdit(a)}><Edit3/></button><button className="table-action danger" onClick={()=>onDelete(a.id)}><Trash2/></button></td></tr>)}</tbody></table></div></div>;
}

function VideoManager({videos,updateVideos}) {
  const add = () => { const title=prompt("Video title"); if(!title) return; updateVideos([{id:Date.now(),title,language:"en",category:"technology",youtube:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",featured:false},...videos]); };
  return <div className="admin-panel"><div className="panel-head"><div><span className="admin-label">YOUTUBE</span><h2>Video entries</h2></div><button className="primary-btn" onClick={add}><Plus/> Add Video</button></div><div className="video-admin-grid">{videos.map(v=><div className="video-admin-card" key={v.id}><div className="mini-thumb"><img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" alt=""/></div><div><span className="pill">{v.language}</span><h3>{v.title}</h3><small>{v.youtube}</small></div></div>)}</div></div>;
}

function SimpleModule({title,icon:Icon,items}) { return <div className="admin-panel simple-module"><Icon size={30}/><span className="admin-label">CMS MODULE</span><h2>{title}</h2><p>This module is wired into the dashboard UI and ready for the production API/database layer.</p><div className="module-list">{items.map((x,i)=><div key={i}><span>{x}</span><ChevronRight/></div>)}</div></div>; }

function ArticleForm({initial,onClose,onSave}) {
  const [form,setForm] = useState(initial || {language:"en",category:"national",featured:false,title:"",excerpt:"",body:"",author:"SOW Desk",date:"12 Oct 2026",image:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",tags:[]});
  const update=(key,value)=>setForm({...form,[key]:value});
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="admin-label">EDITOR</span><h2>{initial?"Edit article":"Create article"}</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><div className="form-grid"><label>Headline<input value={form.title} onChange={e=>update("title",e.target.value)}/></label><label>Language<select value={form.language} onChange={e=>update("language",e.target.value)}><option value="en">English</option><option value="hi">Hindi</option></select></label><label>Category<select value={form.category} onChange={e=>update("category",e.target.value)}>{categories.map(c=><option key={c.slug} value={c.slug}>{c.en}</option>)}</select></label><label>Author<input value={form.author} onChange={e=>update("author",e.target.value)}/></label><label className="full">Featured image URL<input value={form.image} onChange={e=>update("image",e.target.value)}/></label><label className="full">Short description<textarea rows="3" value={form.excerpt} onChange={e=>update("excerpt",e.target.value)}/></label><label className="full">Article body<textarea rows="7" value={form.body} onChange={e=>update("body",e.target.value)}/></label></div><div className="modal-actions"><button className="secondary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={()=>onSave(form)}><CheckCircle2/> Save article</button></div></div></div>;
}

export default App;
