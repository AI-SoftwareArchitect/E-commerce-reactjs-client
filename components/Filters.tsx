import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { FaStar } from 'react-icons/fa';

const categories = ['Mavi', 'U.S. Polo Assn.', 'Avva', 'Defacto', 'Koton'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Filters: React.FC<{ setFilters: Function }> = ({ setFilters }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleStarClick = (stars: number) => {
    setSelectedStars(stars);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSize('');
    setSelectedStars(null);
    setPriceRange([0, 1000]);
  };

  const applyFilters = () => {
    setFilters({
      selectedCategory,
      selectedSize,
      selectedStars,
      priceRange
    });
  };

  return (
    <div className="w-1/4 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Filtreler</h2>
      <button className="text-red-500 mb-4" onClick={clearFilters}>Filtreleri Kaldır</button>
      <div>
        <h3 className="font-semibold text-gray-700">Marka</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mt-2">
            <input 
              type="radio" 
              name="category" 
              value={category} 
              onChange={() => setSelectedCategory(category)}
              className="mr-2"
            /> {category}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">Beden</h3>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mt-2">
            <input 
              type="radio" 
              name="size" 
              value={size} 
              onChange={() => setSelectedSize(size)}
              className="mr-2"
            /> {size}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">Fiyat Aralığı</h3>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <div className="flex justify-between text-gray-600">
          <span>{priceRange[0]} TL</span>
          <span>{priceRange[1]} TL</span>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">Yıldız Sayısı</h3>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar
              key={star}
              className={`cursor-pointer ${selectedStars && star <= selectedStars ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
      </div>
      <button 
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={applyFilters}
      >
        Filtrele
      </button>
    </div>
  );
};

export default Filters;
