import styled from 'styled-components';
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #e6eff0;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 
    2px 4px 5px rgba(0, 0, 0, 0.1),
    inset 0px 0px 5px rgba(0, 0, 0, 0.1),
    inset 0px 0px 10px rgba(0, 0, 0, 0.1);
`;


export const ProductTitle = styled.h1`
 font-family: 'Inspiration', cursive;
  margin: 0 0 10px;
  font-size: 24px;
`;

export const ProductDescription = styled.p`
 font-family: 'Inspiration', cursive;
  font-size: 18px;
  text-align: center;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  padding: 10px;
  font-size: 16px;
`;

export const ProductDetailTitle = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin: 20px 0;
  border-radius: 5px;
`;
export const ProductImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

export const ProductImageThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: border 0.2s ease;

  &:hover {
    border: 2px solid #007bff;
  }
`;

