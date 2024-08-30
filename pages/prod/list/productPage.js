import React, { useState, useEffect, useCallback } from 'react';
import Aside from './aside';
import ProductGrid from './productGrid';
import TagFilter from './tagFilter';
import scss from './productPage.module.scss';

function ProductPage({ sortBy, searchTerm }) {
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    tag: ''
  });
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState([]);

  const fetchProducts = useCallback(async (currentFilters, currentSortBy, currentPage, currentSearchTerm) => {
    try {
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
    fetchProducts(filters, sortBy, page, searchTerm);
  }, [filters, sortBy, page, searchTerm, fetchProducts]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);


  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleTagChange = useCallback((tag) => {
    console.log('Tag changed:', tag);
    setFilters(prevFilters => ({
      ...prevFilters,
      tag: prevFilters.tag === tag ? '' : tag
    }));
    setPage(1);
  }, []);

  console.log('ProductPage rendering. Current page:', page);

  return (
    <div className={["row", '', scss.jcb].join(' ')}>
      <Aside className={'col-3'} onFilterChange={handleFilterChange} />
      <div className="col-9">
        <TagFilter tags={tags} selectedTag={filters.tag} onTagChange={handleTagChange}/>
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