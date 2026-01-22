
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
  ExternalLink
} from 'lucide-react';
import { getAgroElectricAdvice } from './services/geminiService';
import { Service, Project, Message } from './types';

const SERVICES: Service[] = [
  {
    id: 'rural-electrification',
    title: 'Rural Electrification',
    description: 'Bringing reliable grid power to remote agricultural communities across Nasarawa.',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'solar-irrigation',
    title: 'Solar Irrigation Systems',
    description: 'Eco-friendly, cost-effective water pumping solutions for large-scale crop farming.',
    icon: 'sun',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'agro-processing',
    title: 'Industrial Agro-Processing',
    description: 'Heavy-duty electrical installations for rice mills, oil palm processing, and grain silos.',
    icon: 'factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'infrastructure',
    title: 'Pole & Grid Infrastructure',
    description: 'Supply and installation of high-quality electric poles and transformer substations.',
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

  // Scroll to top on page change
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
      <div className="bg-emerald-900 text-emerald-50 py-2 px-4 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone size={14} /> +234 800 NASARAW-E</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@nasarawaelectric.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> Head Office: Lafia Road, Nasarawa State
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => navTo('home')} className="flex items-center gap-3 group">
              <div className="bg-emerald-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <Zap className="text-white" size={24} />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-slate-900 leading-none">NASARAW ELECTRIC</h1>
                <p className="text-[10px] tracking-widest text-emerald-600 font-bold uppercase">Agro-Electric Specialists</p>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {(['home', 'services', 'projects', 'advisor'] as Page[]).map((p) => (
                <button 
                  key={p} 
                  onClick={() => navTo(p)}
                  className={`capitalize font-semibold transition-all hover:text-emerald-600 ${currentPage === p ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600'}`}
                >
                  {p === 'advisor' ? 'AI Advisor' : p}
                </button>
              ))}
              <button 
                onClick={() => navTo('contact')}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                Request Quote
              </button>
            </nav>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 py-6 px-4 space-y-4 animate-page-in">
            {(['home', 'services', 'projects', 'advisor', 'contact'] as Page[]).map((p) => (
              <button 
                key={p} 
                onClick={() => navTo(p)}
                className={`block w-full text-left p-3 rounded-xl capitalize font-bold ${currentPage === p ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600'}`}
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
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white leading-none">NASARAW ELECTRIC</h1>
                <p className="text-[10px] tracking-widest text-emerald-400 font-bold uppercase">Agro-Electric Specialists</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-xs">
              Dedicated to improving agricultural yields in Nasarawa State through innovative electrical infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm shimmer-text">Company</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => navTo('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => navTo('services')} className="hover:text-emerald-400 transition-colors">Services</button></li>
              <li><button onClick={() => navTo('projects')} className="hover:text-emerald-400 transition-colors">Impact Projects</button></li>
              <li><button onClick={() => navTo('advisor')} className="hover:text-emerald-400 transition-colors">AI Advisor</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm shimmer-text">Solutions</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Rural Grid Connection</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Solar Pumping Systems</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Transformer Maintenance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm shimmer-text">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full outline-none focus:border-emerald-500" />
              <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <p>© 2024 Nasarawa Electric Pole Company. All rights reserved.</p>
            <p className="text-emerald-500/80 lowercase italic flex items-center gap-1">
              <ExternalLink size={12} /> Powered by Premegage Tech solution
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {renderHeader()}

      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-page-in">
            {/* Hero */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2041" className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-600/20 text-emerald-300 font-bold text-sm mb-6 backdrop-blur-md border border-emerald-500/30">Pioneering Nasarawa</span>
                  <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight shimmer-text-white">
                    Powering the <br />Agro-Revolution
                  </h2>
                  <p className="text-xl text-slate-200 mb-10 leading-relaxed">Infrastructure designed for the modern Nigerian farmer. Sustainable, reliable, and innovative.</p>
                  <button onClick={() => navTo('services')} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-emerald-700 transition-all hover:scale-105 shadow-xl shadow-emerald-900/20">
                    Discover Services <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { l: 'Poles Planted', v: '12,500' },
                  { l: 'Energy Saving', v: '35%' },
                  { l: 'Rural LGAs', v: '13' },
                  { l: 'Satisfaction', v: '99%' },
                ].map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-4xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{s.v}</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'services' && (
          <section className="py-24 animate-page-in">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">Our Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 shimmer-text">Agro-Electric Solutions</h3>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">We provide the high-voltage muscle for Nasarawa's growing agricultural industry.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                {SERVICES.map((s) => (
                  <div key={s.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-[450px]">
                    <img src={s.image} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={s.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent group-hover:from-emerald-950/90 group-hover:via-emerald-900/40 transition-colors"></div>
                    <div className="relative p-10 h-full flex flex-col justify-end group-hover:text-white">
                      <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl w-fit mb-6 group-hover:bg-white group-hover:text-emerald-900">
                        {s.icon === 'zap' ? <Zap /> : s.icon === 'sun' ? <Sun /> : s.icon === 'factory' ? <Factory /> : <Leaf />}
                      </div>
                      <h4 className="text-3xl font-bold mb-4">{s.title}</h4>
                      <p className="text-slate-500 group-hover:text-emerald-100 leading-relaxed max-w-md">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'projects' && (
          <section className="py-24 animate-page-in">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 shimmer-text">Featured Impact</h3>
                  <p className="text-slate-500 mt-4 text-lg">Delivering reliable power where it matters most.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-transform">
                    <div className="relative h-72 overflow-hidden">
                      <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                      <div className="absolute top-6 left-6">
                        <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">{p.title}</h4>
                      <p className="text-slate-500 flex items-center gap-2"><MapPin size={16} /> {p.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentPage === 'advisor' && (
          <section className="py-24 bg-emerald-950 min-h-[90vh] flex items-center animate-page-in overflow-hidden relative">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-emerald-400 font-black text-4xl md:text-6xl mb-8 leading-tight shimmer-text-white">Smart Farm Consultation</h2>
                  <p className="text-emerald-100/60 text-xl leading-relaxed mb-12">Ask our AI Advisor any question about electrification for your farm, mill, or processing plant in Nasarawa.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Solar Costs', 'Pole Installation', 'Transformer Specs', 'Pump Power'].map(t => (
                      <div key={t} className="glass-card-dark p-4 rounded-2xl text-emerald-200 font-bold text-sm border border-emerald-500/20">{t}</div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[3rem] h-[650px] flex flex-col overflow-hidden border border-white/10 shadow-2xl">
                  <div className="bg-emerald-600/50 backdrop-blur-md p-8 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse"><Leaf /></div>
                    <div>
                      <h4 className="font-black text-xl">Agro-Electric AI</h4>
                      <p className="text-xs text-emerald-100/70">Expert Advisor for Nasarawa Electric Pole</p>
                    </div>
                  </div>
                  <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-transparent">
                    {chatHistory.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-emerald-200/30 text-center italic">
                        <Zap size={64} className="mb-4 opacity-10" />
                        <p>Waiting for your agro-electric inquiry...</p>
                      </div>
                    )}
                    {chatHistory.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-5 rounded-3xl max-w-[85%] shadow-lg ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white/10 backdrop-blur text-emerald-50 border border-white/5 rounded-tl-none'}`}>
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {isAILoading && <div className="flex justify-start"><Loader2 className="animate-spin text-emerald-400" /></div>}
                  </div>
                  <form onSubmit={handleAISubmit} className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10 flex gap-3">
                    <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type your agro-electric question..." className="flex-grow bg-white/10 border border-white/10 rounded-2xl px-6 outline-none text-white focus:ring-2 focus:ring-emerald-500" />
                    <button className="bg-emerald-500 text-white p-4 rounded-2xl hover:bg-emerald-400 transition-all"><Send /></button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'contact' && (
          <section className="py-24 animate-page-in">
            <div className="max-w-4xl mx-auto px-4">
              <div className="glass-card rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32"></div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 shimmer-text">Get a Quote</h3>
                <p className="text-slate-500 mb-12 text-lg">Leave your details and our Nasarawa team will call you within 24 hours.</p>
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-emerald-600">Full Name</label>
                      <input type="text" className="w-full bg-slate-100/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-emerald-600">Phone</label>
                      <input type="tel" className="w-full bg-slate-100/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-emerald-600">LGA Location</label>
                    <select className="w-full bg-slate-100/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                      <option>Lafia</option><option>Keffi</option><option>Akwanga</option><option>Karu</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-emerald-600">Your Project Brief</label>
                    <textarea rows={5} className="w-full bg-slate-100/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"></textarea>
                  </div>
                  <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 hover:scale-[1.02] transition-all shadow-xl shadow-emerald-200">
                    Send Proposal Request
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
