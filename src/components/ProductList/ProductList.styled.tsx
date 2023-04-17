import styled, { css } from 'styled-components';
interface StyledButtonProps {
  active?: boolean;
}
export const WrapperButtons = styled.div`
 display: flex;
`;
export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  width: 100%;
  table-layout: fixed;
  white-space: nowrap;
  overflow-x: auto;

  th,
  td {
    text-align: left;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background-color: #f2f2f2;
    font-weight: 700;
    text-transform: uppercase;
    color: #333333;
    width: 13%;
  }

  td img {
    max-width: 100px;
    max-height: 100px;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #e8f4ff;
  }
`;
export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
`;
export const StyledInput = styled.input`
  /* flex: 1; */
  width: 100px;
  font-size: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border-radius: 3px;
  border: 1px solid #ced4da;
  background-position: 5px center;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: #b4d4cc;
  color: #fff;
  border: 1px solid #b4d4cc;
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  right: 10%;

  margin-left: 8px;

  &:hover {
    background-color: #80c4b3;
    border-color: #80c4b3;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #5baeaf;
      color: #fff;
    `}
`;













