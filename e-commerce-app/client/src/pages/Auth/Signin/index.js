import React from 'react'
import { Heading, FormControl, FormLabel, Flex, Button, Box, Input, FormHelperText, Alert } from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchLogin } from '../../../api'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";


function Signin() {
  const {login} = useAuth();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({email: values.email, password: values.password});
        login(loginResponse)
        navigate('/')
        formik.resetForm()
      } catch (e) {
        bag.setErrors({general: e.response.data.message})
      }
      
    }
  })

  return (
    <div>
      <Flex align={'center'} width={'full'} justifyContent={'center'}>
        <Box pt={'10'}>
          <Box textAlign={'center'} >
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign={'left'}>
            <form onSubmit={formik.handleSubmit} >
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}
                  value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} autoFocus />
                
                {
                  formik.touched.email && formik.errors.email ? (
                    <FormHelperText >{formik.errors.email}</FormHelperText>
                  ) : null
                }
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input name='password' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur}
                  value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />

                {
                  formik.touched.password && formik.errors.password ? (
                    <FormHelperText >{formik.errors.password}</FormHelperText>
                  ) : null
                }
              </FormControl>

              

              <Button mt={4} width={'full'} type='submit'>Sign In</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin