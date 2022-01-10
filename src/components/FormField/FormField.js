import { FormWrapper, Input, Label } from "./FormField.styles"

const FormField = ({ onChange, value, label, name, id, type = 'text', placeholder, ...props}) => {
    return (
        <FormWrapper>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} />
        </FormWrapper>
    )
}

export default FormField
