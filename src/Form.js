import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <label className='checkbox'>
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const CustomForm = () => {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}

            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2, 'Minimum two symbols!')
                    .required('Required!'),
                email: Yup.string()
                    .email('Invalid email adress!')
                    .required('Required!'),
                amount: Yup.number()
                    .min(5, 'At least 5')
                    .required('Required!'),
                currency: Yup.string().required('Choose a currency!'),
                text: Yup.string()
                    .min(10, 'At least 10 symbols'),
                terms: Yup.boolean()
                    .required('Consent is required!')
                    .oneOf([true], 'Consent is required!')
                    
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null , 2))}
        >
            <Form className="form">
                <h2>Send a donation</h2>
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"/>
                
                <MyTextInput 
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"/>

                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>

                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Choose a currency</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                
                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>

                <MyCheckbox 
                    name="terms">
                        Do you agree with the privacy policy?
                </MyCheckbox>
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;