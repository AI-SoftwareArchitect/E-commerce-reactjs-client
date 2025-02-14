import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import '../../styles/ProductForm.css';

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

const ProductForm = () => {
  const [product, setProduct] = useState({
    id: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    name: '',
    price: '',
    stockCount: '',
    star: '',
    sellerId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  });

  const [sellerIds, setSellerIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/sellers')
      .then(response => {
        console.log('Fetched Sellers:', response.data); // Log the fetched data
        if (Array.isArray(response.data)) {
          const ids = response.data.map(seller => seller.id);
          console.log('Seller IDs:', ids);
          setSellerIds(ids);
        } else {
          console.error('Invalid response format:', response.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
        setIsLoading(false);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const generateUUID = () => {
    const newUUID = uuidv4();
    setProduct({ ...product, id: newUUID });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Satıcı kimliğinin ayarlanıp ayarlanmadığını kontrol et
    console.log('Ürün Verileri:', product);
    
    if (!product.sellerId) {
      alert('Lütfen geçerli bir Satıcı Kimliği seçin.');
      return;
    }
  
    // Kategori ve alt kategori ID'lerini belirle
    const categoryId = categories.findIndex(cat => cat.name === product.category) + 1;
    const subcategoryId = categories.find(cat => cat.name === product.category).subcategories.indexOf(product.subcategory) + 1;
  
    // Cassandra tablosundaki sütun isimleriyle eşleşen veri nesnesi
    const productData = {
      id: product.id,
      brand: product.brand,
      sellerId: product.sellerId, // Satıcı kimliğinin doğru ayarlandığından emin olun
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      stock_count: parseInt(product.stockCount),
      star: parseInt(product.star),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt
    };
  
    // Gönderilecek veriyi doğrulamak için konsola yazdırın
    console.log('Gönderilecek Ürün Verileri:', productData);
  
    try {
      const response = await axios.post('http://localhost:3000/product/', productData);
      console.log('Ürün kaydedildi:', response.data);
      alert('Ürün başarıyla kaydedildi!');
      clearForm();
    } catch (error) {
      console.error('Ürün kaydedilirken hata oluştu:', error);
      alert('Ürün kaydedilirken bir hata oluştu!');
    }
  };
  
  
  const clearForm = () => {
    setProduct({
      id: '',
      brand: '',
      category: '',
      subcategory: '',
      description: '',
      name: '',
      price: '',
      stockCount: '',
      star: '',
      sellerId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    });
  };

  return (
    <div className="form-container">
      <h2>Ürün Ekleme Formu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>UUID:</label>
          <input type="text" name="id" value={product.id} readOnly />
          <button type="button" onClick={generateUUID}>UUID Oluştur</button>
        </div>
        <div className="form-group">
          <label>Marka:</label>
          <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Kategori:</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Alt Kategori:</label>
          <select name="subcategory" value={product.subcategory} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {product.category && categories.find(cat => cat.name === product.category).subcategories.map((subcat, index) => (
              <option key={index} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Ürün Adı:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Açıklama:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Fiyat:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Stok Adedi:</label>
          <input type="number" name="stockCount" value={product.stockCount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Yıldız:</label>
          <input type="number" name="star" value={product.star} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Satıcı ID:</label>
          <select name="sellerId" value={product.sellerId} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {isLoading ? (
              <option>Yükleniyor...</option>
            ) : (
              sellerIds.map((id, index) => (
                <option key={index} value={id}>{id}</option>
              ))
            )}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit">Kaydet</button>
          <button type="button" onClick={clearForm} className="clear-button">Temizle</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
