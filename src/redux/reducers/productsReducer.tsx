import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
  ADD_MORE_PRODUCTS,
  FILTER_TABLE,
} from '../actions/productActions';

interface Product {
  id: number;
  [key: string]: any;
}

interface Action {
  type: string;
  payload: any;
}

interface State {
  products: Product[];
  filteredProducts: Product[];
  lastSearchQuery: string;
}

const initialState: State = {
  products: [],
  filteredProducts: [],
  lastSearchQuery: '',
};

const filterTable = (data: Product[], filters: { [key: string]: string }): Product[] => {
  return data.filter((row) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      if (typeof filters[key] === 'undefined') return true;
      return row[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toString().toLowerCase());
    });
  });
};

const productsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case FILTER_TABLE:
      return {
        ...state,
        filteredProducts: filterTable(state.products, action.payload),
      };
    case FILTER_PRODUCTS:
      const filteredProducts = state.products.filter((product) => {
        return Object.keys(action.payload).every((filterColumn) => {
          const filterValue = action.payload[filterColumn];
          if (filterValue === "") {
            return true;
          }
          return String(product[filterColumn])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        });
      });

      return {
        ...state,
        filteredProducts,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        filteredProducts: [...state.filteredProducts, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        filteredProducts: state.filteredProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
        filteredProducts: state.filteredProducts.filter((product) => product.id !== action.payload),
      };
    case ADD_MORE_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        filteredProducts: [...state.filteredProducts, ...action.payload],
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
        lastSearchQuery: action.payload.lastSearchQuery,
      };
    case SORT_PRODUCTS:
      const { column, direction } = action.payload;
      const sortedProducts = state.filteredProducts.slice().sort((a, b) => {
        if (a[column] < b[column]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[column] > b[column]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      return {
        ...state,
        filteredProducts: sortedProducts,
      };
    default:
      return state;
  }
};

export default productsReducer;
