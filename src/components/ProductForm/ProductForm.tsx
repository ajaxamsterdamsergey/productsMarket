import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/actions/productActions';
import { Formik, FormikHelpers,FormikState } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label, StyledForm, Input, Button } from './ProductForm.styled';


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Обов\'язкове поле'),
  description: Yup.string().required('Обов\'язкове поле'),
  price: Yup.number().required('Обов\'язкове поле').min(0, 'Ціна повинна бути не менше 0'),
  discountPercentage: Yup.number().required('Обов\'язкове поле').min(0, 'Знижка повинна бути не менше 0').max(100, 'Знижка не може бути більше 100'),
  rating: Yup.number().required('Обов\'язкове поле').min(0, 'Рейтинг повинен бути не менше 0').max(5, 'Рейтинг не може бути більше 5'),
  stock: Yup.number().required('Обов\'язкове поле').min(0, 'Запаси повинні бути не менше 0'),
  brand: Yup.string().required('Обов\'язкове поле'),
  category: Yup.string().required('Обов\'язкове поле'),
  thumbnail: Yup.string().url('Неправильний формат URL').required('Обов\'язкове поле'),
  images: Yup.array().of(Yup.string().url('Неправильний формат URL')).required('Обов\'язкове поле'),
  author: Yup.string().required('Обов\'язкове поле'),
  yearOfPublication: Yup.number().required('Обов\'язкове поле').min(1900, 'Рік видання повинен бути після 1900').max(2023,'Рік видання повинен бути до 2023'),
});
type ProductFormValues = {
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  author: string;
  yearOfPublication: string;
};
type FormikReset = {
  resetForm: (nextState?: Partial<FormikState<ProductFormValues>>) => void;
};
export const ProductForm = () => {
    const dispatch = useDispatch();
   
    const onHandleSubmit = async (
  values: ProductFormValues,
  { resetForm }: FormikReset,
) => {
    console.log('values', values);

    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const newProduct = await response.json();
      toast.success("Успіх! Товар додано \u{1F44D}");
      dispatch(addProduct(newProduct));
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

    return (
        <div>
        <Formik initialValues={{
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            rating: '',
            stock: '',
            brand: '',
            category: '',
            thumbnail: '',
            images: [''],
            author: '',
            yearOfPublication: '',
        }}
            validationSchema={validationSchema}
          onSubmit={(values, { resetForm }: FormikHelpers<ProductFormValues> & FormikReset) => {
  onHandleSubmit(values, { resetForm });
}}

      >
            {props => (
                
                <StyledForm>
          <Label htmlFor="author">Автор:</Label>
      <Input
        type="text"
        id="author"
        name="author"
         value={props.values.author}
      />
                    {props.touched.author && props.errors.author ? <div>{props.errors.author}</div> : null}
     <Label htmlFor="yearOfPublication">Рік:</Label>
      <Input
        type="number"
        id="yearOfPublication"
        name="yearOfPublication"
         value={props.values.yearOfPublication}
      />
                    {props.touched.yearOfPublication && props.errors.yearOfPublication ? <div>{props.errors.yearOfPublication}</div> : null}
                    
      <Label htmlFor="title">Назва:</Label>
      <Input
        type="text"
        id="title"
        name="title"
         value={props.values.title}
      />
      {props.touched.title && props.errors.title ? <div>{props.errors.title}</div> : null}

      <Label htmlFor="description">Опис:</Label>
      <Input
        type="text"
        id="description"
        name="description"
         value={props.values.description}
      />
      {props.touched.description && props.errors.description ? <div>{props.errors.description}</div> : null}

      <Label htmlFor="price">Ціна:</Label>
          <Input
              type="number"
              id="price"
              name="price"
               value={props.values.price}
      />
      {props.touched.price && props.errors.price ? <div>{props.errors.price}</div> : null}

      <Label htmlFor="discountPercentage">Знижка (у відсотках):</Label>
      <Input
        type="number"
        id="discountPercentage"
        name="discountPercentage"
         value={props.values.discountPercentage}
      />
      {props.touched.discountPercentage && props.errors.discountPercentage ? <div>{props.errors.discountPercentage}</div> : null}

      <Label htmlFor="rating">Рейтинг:</Label>
      <Input
        type="number"
        id="rating"
        name="rating"
         value={props.values.rating}
      />
      {props.touched.rating && props.errors.rating ? <div>{props.errors.rating}</div> : null}

      <Label htmlFor="stock">Запаси:</Label>
      <Input
        type="number"
        id="stock"
        name="stock"
         value={props.values.stock}
      />
      {props.touched.stock && props.errors.stock ? <div>{props.errors.stock}</div> : null}

      <Label htmlFor="brand">Бренд:</Label>
      <Input
        type="text"
        id="brand"
        name="brand"
        value={props.values.brand}
      />
      {props.touched.brand && props.errors.brand ? <div>{props.errors.brand}</div> : null}

      <Label htmlFor="category">Категорія:</Label>
      <Input
        type="text"
        id="category"
        name="category"
         value={props.values.category}
      />
      {props.touched.category && props.errors.category ? <div>{props.errors.category}</div> : null}

      <Label htmlFor="thumbnail">Невеличке зображення:</Label>
      <Input
        type="url"
        id="thumbnail"
        name="thumbnail"
         value={props.values.thumbnail}
      />
      {props.touched.thumbnail && props.errors.thumbnail ? <div>{props.errors.thumbnail}</div> : null}

      <Label htmlFor="images">Зображення:</Label>
      {props.values.images.map((image, index) => (
        <div key={index}>
              <Input
            style={{ width: "100%" }}
            type="url"
            id={`images.${index}`}
            name={`images.${index}`}
            value={image}
          />
          {props.touched.images && props.errors.images ? <div>{props.errors.images[index]}</div> : null}
        </div>
      ))}
      <Button type="button" onClick={() => props.setFieldValue("images", [...props.values.images, ""])}>Додати зображення</Button>

      <Button type="submit">Додати товар</Button>
                </StyledForm>
            )} 
            
            </Formik>
            <ToastContainer />
            </div>
  );
};

export default ProductForm;
