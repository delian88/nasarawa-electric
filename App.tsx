
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Leaf, 
  Factory, 
  Sun, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Send,
  Loader2,
  ExternalLink,
  Globe,
  Award,
  ShieldCheck
} from 'lucide-react';
import { getAgroElectricAdvice } from './services/geminiService';
import { Service, Project, Message } from './types';

const SERVICES: Service[] = [
  {
    id: 'rural-electrification',
    title: 'Rural Electrification',
    description: 'Bringing reliable grid power to remote agricultural communities across Nasarawa State.',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'solar-irrigation',
    title: 'Solar Irrigation Systems',
    description: 'Eco-friendly, cost-effective water pumping solutions for large-scale sustainable crop farming.',
    icon: 'sun',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'agro-processing',
    title: 'Industrial Agro-Processing',
    description: 'Heavy-duty electrical installations for rice mills, oil palm processing, and automated grain silos.',
    icon: 'factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'infrastructure',
    title: 'Pole & Grid Infrastructure',
    description: 'Supply and precision installation of high-quality concrete electric poles and transformer substations.',
    icon: 'leaf',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800'
  }
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lafia Mega Farm Grid Connect',
    location: 'Lafia, Nasarawa',
    category: 'Rural Electrification',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Keffi Solar Pumping Hub',
    location: 'Keffi, Nasarawa',
    category: 'Renewable Energy',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    title: 'Akwanga Rice Mill Powerhouse',
    location: 'Akwanga, Nasarawa',
    category: 'Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=600'
  }
];

