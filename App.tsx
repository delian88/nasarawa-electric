
import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { getAgroElectricAdvice } from './services/geminiService';
import { Service, Project, Message } from './types';

const SERVICES: Service[] = [
  {
    id: 'rural-electrification',
    title: 'Rural Electrification',
    description: 'Bringing reliable grid power to remote agricultural communities across Nasarawa.',
    icon: 'zap',
    image: 'https://picsum.photos/seed/elec1/800/600'
  },
  {
    id: 'solar-irrigation',
    title: 'Solar Irrigation Systems',
    description: 'Eco-friendly, cost-effective water pumping solutions for large-scale crop farming.',
    icon: 'sun',
    image: 'https://picsum.photos/seed/elec2/800/600'
  },
  {
    id: 'agro-processing',
    title: 'Industrial Agro-Processing',
    description: 'Heavy-duty electrical installations for rice mills, oil palm processing, and grain silos.',
    icon: 'factory',
    image: 'https://picsum.photos/seed/elec3/800/600'
  },
  {
    id: 'infrastructure',
    title: 'Pole & Grid Infrastructure',
    description: 'Supply and installation of high-quality electric poles and transformer substations.',
    icon: 'leaf',
    image: 'https://picsum.photos/seed/elec4/800/600'
  }
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lafia Mega Farm Grid Connect',
    location: 'Lafia, Nasarawa',
    category: 'Rural Electrification',
    imageUrl: 'https://picsum.photos/seed/proj1/600/400'
  },
  {
    id: '2',
    title: 'Keffi Solar Pumping Hub',
    location: 'Keffi, Nasarawa',
    category: 'Renewable Energy',
    imageUrl: 'https://picsum.photos/seed/proj2/600/400'
  },
  {
    id: '3',
    title: 'Akwanga Rice Mill Powerhouse',
    location: 'Akwanga, Nasarawa',
    category: 'Industrial',
    imageUrl: 'https://picsum.photos/seed/proj3/600/400'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isAILoading, setIsAILoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-emerald-50 py-2 px-4 text-sm hidden md:block">
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">NASARAW ELECTRIC</h1>
                <p className="text-[10px] tracking-widest text-emerald-600 font-bold uppercase">Agro-Electric Specialists</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</a>
              <a href="#services" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Services</a>
              <a href="#projects" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Projects</a>
              <a href="#advisor" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">AI Advisor</a>
              <a href="#contact" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                Request Quote
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">Home</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">Services</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">Projects</a>
            <a href="#advisor" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 font-medium">AI Advisor</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold text-center">Contact Us</a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2041" 
              className="w-full h-full object-cover" 
              alt="Agricultural field with power lines" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-600/20 text-emerald-400 font-semibold text-sm mb-6 backdrop-blur-md border border-emerald-500/30">
                Pioneering Agro-Electric in Nigeria
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Powering Nasarawa's <br /> 
                <span className="text-emerald-400 underline decoration-emerald-500/30">Agricultural Future</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed">
                Nasarawa Electric Pole provides specialized electrical infrastructure to farms, processing mills, and rural communities, ensuring sustainable productivity across the Middle Belt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#services" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                  Our Services <ArrowRight size={20} />
                </a>
                <a href="#contact" className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Poles Installed', value: '5,000+' },
                { label: 'Farms Powered', value: '250+' },
                { label: 'Communities Connected', value: '45+' },
                { label: 'Clean Energy (MW)', value: '15.5' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Comprehensive Agro-Electric Solutions</h3>
              <p className="text-slate-600 text-lg">We bridge the gap between agricultural potential and modern energy needs with specialized electrical infrastructure.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service) => (
                <div key={service.id} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-emerald-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl w-fit mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {service.icon === 'zap' && <Zap size={28} />}
                      {service.icon === 'sun' && <Sun size={28} />}
                      {service.icon === 'factory' && <Factory size={28} />}
                      {service.icon === 'leaf' && <Leaf size={28} />}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                    <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
                    <a href="#" className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all group/link">
                      Learn More <ChevronRight size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-3">Recent Impacts</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Empowering Local Projects</h3>
              </div>
              <a href="#" className="text-emerald-600 font-bold flex items-center gap-2 border-b-2 border-emerald-600/20 pb-1 hover:border-emerald-600 transition-all">
                View All Case Studies
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">{project.title}</h4>
                  <p className="flex items-center gap-2 text-slate-500">
                    <MapPin size={16} /> {project.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Advisor Section */}
        <section id="advisor" className="py-24 bg-emerald-950 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Smart Consultation</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                  Meet our <span className="text-emerald-400">Agro-Electric</span> AI Advisor
                </h3>
                <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed">
                  Got questions about powering your farm? Ask our expert AI advisor about rural grid connection, solar capacity for your crops, or irrigation pump wiring. 
                </p>
                <div className="space-y-6">
                  {[
                    "How many poles do I need for a 5-hectare farm?",
                    "What's the best solar setup for a rice mill?",
                    "Benefits of high-voltage agro-processing infrastructure."
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-4 text-emerald-200">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                        {i + 1}
                      </div>
                      <span className="italic">"{tip}"</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden h-[600px] flex flex-col border border-emerald-500/20">
                <div className="bg-emerald-600 p-6 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Leaf size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Agro-Electric Assistant</h4>
                      <p className="text-xs text-emerald-100">Always available to help</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase">Online</span>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-10">
                      <Zap size={48} className="mb-4 opacity-20" />
                      <p>Ask a question about farm electrification to get started!</p>
                    </div>
                  )}
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isAILoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                        <Loader2 className="animate-spin text-emerald-600" size={18} />
                        <span className="text-slate-400 text-sm italic">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAISubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-grow bg-slate-100 border-none rounded-xl px-4 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700"
                  />
                  <button 
                    disabled={isAILoading || !chatInput.trim()}
                    className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-600 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                 <Zap size={400} />
              </div>

              <div className="relative z-10 lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">Ready to Electrify Your Agro-Business?</h2>
                <p className="text-emerald-50 text-xl mb-12">Join hundreds of farmers in Nasarawa who have upgraded their productivity with our reliable power solutions.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Phone />
                    </div>
                    <div>
                      <p className="text-emerald-200 text-sm font-bold uppercase tracking-wider">Call Our Experts</p>
                      <p className="text-2xl font-bold">+234 800 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <MapPin />
                    </div>
                    <div>
                      <p className="text-emerald-200 text-sm font-bold uppercase tracking-wider">Visit Our HQ</p>
                      <p className="text-2xl font-bold">12 Lafia Central, Nasarawa</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 lg:w-1/2 w-full">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">Request a Free Survey</h3>
                  <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none" placeholder="+234..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">LGA in Nasarawa</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none">
                        <option>Lafia</option>
                        <option>Keffi</option>
                        <option>Akwanga</option>
                        <option>Nasarawa</option>
                        <option>Doma</option>
                        <option>Karu</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message / Service Needed</label>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200">
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
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
                Dedicated to improving agricultural yields in Nasarawa State through innovative electrical infrastructure and sustainable power solutions.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                    <div className="w-4 h-4 bg-current rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Our Services</a></li>
                <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Impact Projects</a></li>
                <li><a href="#advisor" className="hover:text-emerald-400 transition-colors">AI Advisor</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Our Services</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Rural Grid Connection</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Solar Pumping Systems</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Transformer Maintenance</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Farm Wiring</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Electric Pole Supply</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
              <p className="mb-6 text-sm">Stay updated with the latest in agro-electric tech and regional projects.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your Email" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full outline-none focus:border-emerald-500" />
                <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
            <div className="flex flex-col gap-1">
              <p>© 2024 Nasarawa Electric Pole Company. All rights reserved.</p>
              <p className="text-emerald-500/80 lowercase">Powered by Premegage Tech solution</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
