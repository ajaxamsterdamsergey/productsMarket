import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredProducts, selectLastSearchQuery } from '../../redux/selectors/productSelectors';
import ProductList, { ProductListProps } from '../ProductList/ProductList';
import SearchBar from '../SearchBar/SearchBar';

interface HomeProps {
  productListProps: ProductListProps;
}

const Home: React.FC<HomeProps> = ({ productListProps }) => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const lastSearchQuery = useSelector(selectLastSearchQuery);

  const productListPropsFromStore: ProductListProps = {
    products: filteredProducts,
    searchTerm: lastSearchQuery,
  };

  return (
    <div>
      <SearchBar />
      <ProductList {...productListPropsFromStore} />
    </div>
  );
};

export default Home;
