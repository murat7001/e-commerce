import React from 'react'
import { fetchOrders } from '../../../api'
import { useQuery } from 'react-query'
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

function Orders() {
  const { isLoading, isError, data, error } = useQuery('admin:orders', fetchOrders);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error{error}</div>
  }


  return (
    <div>
      <Text fontSize={'2xl'} p={5}>Orders</Text>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th isNumeric>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.user.email}</Td>
                  <Td>{item.adress}</Td>
                  <Td isNumeric>{item.items.length}</Td>
                </Tr>
              ))
            }
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Orders