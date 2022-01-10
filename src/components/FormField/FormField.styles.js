import styled from "styled-components";

export const Label = styled.label`
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Input = styled.input`
  padding: 5px 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightPurple};
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border-radius: 25px;
  width: 100%;
  &:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${Label} {
    margin: 10px 0;
  }
`;

export const SubmitButton = styled.button`
  margin: 10px 0;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 5px 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkGrey};
  background-color: ${({ theme }) => theme.colors.white};
`;
