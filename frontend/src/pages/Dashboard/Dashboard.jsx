import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/AppUrls";


import {
  Container,
  Card,
  Title,
  Text,
  Button,
  Group,
  Flex,
  Stack,
} from "@mantine/core";

const Dashboard = () => {
  return (
    <Container size="sm" mt="xl">
      <Flex align="center" mb="md">
        <Title order={2}>Dashboard</Title>
      </Flex>

      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Text size="lg" mb="md">
          Welcome to your dashboard! Here you can manage your products and settings.
        </Text>

        <Stack position="center" mt="md">
          <Button component={Link} to={ROUTES.PRODUCT_MANAGEMENT} variant="light" color="blue">
            Go to Product Management
          </Button>
          <Button component={Link} to={ROUTES.PROMOTION_MANAGEMENT} variant="light" color="blue">
            Go to Promotion Management
          </Button>
          <Button component={Link} to={ROUTES.ORDER_LIST} variant="light" color="blue">
            Go to Order Management
          </Button>
        </Stack>
      </Card>
    </Container>
  )
};

export default Dashboard;
