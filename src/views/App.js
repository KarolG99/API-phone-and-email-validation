import EmailValidation from "../components/EmailValidation/EmailValidation";
import PhoneValidation from "../components/PhoneValidation/PhoneValidation";
import { StyledMain } from "./App.styles";
import { ThemeProvider } from "styled-components";
import { theme } from '../assets/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledMain>
        <PhoneValidation />
        <EmailValidation />
      </StyledMain>
    </ThemeProvider>
  );
}

export default App;
