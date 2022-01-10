import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import { SubmitButton } from "../FormField/FormField.styles";
import {
  InfoContents,
  InfoHeading,
  InfoWrapper,
  StyledSmall,
} from "../ShowInfo/ShowInfo";
import { ViewWrapper } from "../ViewWrapper/ViewWrapper";

const initialFormState = {
  emailAdress: "",
};

const API_KEY = process.env.REACT_APP_ABSTRACT_EMAIL_API_KEY;

const EmailValidation = () => {
  let email;
  const [formValues, setFormValues] = useState(initialFormState);
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const GetUrl = (email, API_KEY) => {
    let url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`;
    return url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email = formValues.emailAdress;

    fetch(GetUrl(email, API_KEY))
      .then((response) => response.json())
      .then((data) => setInfo(data))
      .catch(error);

    setIsLoading(true);
  };

  useEffect(() => {
    if (Object.keys(info).length > 0) {
      setIsLoading(false);
    }
  }, [Object.keys(info).length])

  const error = (err) => {
    console.log(err);
  };

  return (
    <ViewWrapper>
      <form onSubmit={handleSubmit}>
        <h2>Sprawdź informacje o adresie email</h2>
        <FormField
          label="Podaj adres email"
          id="emailAdress"
          name="emailAdress"
          type="email"
          value={formValues.emailAdress}
          onChange={handleInputChange}
          placeholder="email"
        />
        <SubmitButton type="submit">Sprawdź</SubmitButton>
      </form>

      <div>
        {isLoading ? <p>Ładowanie...</p> : <></>}

        {Object.keys(info).length ? (
            <InfoWrapper>
              <InfoHeading>Email:</InfoHeading>
              <InfoContents>{info?.email}</InfoContents>

              <InfoHeading>Dostarczalność:</InfoHeading>
              <InfoContents>{info?.deliverability}</InfoContents>

              <InfoHeading>Punkty jakości(0.01-0.99):</InfoHeading>
              <InfoContents>{info?.quality_score}</InfoContents>

              <InfoHeading>Darmowy email:</InfoHeading>
              <InfoContents>
                {info?.is_free_email?.value === true ? "Tak" : "Nie"}
              </InfoContents>

              <InfoHeading>Indywidualny:</InfoHeading>
              <InfoContents>
                {info?.is_role_email?.value === false ? "Tak" : "Nie"}
              </InfoContents>

              <InfoHeading>Catch all email:</InfoHeading>
              <InfoContents>
                {info?.is_catchall_email?.value === true ? "Tak" : "Nie"}
              </InfoContents>

              <InfoHeading>SMTP:</InfoHeading>
              <InfoContents>
                {info?.is_smtp_valid?.value === true ? "Tak" : "Nie"}
              </InfoContents>
              <StyledSmall>
                <small>
                  Jeżeli SMTP zwróciło wartość 'Nie' lub jeśli w mailu jest
                  literówka niektóre wartości mogą nie być miarodajne.
                </small>
              </StyledSmall>
            </InfoWrapper>
        ) : (
          <p>Nie mam żadnych informacji</p>
        )}
      </div>
    </ViewWrapper>
  );
};

export default EmailValidation;
