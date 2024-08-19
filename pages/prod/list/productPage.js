import React, { useState, useEffect, useCallback } from 'react';
import Aside from './aside';
import ProductGrid from './productGrid';
import scss from './productPage.module.scss'

function ProductPage({ sortBy }) {  // 接收 sortBy 作為 prop
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async (currentFilters, currentSortBy) => {
    try {
      const queryParams = new URLSearchParams({
        ...currentFilters,
        sortBy: currentSortBy
      }).toString();
      const response = await fetch(`http://localhost:3005/api/prod?${queryParams}`);
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.productList);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters, sortBy);
  }, [filters, sortBy, fetchProducts]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  return (
    <div className={["row", scss.jcb].join(' ')}>
      <Aside className={'col-3'} onFilterChange={handleFilterChange} />
      <ProductGrid 
        className={'col-9'} 
        filteredProducts={products} 
      />
    </div>
  );
}

export default ProductPage;