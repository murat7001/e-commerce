import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteProduct, fetchProductList } from '../../../api';
import { Popconfirm, Table } from 'antd'
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
function Products() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductList);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      console.log('succes')
      queryClient.invalidateQueries('admin:products')
    }
  })

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}><Button p={2} colorScheme='green'>Edit</Button></Link>
            <Popconfirm title='Ae you sure?' onConfirm={() => { deleteMutation.mutate(record._id) }} okText='Yes' cancelText='No' placement='left'><Button ml={2} p={2} colorScheme='red'>Delete</Button></Popconfirm>
          </>
        ),
      },
    ];
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error{error}</div>
  }

  return (
    <div>
      <Box display={'flex'} justifyContent={'space-between'} fontSize={'2xl'} p={'5'}>Products
        <Link to={'/admin/products/new'}>
          <Button>Add Product</Button> 
        </Link>
      </Box>

      <Table dataSource={data} columns={columns} rowKey={'_id'} />
    </div>
  )
}

export default Products