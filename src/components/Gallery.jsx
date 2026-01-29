import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Dresses', 'Tops', 'Jeans', 'Leggings', 'Kids Wear'];

  const filtered = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="py-20 px-6">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full border transition-all ${
              activeTab === tab ? "bg-black text-white" : "border-gray-200 text-gray-600 hover:border-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* The Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/5]">
                <img src={item.image} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                   <button 
                     onClick={() => window.open(`https://wa.me/91XXXXXXXXXX?text=Hi, I am interested in ${item.name}`)}
                     className="bg-white text-black px-4 py-2 text-sm font-bold rounded-lg"
                   >
                     Ask Price
                   </button>
                </div>
              </div>
              <h3 className="mt-3 font-medium">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};