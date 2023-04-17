import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import {
ProductContainer,
ProductTitle,
ProductDescription,
ProductDetails,
ProductDetail,
ProductDetailTitle,
ProductImage,
ProductImageThumbnail,
ProductImagesContainer
} from './Product.styled';

interface ProductData {
title: string;
description: string;
price: number;
discountPercentage: number;
rating: number;
stock: number;
brand: string;
category: string;
images: string[];
}

const Product = () => {
const { id } = useParams<{ id: string }>();
const [product, setProduct] = useState<ProductData | null>(null);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data: ProductData) => {
      setProduct(data);
    });
}, [id]);

useEffect(() => {
if (product) {
setSelectedImage(product.images[0]);
}
}, [product]);

if (!product) {
return <Loader/>;
}

return (
<ProductContainer>
<ProductTitle>{product.title}</ProductTitle>
<ProductImage src={selectedImage ?? undefined} alt={product.title} />

<ProductImagesContainer>
{product.images.map((image, index) => (
<ProductImageThumbnail
key={index}
src={image}
alt={product.title}
onClick={() => setSelectedImage(image)}
/>
))}
</ProductImagesContainer>
<ProductDescription>{product.description}</ProductDescription>
<ProductDetails>
<ProductDetail>
<ProductDetailTitle>Price</ProductDetailTitle>
${product.price}
</ProductDetail>
<ProductDetail>
<ProductDetailTitle>Discount</ProductDetailTitle>
{product.discountPercentage}%
</ProductDetail>
<ProductDetail>
<ProductDetailTitle>Rating</ProductDetailTitle>
{product.rating}
</ProductDetail>
<ProductDetail>
<ProductDetailTitle>Stock</ProductDetailTitle>
{product.stock}
</ProductDetail>
<ProductDetail>
<ProductDetailTitle>Brand</ProductDetailTitle>
{product.brand}
</ProductDetail>
<ProductDetail>
<ProductDetailTitle>Category</ProductDetailTitle>
{product.category}
</ProductDetail>
</ProductDetails>
</ProductContainer>
);
};

export default Product;