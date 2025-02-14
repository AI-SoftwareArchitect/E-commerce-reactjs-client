import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    selectedCategory: '',
    selectedSize: '',
    selectedStars: null,
    priceRange: [0, 1000],
  });

  // API'den ürünleri ve session bilgisini al
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('http://localhost:3000/product/');
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSession = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:3000/session/', { withCredentials: true });
        setSessionUser(sessionResponse.data.user);
      } catch (error) {
        console.error('Session bilgisi alınamadı:', error);
      }
    };

    fetchProducts();
    fetchSession();
  }, []);

  // Ürünleri filtrele
  const filteredProducts = products.filter((product) => {
    return (
      (filters.selectedCategory === '' ||
        product.category.toLowerCase() === filters.selectedCategory.toLowerCase()) &&
      (filters.selectedSize === '' || product.size === filters.selectedSize) &&
      (filters.selectedStars === null || product.rating >= filters.selectedStars) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <p className="text-2xl font-semibold text-gray-700">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-blue-50 min-h-screen p-6">
        {/* Filtre Bölümü */}
        <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filtreler</h2>

          {/* Kategori Seçimi */}
          <label className="block text-gray-700 font-medium mb-1">Kategori</label>
          <select
            className="w-full p-2 border rounded-md mb-4"
            value={filters.selectedCategory}
            onChange={(e) => setFilters({ ...filters, selectedCategory: e.target.value })}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Moda">Moda</option>
            <option value="Ev">Ev</option>
            <option value="Spor">Spor</option>
          </select>

          {/* Beden Seçimi */}
          <label className="block text-gray-700 font-medium mb-1">Beden</label>
          <select
            className="w-full p-2 border rounded-md mb-4"
            value={filters.selectedSize}
            onChange={(e) => setFilters({ ...filters, selectedSize: e.target.value })}
          >
            <option value="">Tüm Bedenler</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          {/* Fiyat Aralığı */}
          <label className="block text-gray-700 font-medium mb-1">Fiyat Aralığı</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            className="w-full mb-4"
            onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
          />
          <p className="text-gray-600 text-sm">{filters.priceRange[1]} TL'ye kadar</p>

          {/* Yıldız Derecesi */}
          <label className="block text-gray-700 font-medium mb-1">Puan</label>
          <div className="flex space-x-2 mb-4">
            {[3, 4, 5].map((star) => (
              <button
                key={star}
                className={`p-2 border rounded-md ${filters.selectedStars === star ? 'bg-yellow-400' : ''}`}
                onClick={() => setFilters({ ...filters, selectedStars: star })}
              >
                ⭐ {star}+
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Listesi */}
        <motion.div
          className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h3 className="font-bold text-lg text-gray-800 mt-2">{product.name}</h3>
                <p className="text-gray-600 font-semibold">{product.price} TL</p>
                <p className="text-yellow-500">⭐ {product.rating}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-600">
              Ürün bulunamadı!
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
