import styled from 'styled-components';

export const ViewWrapper = styled.div`
  margin: 25px;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 500px;
  padding: 16px 20px;
  border-radius: 25px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
`;