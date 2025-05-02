import { useEffect, useState } from 'react';
import {
  Table,
  Title,
  Loader,
  Button,
  Modal,
  List,
  Text,
  ScrollArea,
} from '@mantine/core';
import { getOrders } from '../../services/orderService';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    getOrders()
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpened(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpened(false);
  };

  if (loading) return <Loader size="xl" />;

  return (
    <div>
      <Title mb="md">Orders</Title>

      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Subtotal</Table.Th>
            <Table.Th>Discount</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                No orders available
              </Table.Td>
            </Table.Tr>
          ) : (
            orders.map(order => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.customerName}</Table.Td>
                <Table.Td>{order.subtotal}</Table.Td>
                <Table.Td>{order.totalDiscount}</Table.Td>
                <Table.Td>{order.total}</Table.Td>
                <Table.Td>
                  <Button size="xs" onClick={() => openModal(order)}>
                    View Items
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      {/* Modal for Order Items */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={`Order Items for ${selectedOrder?.customerName}`}
        size="lg"
        centered
      >
        {selectedOrder?.items?.length ? (
          <ScrollArea h={300}>
            <Table striped highlightOnHover withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product Name</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Unit Price</Table.Th>
                  <Table.Th>Discount</Table.Th>
                  <Table.Th>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedOrder.items.map((item, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td>{item.productName}</Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>{item.unitPrice}</Table.Td>
                    <Table.Td>{item.discount}</Table.Td>
                    <Table.Td>
                      {(item.quantity * item.unitPrice - item.discount).toFixed(2)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        ) : (
          <Text>No items found for this order.</Text>
        )}
      </Modal>
    </div>
  );
};

export default OrderList;
