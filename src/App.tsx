import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { NotFound } from './components/NotFound/NotFound';
import { Box } from './Box';
import { GlobalStyle } from './GlobalStyle';

const ProductForm = lazy(() => import('./components/ProductForm/ProductForm'));
const Product = lazy(() => import('./components/Product/Product'));
const Home = lazy(() => import('./components/Home/Home'));

const App = () => {
  const layoutProps = { gridTemplateRows: "60px 1fr" };

  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout {...layoutProps} />}>
          <Route
            index
            element={<Home productListProps={{ products: [], searchTerm: "" }} />}
          />
          <Route path="productForm" element={<ProductForm />} />
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </Box>
  );
};

export default App;
