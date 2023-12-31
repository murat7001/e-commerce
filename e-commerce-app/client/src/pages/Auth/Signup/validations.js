import *as yup from 'yup'

const validations = yup.object().shape({
    email: yup.string().email('Enter a valid email.').required('Required field.'),
    password: yup.string().min(5, 'The password must be at least 5 keys.').required('Required field.'),
    passwordConfirm : yup.string().min(5, 'The password must be at least 5 keys.').oneOf([yup.ref('password')], 'Passwords are different.').required('Required field.'),
});

export default validations;