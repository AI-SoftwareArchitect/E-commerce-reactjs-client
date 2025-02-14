import React, { useState } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';

const categories = [
  {
    name: "Elektronik",
    subcategories: ["Telefon", "Bilgisayar", "Tablet", "Televizyon", "Kamera", "Ses Sistemleri", "Aksesuarlar", "Oyun Konsolları"]
  },
  {
    name: "Moda",
    subcategories: ["Kadın Giyim", "Erkek Giyim", "Ayakkabı", "Aksesuar", "Çanta", "Saat", "Spor Giyim", "Gözlük"]
  },
  {
    name: "Ev & Yaşam",
    subcategories: ["Mobilya", "Dekorasyon", "Mutfak", "Banyo", "Bahçe", "Aydınlatma", "Ev Tekstili", "Temizlik Ürünleri"]
  },
  {
    name: "Spor & Outdoor",
    subcategories: ["Koşu", "Fitness", "Kamp", "Bisiklet", "Dağcılık", "Yüzme", "Tenis", "Futbol"]
  },
  {
    name: "Kozmetik",
    subcategories: ["Makyaj", "Parfüm", "Cilt Bakımı", "Saç Bakımı", "Erkek Bakım", "Aromaterapi", "Güneş Koruma", "Doğal Ürünler"]
  }
];

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
      <div className="text-2xl font-bold text-blue-600">TrendyNavbar</div>
      
      <div className="flex items-center space-x-6 mt-2 md:mt-0">
        <div className="relative">
          <input type="text" placeholder="Ara..." className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>

      <ul className="flex space-x-6 mt-2 md:mt-0">
        {categories.map((category, index) => (
          <li
            key={index}
            className="relative group"
          >
            <button className="text-blue-600 hover:text-blue-800 font-medium">{category.name}</button>
            <ul className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
              {category.subcategories.map((sub, subIndex) => (
                <li key={subIndex} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  {sub}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
        <FaUser size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
