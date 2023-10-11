import React, { useState, useRef } from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Box, Button, Image, useToast } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { postOrder } from '../../api';

function Basket() {
    const [address, setAddress] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const toast = useToast()
    const { items, removeFromBasket, emptyBasket } = useBasket();
    const total = items.reduce((acc, obj) => acc + obj.price, 0)




    const handleSubmitForm = async () => {
        const itemIds = items.map((item) => item._id)
        const input = {
            address,
            items: JSON.stringify(itemIds),
        }

        await postOrder(input);

        emptyBasket();
        onClose();
        toast({
            title: 'Order confirmed',
            description: "We've confirmed your order for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
    return (
        <Box p={5}>
            {items.length < 1 && <Alert status='warning'>You have not any items in your basket</Alert>}

            {
                items.length > 0 && (
                    <>
                        <ul>
                            {
                                items.map((item) => (
                                    <li key={item._id} style={{ marginBottom: 15 }}>
                                        <Link to={`/product/${item._id}`}>{item.title}-{item.price}TL
                                            <Image htmlWidth={200} src={item.photos[0]} alt='basket item' loading='lazy'></Image>
                                        </Link>

                                        <Button mt={2} size={'sm'} colorScheme='pink' onClick={() => { removeFromBasket(item._id) }}>
                                            Remove from basket
                                        </Button>
                                    </li>
                                ))
                            }
                        </ul>
                        <Box mt={10}>
                            Total: {total}TL
                        </Box>

                        <Button onClick={() => {
                            onOpen()
                        }} mt={2} size={'sm'} colorScheme='green'>
                            Order
                        </Button>
                        <Modal
                            isCentered
                            initialFocusRef={initialRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay
                                bg='blackAlpha.300'
                                backdropFilter='blur(10px) hue-rotate(90deg)'
                            />
                            <ModalContent>
                                <ModalHeader>Order</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Adress</FormLabel>
                                        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} resize={'none'} ref={initialRef} placeholder='Enter adress' />
                                    </FormControl>

                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={() => handleSubmitForm() } colorScheme='blue' mr={3}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                )
            }
        </Box>
    )
}

export default Basket