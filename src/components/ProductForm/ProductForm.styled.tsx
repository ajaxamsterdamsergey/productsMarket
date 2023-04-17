import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Label = styled.label`
 font-family: 'Inspiration', cursive;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled(Field)`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
`;

export const Button = styled.button`
  width: 50%;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  margin-bottom: 10px;
`;