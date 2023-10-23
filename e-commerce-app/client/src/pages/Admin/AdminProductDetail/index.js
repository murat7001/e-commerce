import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../../api';
import { useQuery } from 'react-query'
import { FieldArray, Formik } from 'formik'
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

function AdminProductDetail() {
  const { product_id } = useParams();
  const { isLoading, isError, data, error } = useQuery(['admin:product', product_id], () => fetchProduct(product_id));


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error{error}</div>
  }

  const handleSubmit = () => {
    console.log('submitted')
  }
  return (
    <div>
      <Text fontSize={'2xl'}>Edit</Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos
        }}
        validate={values => {

        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,

        }) => (
          <>
            <Box>
              <Box my={5} textAlign={'left'}>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} disabled={isSubmitting}></Input>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Description</FormLabel>
                    <Textarea name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} disabled={isSubmitting}></Textarea>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Price</FormLabel>
                    <Input name='price' onChange={handleChange} onBlur={handleBlur} value={values.price} disabled={isSubmitting}></Input>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray name='photos' render={(arrayHelpers) => (
                      <div>
                        {values.photos && values.photos.map((photo, index) => (
                          <div key={index}>
                            <Input width={'3xl'} mt={1} name={`photos.${index}`} value={photo} disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur}/>

                            <Button ml={4} type={'button'} colorScheme='red' onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}></FieldArray>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </>

        )}
      </Formik>
    </div>
  )
}

export default AdminProductDetail