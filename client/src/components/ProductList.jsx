import { useEffect, useState } from 'react';
import './ProductList.css';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Demo data in case backend is empty
    const demoProducts = [
      { id: '1', name: 'Smartphone Pro', description: 'Última tecnología en tus manos', price: 999.99, imageUrl: 'https://placehold.co/600x400/6366f1/FFF?text=Phone' },
      { id: '2', name: 'Laptop Ultra', description: 'Potencia para profesionales', price: 1499.50, imageUrl: 'https://placehold.co/600x400/ec4899/FFF?text=Laptop' },
      { id: '3', name: 'Auriculares Noise-Cancel', description: 'Sonido inmersivo', price: 299.00, imageUrl: 'https://placehold.co/600x400/10b981/FFF?text=Audio' },
      { id: '4', name: 'Smartwatch Fit', description: 'Tu salud bajo control', price: 199.99, imageUrl: 'https://placehold.co/600x400/f59e0b/FFF?text=Watch' },
    ];

    fetch('http://localhost:5073/api/product')
      .then(response => {
        if (!response.ok) throw new Error('Error de red');
        return response.json();
      })
      .then(data => {
        // If backend has no data, show demo data for "Maqueta" visualization
        setProducts(data.length > 0 ? data : demoProducts);
        setLoading(false);
      })
      .catch(error => {
        console.warn("Backend no disponible o error, cargando datos demo:", error);
        setProducts(demoProducts); // Fallback to demo data for UI presentation
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="product-list-container">
      <div className="section-header">
        <h2>Destacados de Temporada</h2>
        <p>Encuentra los mejores productos seleccionados para ti</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {/* Fallback image if not present */}
              <img src={product.imageUrl || `https://placehold.co/600x400?text=${product.name.substring(0, 3)}`} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price.toLocaleString()}</span>
                <button className="btn-primary">Ver Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
