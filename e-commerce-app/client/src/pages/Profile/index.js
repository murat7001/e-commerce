import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Box, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useBasket } from '../../contexts/BasketContext';

function Profile({history}) {
    const {user, logout} = useAuth();
    const { emptyBasket } = useBasket();
    const navigate = useNavigate();

    const handleLogout = async () => {
      logout(() => {
        emptyBasket()
        navigate('/')
      });
    }
  return (
    <Box textAlign={'center'}>
        <Heading   fontSize={'20px'}>Profile</Heading>    
        
        <Box mt={2}>
            Email: 
            {user && ' '+ user.email}
        </Box>

        <Button  mt={4} colorScheme='pink' onClick={handleLogout}>Logout</Button>
    </Box>
  )
}

export default Profile