type Page = 'home' | 'services' | 'projects' | 'advisor' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isAILoading, setIsAILoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAILoading(true);

    const aiResponse = await getAgroElectricAdvice(chatInput);
    const assistantMsg: Message = { role: 'assistant', content: aiResponse };
    setChatHistory(prev => [...prev, assistantMsg]);
    setIsAILoading(false);
  };

  const navTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const renderHeader = () => (
    <>
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone size={14} className="text-emerald-400" /> +234 800 NASARAW-E
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail size={14} className="text-emerald-400" /> contact@nasarawaelectric.pole
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 uppercase tracking-widest font-bold">
              <Globe size={14} className="text-emerald-400" /> Nasarawa, Nigeria
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 glass-nav shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => navTo('home')} className="flex items-center gap-4 group">
              <div className="bg-emerald-600 p-2.5 rounded-xl group-hover:rotate-[15deg] transition-all duration-300 shadow-lg shadow-emerald-200">
                <Zap className="text-white" size={28} />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-black text-slate-900 leading-none tracking-tight">NASARAW ELECTRIC</h1>
                <p className="text-[10px] tracking-[0.3em] text-emerald-600 font-black uppercase mt-1">Agro-Electric Excellence</p>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-10">
              {(['home', 'services', 'projects', 'advisor'] as Page[]).map((p) => (
                <button 
                  key={p} 
                  onClick={() => navTo(p)}
                  className={`capitalize text-sm font-bold tracking-widest transition-all hover:text-emerald-600 relative py-2 ${
                    currentPage === p ? 'text-emerald-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {p === 'advisor' ? 'AI Advisor' : p}
                </button>
              ))}
              <button 
                onClick={() => navTo('contact')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95"
              >
                Request Quote
              </button>
            </nav>

            <button className="md:hidden p-3 bg-slate-100 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-100 py-8 px-6 space-y-4 animate-page-in shadow-2xl">
            {(['home', 'services', 'projects', 'advisor', 'contact'] as Page[]).map((p) => (
              <button 
                key={p} 
                onClick={() => navTo(p)}
                className={`block w-full text-left p-5 rounded-2xl capitalize font-black tracking-widest text-sm ${currentPage === p ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'text-slate-600 bg-slate-50'}`}
              >
                {p === 'advisor' ? 'AI Advisor' : p}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );

  const renderFooter = () => (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-emerald-600 p-3 rounded-2xl">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">NASARAW ELECTRIC</h1>
                <p className="text-[9px] tracking-[0.3em] text-emerald-400 font-bold uppercase">Agro-Electric Specialists</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-10 text-sm">
              Empowering Nasarawa State's agricultural heart with world-class electrical infrastructure and renewable energy systems.
            </p>
            <div className="flex gap-4">
              {[Globe, ShieldCheck, Award].map((Icon, idx) => (
                <div key={idx} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-white/10">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 uppercase tracking-widest text-xs shimmer-text">Company</h4>
            <ul className="space-y-6 font-bold text-sm">
              <li><button onClick={() => navTo('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => navTo('services')} className="hover:text-emerald-400 transition-colors">Services</button></li>
              <li><button onClick={() => navTo('projects')} className="hover:text-emerald-400 transition-colors">Portfolio</button></li>
              <li><button onClick={() => navTo('advisor')} className="hover:text-emerald-400 transition-colors">AI Advisor</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 uppercase tracking-widest text-xs shimmer-text">Services</h4>
            <ul className="space-y-6 font-bold text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Grid Extension</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Solar Irrigation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mill Infrastructure</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pole Supply</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 uppercase tracking-widest text-xs shimmer-text">Newsletter</h4>
            <p className="mb-8 text-xs leading-relaxed">Stay connected with Nasarawa's latest agro-electric news and innovations.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs w-full outline-none focus:border-emerald-500 focus:bg-white/10 transition-all" />
              <button className="bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">© 2024 Nasarawa Electric Pole Company. All rights reserved.</p>
            <p className="text-emerald-500 text-[10px] uppercase tracking-widest font-black mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Powered by Premegage Tech solution
            </p>
          </div>
          <div className="flex gap-10 text-[10px] uppercase tracking-widest font-black">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader()}

      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="page-transition">
            {/* Professional Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2041" className="w-full h-full object-cover scale-105" alt="Hero Background" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-20 pb-20">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl text-emerald-300 font-black text-[10px] uppercase tracking-[0.4em] mb-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Infrastructure Specialists
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] shimmer-text-white tracking-tighter">
                    THE FUTURE <br /><span className="text-emerald-400">IS POWERED.</span>
                  </h2>
                  <p className="text-xl text-slate-300 mb-14 leading-relaxed max-w-xl font-medium">
                    We deliver heavy-duty electrical infrastructure designed specifically for Nasarawa's agricultural giants and rural communities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button onClick={() => navTo('services')} className="bg-emerald-600 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all hover:scale-105 shadow-2xl shadow-emerald-950/40">
                      Our Expertise <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navTo('advisor')} className="glass-card text-white border-white/20 px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                      AI Advisor <Leaf size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Stat Grid */}
            <section className="py-32 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20"></div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                  {[
                    { l: 'Poles Planted', v: '12,500', i: Zap },
                    { l: 'Energy Saving', v: '35%', i: Sun },
                    { l: 'LGAs Reached', v: '13/13', i: Globe },
                    { l: 'Trust Rating', v: '99.9%', i: ShieldCheck },
                  ].map((s, idx) => (
                    <div key={idx} className="group">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <s.i size={24} className="text-emerald-600 group-hover:text-white" />
                      </div>
                      <div className="text-5xl font-black text-slate-900 tracking-tighter mb-3 group-hover:text-emerald-600 transition-colors">{s.v}</div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'services' && (
          <section className="py-32 bg-slate-50 page-transition">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mb-24">
                <h2 className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-6">Our Capabilities</h2>
                <h3 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter shimmer-text">PRECISION AGRO-ELECTRICAL.</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                {SERVICES.map((s) => (
                  <div key={s.id} className="group relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-xl transition-all h-[550px] flex flex-col justify-end">
                    <img src={s.image} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" alt={s.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="relative p-12 text-white">
                      <div className="w-16 h-16 bg-emerald-600 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-950/50">
                        {s.icon === 'zap' ? <Zap size={32} /> : s.icon === 'sun' ? <Sun size={32} /> : s.icon === 'factory' ? <Factory size={32} /> : <Leaf size={32} />}
                      </div>
                      <h4 className="text-4xl font-black mb-6 tracking-tight">{s.title}</h4>
                      <p className="text-slate-300 leading-relaxed text-lg max-w-sm font-medium mb-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {s.description}
                      </p>
                      <button className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all">
                        Technical Specs <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'projects' && (
          <section className="py-32 bg-white page-transition">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <div className="max-w-2xl">
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter shimmer-text">OUR IMPACT.</h2>
                  <p className="text-slate-500 mt-6 text-xl leading-relaxed font-medium">Proven excellence in infrastructure delivery across the region's largest farms.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden group border border-slate-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                    <div className="relative h-80 overflow-hidden">
                      <img src={p.imageUrl} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={p.title} />
                      <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute top-8 left-8">
                        <span className="bg-white/95 backdrop-blur-xl text-emerald-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-10 bg-white">
                      <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-emerald-600 transition-colors">{p.title}</h4>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                        <MapPin size={18} className="text-emerald-600" /> {p.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'advisor' && (
          <section className="py-32 bg-emerald-950 min-h-[90vh] flex items-center page-transition overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-10">Instant Consultation</div>
                  <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-tight tracking-tighter shimmer-text-white">SMART FARM <br />ADVISOR.</h2>
                  <p className="text-emerald-100/60 text-xl leading-relaxed mb-16 font-medium max-w-lg">Get immediate expert feedback on grid connection costs, solar capacity, and industrial wiring requirements for your Nasarawa-based agro-business.</p>
                  
                  <div className="space-y-6">
                    {['Solar Cost Estimates', 'Grid Extension Planning', 'Transformer Load Analysis'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 glass-card-dark rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">0{idx+1}</div>
                        <span className="text-emerald-50 font-black uppercase tracking-widest text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[3.5rem] h-[750px] flex flex-col overflow-hidden border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.5)] bg-slate-900/40">
                  <div className="bg-emerald-600 p-10 flex items-center justify-between text-white shadow-xl relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse"><Zap size={28} /></div>
                      <div>
                        <h4 className="font-black text-2xl tracking-tight">AI ENGINEER</h4>
                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-100/70">Electrical Systems Advisor</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto p-10 space-y-8 bg-transparent custom-scrollbar">
                    {chatHistory.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-emerald-200/20 text-center italic p-10">
                        <Globe size={80} className="mb-8 opacity-5" />
                        <p className="text-lg font-medium">Hello. How can I assist with your farm's power infrastructure today?</p>
                      </div>
                    )}
                    {chatHistory.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-6 rounded-[2rem] max-w-[85%] shadow-2xl leading-relaxed text-sm font-medium ${
                          m.role === 'user' 
                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                            : 'bg-white/5 backdrop-blur-xl text-emerald-50 border border-white/10 rounded-tl-none'
                        }`}>
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {isAILoading && <div className="flex justify-start p-2"><Loader2 className="animate-spin text-emerald-400" size={32} /></div>}
                  </div>

                  <form onSubmit={handleAISubmit} className="p-8 bg-black/20 backdrop-blur-3xl border-t border-white/10 flex gap-4">
                    <input 
                      type="text" 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)} 
                      placeholder="Ask our engineer about farm power..." 
                      className="flex-grow bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 outline-none text-white focus:ring-2 focus:ring-emerald-500 placeholder:text-emerald-100/30 text-sm font-medium transition-all" 
                    />
                    <button 
                      disabled={isAILoading || !chatInput.trim()}
                      className="bg-emerald-500 text-white p-5 rounded-full hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/40 disabled:opacity-50 active:scale-90"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'contact' && (
          <section className="py-32 bg-slate-50 page-transition">
            <div className="max-w-5xl mx-auto px-4">
              <div className="glass-card rounded-[4rem] p-16 md:p-24 shadow-[0_30px_100px_rgba(0,0,0,0.08)] relative overflow-hidden bg-white">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
                
                <div className="text-center mb-20">
                  <h3 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter shimmer-text">GET A QUOTE.</h3>
                  <p className="text-slate-500 mt-6 text-xl font-medium">Professional surveys and technical quotes within 24 hours.</p>
                </div>

                <form className="space-y-12 max-w-3xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block px-2">Full Identity</label>
                      <input type="text" placeholder="Full Name" className="w-full bg-slate-100 border-none rounded-3xl p-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block px-2">Direct Line</label>
                      <input type="tel" placeholder="Phone Number" className="w-full bg-slate-100 border-none rounded-3xl p-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block px-2">Project Region</label>
                      <select className="w-full bg-slate-100 border-none rounded-3xl p-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700">
                        <option>Lafia (HQ)</option>
                        <option>Keffi</option>
                        <option>Akwanga</option>
                        <option>Karu / Mararaba</option>
                        <option>Doma / Obi</option>
                        <option>Nasarawa Eggon</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block px-2">Service Type</label>
                      <select className="w-full bg-slate-100 border-none rounded-3xl p-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700">
                        <option>Pole Supply & Install</option>
                        <option>Solar Farm Setup</option>
                        <option>Grid Extension</option>
                        <option>Maintenance Contract</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 block px-2">Project Brief</label>
                    <textarea rows={6} placeholder="Tell us about your infrastructure needs..." className="w-full bg-slate-100 border-none rounded-[2.5rem] p-8 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"></textarea>
                  </div>

                  <button className="w-full bg-emerald-600 text-white font-black py-7 rounded-[2.5rem] text-sm uppercase tracking-[0.3em] hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-emerald-200">
                    Submit Proposal Request
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {renderFooter()}
    </div>
  );
}
