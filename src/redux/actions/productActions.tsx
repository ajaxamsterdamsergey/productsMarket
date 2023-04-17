export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const ADD_MORE_PRODUCTS = 'ADD_MORE_PRODUCTS';
export const FILTER_TABLE = 'FILTER_TABLE';

interface Product {
  id: number;
  [key: string]: any;
}

export const addMoreProducts = (products: Product[]) => ({
  type: ADD_MORE_PRODUCTS,
  payload: products,
});

export const filterTableAction = (query: { [key: string]: string }) => {
  console.log("query", query);
  return {
    type: FILTER_TABLE,
    payload: query
  };
};

export const filterProducts = (
  filters: { [key: string]: string },
  lastSearchQuery: string
) => {
  return async (dispatch: Function, getState: Function) => {
    const products: Product[] = getState().products;

    let filteredProducts: Product[] = products;

    if (lastSearchQuery) {
      filteredProducts = filteredProducts.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(lastSearchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(lastSearchQuery.toLowerCase())
      );
    }

    filteredProducts = filteredProducts.filter((product: Product) => {
      for (const column in filters) {
        const filterValue: string = filters[column].toLowerCase();
        const productValue: string = product[column]?.toString().toLowerCase();

        if (!productValue.includes(filterValue)) {
          return false;
        }
      }
      return true;
    });

    dispatch({
      type: SET_FILTERED_PRODUCTS,
      payload: filteredProducts,
    });
  };
};


export const addProduct = (product: Product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (product: Product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id: number) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const setProducts = (products: Product[]) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const sortProducts = (column: string, direction: string) => ({
  type: SORT_PRODUCTS,
  payload: { column, direction },
});

export const setFilteredProducts = (filteredProducts: Product[], lastSearchQuery: string) => ({
  type: SET_FILTERED_PRODUCTS,
  payload: { filteredProducts, lastSearchQuery },
});