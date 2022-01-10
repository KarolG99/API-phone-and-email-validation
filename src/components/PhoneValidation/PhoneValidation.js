import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import { SubmitButton } from "../FormField/FormField.styles";
import { InfoContents, InfoHeading, InfoWrapper } from "../ShowInfo/ShowInfo";
import { ViewWrapper } from "../ViewWrapper/ViewWrapper";

const initialFormState = {
  phoneNumber: "",
};

const PhoneValidation = () => {
  let number = 0;
  const [formValues, setFormValues] = useState(initialFormState);
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const GetUrl = (number) => {
    let url = `https://phonevalidation.abstractapi.com/v1/?api_key=c6651e15db2b4f7b99638f75501ec946&phone=${number}`;
    return url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    number = formValues.phoneNumber;

    fetch(GetUrl(number))
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
        <h2>Sprawdź informacje o numerze</h2>
        <FormField
          label="Podaj numer (z prefiksem)"
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
          placeholder="numer z prefiksem"
        />
        <SubmitButton type="submit">Sprawdź</SubmitButton>
      </form>
      <div>
      {isLoading ? <p>Ładowanie...</p> : <></>}

        {Object.keys(info).length ? (
          <InfoWrapper>
            <InfoHeading>Numer tel:</InfoHeading>
            <InfoContents>{info?.phone}</InfoContents>

            <InfoHeading>Ważny:</InfoHeading>
            <InfoContents>{info?.valid ? "Tak" : "Nie"}</InfoContents>

            <InfoHeading>Kraj:</InfoHeading>
            <InfoContents>
              {info?.country?.name}, {info?.country?.code}
            </InfoContents>

            <InfoHeading>Lokalizacja:</InfoHeading>
            <InfoContents>{info?.location}</InfoContents>

            <InfoHeading>Operator:</InfoHeading>
            <InfoContents>{info?.carrier}</InfoContents>

            <InfoHeading>Typ:</InfoHeading>
            <InfoContents>
              {info?.type === "mobile" ? "komórka" : "stacjonarny lub nieznany"}
            </InfoContents>
          </InfoWrapper>
        ) : (
          <p>Nie mam żadnych informacji</p>
        )}
      </div>
    </ViewWrapper>
  );
};

export default PhoneValidation;
