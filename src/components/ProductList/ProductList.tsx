import React, { useState, useEffect } from "react";
import { addMoreProducts } from "../../redux/actions/productActions";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";
import  ButtonInfo  from "../ButtonInfo/ButtonInfo";
import Loader from "../Loader/Loader";

import { Button } from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  sortProducts,
  setProducts,
} from "../../redux/actions/productActions";
import { FaSort } from "react-icons/fa";
import {
  StyledTable,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  WrapperButtons,
} from "./ProductList.styled";
import {
  selectProducts,
  selectFilteredProducts,
  selectLastSearchQuery,
} from "../../redux/selectors/productSelectors";

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  category: string;
}
export interface ProductListProps {
  products: Product[];
  searchTerm: string;
}
interface Filters {
  [key: string]: string;
}

const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

const fetchProducts = async (
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: ReturnType<typeof useDispatch>,
  skip: number,
  limit: number = 10
) => {
  setIsLoad(true);
  try {
    const response = await fetch(
      `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    );
    const data = await response.json();
    dispatch(setProducts(data.products));
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setIsLoad(false);
  }
};

type ProductKey = keyof Product;

const filterTable = (data: Product[], filters: Filters[]): Product[] => {
  return data.filter((row) => {
    return filters.every((filter) => {
      return Object.entries(filter).every(([key, value]) => {
        if (!value) return true;

        const productKey = key as ProductKey;
        const rowValue = row[productKey];

        if (typeof rowValue === "string") {
          return rowValue.toLowerCase().includes(value.toLowerCase());
        } else if (typeof rowValue === "number") {
          return String(rowValue).includes(value);
        } else if (Array.isArray(rowValue)) {
          return rowValue.some((item) =>
            item.toLowerCase().includes(value.toLowerCase())
          );
        }

        return false;
      });
    });
  });
};



const ProductList: React.FC<ProductListProps> = () => {
  const [skip, setSkip] = useState<number>(0);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const lastSearchQuery = useSelector(selectLastSearchQuery);
  const [activeSort, setActiveSort] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({});
  const [finalFiltered, setfinalFiltered] = useState<Product[]>([]);
  const [searchQuery] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!searchAttempted && products.length === 0) {
      setSearchAttempted(true);
      fetchProducts(setIsLoad, dispatch, 0);
    }
  }, [dispatch, products, searchAttempted]);

  useEffect(() => {
    setfinalFiltered(filteredProducts);
  }, [filteredProducts]);
useEffect(() => {
}, [finalFiltered]);
  useEffect(() => {
  let sortedProducts = [...filteredProducts];
  if (sortColumn) {
    sortedProducts.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  }
  setfinalFiltered(sortedProducts);
}, [filteredProducts, sortColumn, sortDirection]);


  const handleDelete = (id: number) => {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      toast.success(
        `Успіх! Товар ${data.title} з id ${id} видалено \u{1F44D}`
      );
      dispatch(deleteProduct(id));
      setfinalFiltered(finalFiltered.filter((product) => product.id !== id));
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
};


  const handleSort = (column: string) => {
    setActiveSort(column);
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    dispatch(sortProducts(column, direction));
  };

  const handleFilterChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  columnName: string
) => {
  const newFilters = {
    ...filters,
    [columnName]: e.target.value,
  };

  for (const key in newFilters) {
    if (!newFilters[key]) {
      delete newFilters[key];
    }
  }

  setFilters(newFilters);
  const updatedFilters = Object.keys(newFilters).reduce<Array<{ [key: string]: string }>>(
    (acc, key) => {
      if (newFilters[key]) {
        acc.push({ [key]: newFilters[key] });
      }
      return acc;
    },
    []
  );
  const finalFilteredTable = searchQuery.length
    ? filterTable(filteredProducts, [...updatedFilters, newFilters]).filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          String(product.id).includes(searchQuery)
      )
    : filterTable(filteredProducts, updatedFilters);
    setfinalFiltered(finalFilteredTable);
    
};


  const loadMore = async () => {
    const newSkip = skip + 10;
    setSkip(newSkip);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?skip=${newSkip}&limit=10`
      );
      const data = await response.json();
      dispatch(addMoreProducts(data.products));
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return (
      <>
          {isLoad && <Loader />}
        <StyledTable>
              <thead>
                                   <IconContext.Provider
            value={{
              size: '0.8em',
              className: 'global-class-name',
            }}
          >   
                <tr>
                    <th>
                          ID
                          <StyledInputWrapper>
                              <StyledInput onChange={(e) => handleFilterChange(e, "id")} />
                                  <StyledButton
                                      active={activeSort === "id"} 
                                      onClick={() => handleSort("id")}>
                                  <FaSort />
                                  </StyledButton>
                        </StyledInputWrapper>
                    </th>
                    <th>
                          Назва
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "title")} />
                                  <StyledButton
                                    active={activeSort === "title"}  
                                    onClick={() => handleSort("title")}><FaSort /></StyledButton>
                         </StyledInputWrapper>
                    </th>
                    <th>
                          Опис
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "description")} />
                                  <StyledButton
                                      active={activeSort === "description"} 
                                      onClick={() => handleSort("description")}><FaSort /></StyledButton>
                        </StyledInputWrapper>
                      </th>
                    <th>
                              Фото
                               <StyledInputWrapper>
                              <StyledInput disabled/>
                              <StyledButton disabled><FaSort /></StyledButton>
                    </StyledInputWrapper>
                    </th>
                    <th>
                          Ціна
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "price")} />
                                  <StyledButton
                                      active={activeSort === "price"} 
                                      onClick={() => handleSort("price")}><FaSort /></StyledButton>
                    </StyledInputWrapper>
                      </th>
                    <th>
                          Рейтинг
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "rating")} />
                                  <StyledButton
                                      active={activeSort === "rating"} 
                                      onClick={() => handleSort("rating")}><FaSort /></StyledButton>
                         </StyledInputWrapper>
                      </th>
                    <th>
                          Сток
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "stock")} />
                                  <StyledButton
                                      active={activeSort === "stock"}
                                      onClick={() => handleSort("stock")}><FaSort /></StyledButton>
                              </StyledInputWrapper>
                    </th>
                    <th>
                          Категорія
                          <StyledInputWrapper>
                        <StyledInput onChange={(e) => handleFilterChange(e, "category")} />
                                  <StyledButton
                                      active={activeSort === "category"}
                                      onClick={() => handleSort("category")}><FaSort /></StyledButton>
                              </StyledInputWrapper>
                    </th>
                    <th style={{ width: "8%" }}></th>
                  </tr>
                  </IconContext.Provider>
            </thead>
            <tbody>
                {finalFiltered && Array.isArray(finalFiltered) && finalFiltered.length > 0 ? (
                    finalFiltered.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                                <img
                                    src={
                                        product.images && product.images.length > 0
                                            ? product.images[0]
                                            : "https://i.dummyjson.com/data/products/2/1.jpg"
                                    }
                                    alt={product.title}
                                />
                            </td>
                            <td>{product.price}</td>
                            <td>{product.rating}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>
                                <WrapperButtons>
  <ButtonDelete onClick={() => handleDelete(product.id)} />

  <ButtonInfo
    to={`/${product.id}`}
    id={product.id}
   // onClick={() => handleInfoClick(product.id)} // добавьте обработчик onClick
  />
</WrapperButtons>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr></tr>
                )}
            </tbody>
          </StyledTable>
          {finalFiltered.length > 0 && lastSearchQuery.length ===0 &&
        isEmpty(filters) &&  (
              <Button onClick={loadMore}>Load more...</Button>)}
          <ToastContainer />
    </>
);

};

export default ProductList;
