import React from "react";
import LogoutButton from "../../components/Global/LogoutButton";
import { Link } from "react-router-dom";
import { PRODUCT_MANAGEMENT } from "../../constants/AppUrls";
import {
  Container,
  Card,
  Title,
  Text,
  Button,
  Group,
  Flex,
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

        <Group position="center" mt="md">
          <Button component={Link} to={PRODUCT_MANAGEMENT} variant="light" color="blue">
            Go to Product Management
          </Button>
        </Group>
      </Card>
    </Container>
  )
};

export default Dashboard;
