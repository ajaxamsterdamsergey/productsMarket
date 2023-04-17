import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProducts } from '../../redux/actions/productActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { IconContext } from 'react-icons';
import { FcSearch } from 'react-icons/fc';
import { Formik, Field } from 'formik';
import { Header, SearchForm, Button, Input } from './SearchBar.styled';
import { selectProducts } from '../../redux/selectors/productSelectors';
type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

const SearchBar: React.FC = () => {
const dispatch = useDispatch();
const [filter, setFilter] = useLocalStorage<string>('filter', '');
const products = useSelector(selectProducts);
const [localProducts, setLocalProducts] = useState<Product[]>([]);

useEffect(() => {
const fetchProducts = async () => {
const response = await fetch('https://dummyjson.com/products?skip=0&limit=110');
const data = await response.json();
setLocalProducts(data.products);
};
fetchProducts();
}, []);

const handleSearch = (searchTerm: string) => {
if (searchTerm === undefined) {
return;
}
if (searchTerm === '') {
setFilter(searchTerm);
dispatch(setFilteredProducts(products, searchTerm));
} else {
const filteredProducts = localProducts.filter((product) =>
product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
product.category.toLowerCase().includes(searchTerm.toLowerCase())
);
setFilter(searchTerm);
dispatch(setFilteredProducts(filteredProducts, searchTerm));
}
};

const handleSearch2 = useCallback(
(searchTerm: string) => {
if (searchTerm === '') {
dispatch(setFilteredProducts(products, searchTerm));
} else {
const filteredProducts = localProducts.filter((product) =>
product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
product.category.toLowerCase().includes(searchTerm.toLowerCase())
);
dispatch(setFilteredProducts(filteredProducts, searchTerm));
}
},
[dispatch, localProducts, products]
);

useEffect(() => {
handleSearch2(filter);
}, [filter, handleSearch2]);

return (
<Header>
<Formik
initialValues={{ filter: '' }}
onSubmit={(values, event) => handleSearch(values.filter)}
>
<SearchForm>
<IconContext.Provider
value={{
size: '1.6em',
className: 'global-class-name',
}}
>
<Button type="submit" onClick={(e) => { e.preventDefault() }}>
<FcSearch />
</Button>
</IconContext.Provider>
<Field
as={Input}
type="text"
name="filter"
placeholder="Пошук за назвою або категорією"
onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
value={filter}
onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
if (event.key === 'Enter') {
event.preventDefault();
}
}}
/>
</SearchForm>
</Formik>
</Header>
);
};

export default SearchBar;