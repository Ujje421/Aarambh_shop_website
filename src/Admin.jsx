import React, { useState } from 'react';
import { db, storage } from './firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Admin = () => {
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Tops' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a photo!");
    setLoading(true);

    try {
      // 1. Upload Photo
      const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      // 2. Save Details to Firestore
      await addDoc(collection(db, "products"), {
        ...formData,
        image: photoURL,
        createdAt: serverTimestamp()
      });

      alert("Uploaded successfully!");
      setFormData({ name: '', price: '', category: 'Tops' });
    } catch (err) {
      console.error(err);
      alert("Error uploading.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Add New Item</h2>
        
        <input type="text" placeholder="Product Name" className="w-full border p-3 rounded mb-4" 
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        
        <input type="text" placeholder="Price (e.g. ₹999)" className="w-full border p-3 rounded mb-4" 
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        
        <select className="w-full border p-3 rounded mb-4" 
          value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option>Tops</option><option>Jeans</option><option>Leggings</option><option>Kids Wear</option><option>Dresses</option>
        </select>

        <input type="file" className="mb-6 block w-full text-sm" onChange={(e) => setFile(e.target.files[0])} required />

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold">
          {loading ? "Uploading to Shop..." : "Upload Item"}
        </button>
      </form>
    </div>
  );
};

export default Admin;