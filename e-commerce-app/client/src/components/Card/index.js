import React from 'react'
import { Button, Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useBasket } from '../../../src/contexts/BasketContext';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';


function Card({item}) {
    const{addToBasket, items} = useBasket()
    const { loggedIn } = useAuth();
    const findBasketItem = items.find((basket_item) => basket_item._id === item._id)
    const navigate = useNavigate();

    return (
    <Box _hover={{
        boxShadow:'outline',
        color: "teal.500",
      }} transition='all .4s ease' boxShadow='lg'  p='6' rounded='md' borderWidth="1px" borderRadius="lg" overflow="hidden" padding="3">
        <Link to={`/product/${item._id}`}>
            <Image  rounded='md' src={item.photos[0]} alt='product' loading='lazy' />

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                </Box>

                <Box mt="1" fontWeight='semibold' as='h4' lineHeight="tight">
                    {item.title}
                </Box>

                <Box>
                    {item.price}
                </Box>
            </Box>
        </Link>
        <Button colorScheme={findBasketItem ? 'pink':'green'} onClick={() => loggedIn ? addToBasket(item, findBasketItem): navigate('/signin')}>
            {
                findBasketItem ? 'Remove from basket':'Add to basket'
            }
        </Button>
    </Box>
  )
}

export default Card