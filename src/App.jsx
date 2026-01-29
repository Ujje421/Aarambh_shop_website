import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './firebase-config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { MapPin, Instagram, MessageCircle, Menu, Clock, Search, X, Star } from 'lucide-react';

// --- IMAGES ---
const interiorImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800",
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"
];

const instaPosts = [
  { id: 1, url: "https://www.instagram.com/aarambhcollection2025/p/DRKdlHEEptE/" },
  { id: 2, url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500" },
  { id: 3, url: "https://images.unsplash.com/photo-1539109132314-d4959a80370d?w=500" },
  { id: 4, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed w-full z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-white/70 backdrop-blur-xl border-b border-gray-100">
    <h1 className="text-xl md:text-2xl font-serif tracking-tighter font-black uppercase">
      Aarambh <span className="font-light text-amber-700 italic not-uppercase tracking-normal">Collection</span>
    </h1>
    <div className="hidden md:flex gap-8 uppercase text-[10px] tracking-[0.3em] font-bold">
      <a href="#gallery" className="hover:text-amber-700 transition-colors">Catalog</a>
      <a href="#style" className="hover:text-amber-700 transition-colors">Style Feed</a>
      <a href="#visit" className="hover:text-amber-700 transition-colors">Find Us</a>
    </div>
    <div className="flex items-center gap-4">
      <a href="https://www.instagram.com/aarambhcollection2025?igsh=amppZnppbzd5MnAz" target="_blank" rel="noreferrer" className="hover:text-amber-700 transition-all hover:scale-110">
        <Instagram size={18} />
      </a>
      <Menu className="md:hidden cursor-pointer" />
    </div>
  </nav>
);

const InstagramFeed = () => (
  <section id="style" className="py-24 bg-white px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-serif italic mb-2">Follow Our Style</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Latest looks on Instagram</p>
        </div>
        <a href="https://www.instagram.com/aarambhcollection2025?igsh=amppZnppbzd5MnAz" target="_blank" rel="noreferrer" className="text-amber-700 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-amber-700/30 pb-1">
          @aarambhcollection2025
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instaPosts.map((post) => (
          <motion.div key={post.id} whileHover={{ y: -10 }} className="aspect-square rounded-xl overflow-hidden shadow-lg group relative">
            <img src={post.url} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" alt="Instagram Style" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white" size={24} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const VisitUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 10 && hour < 21);
    };
    checkStatus();
    const timer = setInterval(() => setCurrentImg(p => (p + 1) % interiorImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="visit" className="bg-[#111] text-white py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border ${isOpen ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'} text-[10px] font-bold uppercase tracking-widest`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            {isOpen ? 'Store is Open' : 'Store is Closed'}
          </div>
          <h2 className="text-5xl font-serif mb-8 italic leading-tight">Visit Our Store</h2>
          <div className="space-y-10 border-l border-white/10 pl-8">
            <div className="flex gap-5">
              <MapPin className="text-amber-600 shrink-0" size={24} />
              <p className="text-lg font-light text-gray-300">Shop no. 1, Mundada Market, Aarambh Collection,<br/>Main Rd, Nashik, Maharashtra 422001</p>
            </div>
            <div className="flex gap-5">
              <Clock className="text-amber-600 shrink-0" size={24} />
              <div>
                <p className="text-lg font-light text-gray-300">Mon - Sat: 10:30 AM - 9:00 PM</p>
                <p className="text-amber-600 text-xs uppercase mt-2 font-bold tracking-widest underline underline-offset-4">Sunday: Open until 8 PM</p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="relative h-[550px] w-full bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img key={currentImg} src={interiorImages[currentImg]} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2 text-amber-500">Boutique Interior</p>
            <h3 className="text-2xl font-serif italic text-white">Experience Quality in Person.</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const categories = ['All', 'Tops', 'Jeans', 'Leggings', 'Kids Wear', 'Dresses'];

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = products
    .filter(p => filter === 'All' || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[#FAF9F6] text-[#1a1a1a] antialiased selection:bg-amber-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="z-10 text-center px-4">
          <span className="uppercase tracking-[0.5em] text-[10px] mb-6 block text-amber-700 font-bold">The New Standard of Nashik Fashion</span>
          <h2 className="text-6xl md:text-[110px] font-serif mb-8 text-gray-900 leading-[0.8] tracking-tighter">
            Elegance <br/> <span className="italic font-light text-gray-400">Perfected</span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <motion.a href="#gallery" whileHover={{ scale: 1.05 }} className="bg-black text-white px-12 py-4 uppercase text-[10px] tracking-widest font-bold shadow-2xl">
              Browse Store
            </motion.a>
            <div className="flex gap-8 text-gray-400">
              {/* <div className="text-center">
                <p className="text-black font-serif text-xl italic"></p>
                <p className="text-[8px] uppercase tracking-widest"></p>
              </div> */}
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-black font-serif text-xl italic">4.9</p>
                <p className="text-[8px] uppercase tracking-widest">Rating</p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] bg-amber-50/60 rounded-full blur-[120px] -z-0" />
      </section>

      {/* Catalog Section */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-serif italic">Our Gallery</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Find your perfect fit</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-700 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search styles..." 
                className="bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 text-xs w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                    filter === cat ? "bg-black text-white border-black shadow-lg" : "bg-white text-gray-400 border-gray-100 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((item, index) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.05 }} className="group">
                <div className="relative overflow-hidden aspect-[3/4] rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white/60 text-[9px] uppercase tracking-[0.3em] mb-4 font-bold">Nashik Exclusive</p>
                    <button onClick={() => window.open(`https://wa.me/918888230232?text=Inquiry: ${item.name}`)} className="bg-white text-black px-8 py-3 rounded-full uppercase text-[10px] font-black tracking-widest hover:bg-amber-100 transition-colors shadow-xl">
                      Inquire Price
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-[0.3em] text-amber-700 font-bold mb-1 opacity-70">{item.category}</p>
                    <h3 className="text-md font-serif italic text-gray-800 tracking-tight">{item.name}</h3>
                  </div>
                  <Star className="text-amber-500 fill-amber-500" size={12} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-serif italic">No styles found matching "{search}"</p>
          </div>
        )}
      </section>

      <InstagramFeed />
      <VisitUs />

      <footer className="bg-white py-20 px-6 border-t border-gray-100 text-center">
        <h2 className="text-2xl font-serif font-black uppercase tracking-tighter mb-4 italic">Aarambh Collection</h2>
        <div className="flex justify-center gap-6 mb-8 text-gray-400">
          <a href="https://www.instagram.com/aarambhcollection2025?igsh=amppZnppbzd5MnAz" target="_blank" rel="noreferrer" className="hover:text-amber-700 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/918888230232" target="_blank" rel="noreferrer" className="hover:text-amber-700 transition-colors">
            <MessageCircle size={20} />
          </a>
        </div>
        <p className="text-gray-400 text-[9px] uppercase tracking-[0.4em] font-medium">© 2026 Nashik, MH. Handcrafted Design.</p>
      </footer>

      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://wa.me/918888230232" target="_blank" className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl">
        <MessageCircle size={24} />
      </motion.a>
    </div>
  );
};

export default App;