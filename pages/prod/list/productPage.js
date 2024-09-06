import React, { useState, useEffect, useCallback } from 'react';
import Aside from './aside';
import ProductGrid from './productGrid';
import TagFilter from './tagFilter';
import scss from './productPage.module.scss';

function ProductPage({ sortBy, searchTerm, filters, onFilterChange }) {
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState([]);

  const fetchProducts = useCallback(async (currentFilters, currentSortBy, currentPage, currentSearchTerm) => {
    try {
      console.log('Fetching products with:', { currentFilters, currentSortBy, currentPage, currentSearchTerm });
      const queryParams = new URLSearchParams({
        ...currentFilters,
        sortBy: currentSortBy,
        page: currentPage,
        limit: 12,
        search: currentSearchTerm
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

  const fetchTags = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3005/api/prod/filter-options');
      const data = await response.json();
      if (data.status === "success" && data.filterOptions.tags) {
        setTags(data.filterOptions.tags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }, []);
  
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    setPage(1);
    fetchProducts(filters, sortBy, 1, searchTerm);
  }, [filters, sortBy, searchTerm, fetchProducts]);

  useEffect(() => {
    fetchProducts(filters, sortBy, page, searchTerm);
  }, [page, filters, sortBy, searchTerm, fetchProducts]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleTagChange = useCallback((tag) => {
    onFilterChange({ tag });
  }, [onFilterChange]);

  return (
    <div className={["row", scss.jcb].join(' ')}>
      <Aside 
        className={'col-3'} 
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <div className="col-lg-9">
        <TagFilter 
          tags={tags} 
          selectedTag={filters.tag} 
          onTagChange={handleTagChange}
        />
        <ProductGrid
          products={products}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );

}

export default ProductPage;