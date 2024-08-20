import React, { useState, useEffect, useCallback } from 'react';
import Aside from './aside';
import ProductGrid from './productGrid';
import scss from './productPage.module.scss'

function ProductPage({ sortBy }) {
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (currentFilters, currentSortBy, currentPage) => {
    try {
      const queryParams = new URLSearchParams({
        ...currentFilters,
        sortBy: currentSortBy,
        page: currentPage,
        limit: 12 // 每頁加載12個產品
      }).toString();
      const response = await fetch(`http://localhost:3005/api/prod?${queryParams}`);
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.productList);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters, sortBy, page);
  }, [filters, sortBy, page, fetchProducts]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
    setPage(1); // 重置頁碼到第一頁
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <div className={["row", scss.jcb].join(' ')}>
      <Aside className={'col-3'} onFilterChange={handleFilterChange} />
      <ProductGrid 
        className={'col-12'} 
        products={products}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductPage;