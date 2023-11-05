import React from 'react'
import { FieldArray, Formik } from 'formik'
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import validationSchema from './validation'
import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query';
import { postProduct } from '../../../api';

function NewProduct() {
    const queryClient = useQueryClient();

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => {
            console.log('succes')
            queryClient.invalidateQueries('admin:products')
        }
    })

    const handleSubmit = async (values, bag) => {
        message.loading({ content: 'Loading...', key: 'product_add' });

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }
        newProductMutation.mutate(newValues, {
            onSuccess: () => {
                message.success({
                    content: 'The product added', key: 'product_add',
                    duration: 3,
                })
            }
        })

    }
    return (
        <div>
            <Text fontSize={'2xl'}>New Product</Text>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    price: "",
                    photos: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    errors,
                    touched,
                }) => (
                    <>
                        <Box>
                            <Box my={5} textAlign={'left'}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} disabled={isSubmitting} isInvalid={touched.title && errors.title}></Input>
                                    </FormControl>

                                    <FormControl mt={5}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} disabled={isSubmitting} isInvalid={touched.description && errors.description}></Textarea>
                                    </FormControl>

                                    <FormControl mt={5}>
                                        <FormLabel>Price</FormLabel>
                                        <Input name='price' onChange={handleChange} onBlur={handleBlur} value={values.price} disabled={isSubmitting} isInvalid={touched.price && errors.price}></Input>
                                    </FormControl>

                                    <FormControl mt={5}>
                                        <FormLabel>Photos</FormLabel>
                                        <FieldArray name='photos' isInvalid={touched.photos && errors.photos} render={(arrayHelpers) => (
                                            <div>
                                                {values.photos && values.photos.map((photo, index) => (
                                                    <div key={index}>
                                                        <Input width={'3xl'} mt={1} name={`photos.${index}`} value={photo} disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} />

                                                        <Button ml={4} type={'button'} colorScheme='red' onClick={() => arrayHelpers.remove(index)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}

                                                <Button mt={5} onClick={() => arrayHelpers.push('')} >Add a Photo</Button>

                                            </div>
                                        )}></FieldArray>
                                    </FormControl>

                                    <Button mt={4} width={'full'} type='submit' isLoading={isSubmitting}>
                                        Save
                                    </Button>

                                </form>
                            </Box>
                        </Box>
                    </>

                )}
            </Formik>
        </div>
    )
}

export default NewProduct