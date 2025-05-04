import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Box,
  Center,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { authActions } from './../../store/reducers/authReducer';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import { API } from '../../api/endpoints';

const MotionBox = motion.create(Box);


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      identifier: "",
      password: "",
    },
    validate: {
      identifier: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid identifier address",
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(API.AUTH.LOGIN, values, {
        withCredentials: true,
      }); // adjust if needed
      if (response.data?.status === 200) {
        dispatch(
          authActions.signin({
            user: response.data.user,
            modules: response.data.modules,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      style={{
        background:
          'linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size={420}>
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Center>
            <Title align="center" order={2} fw={700} c="white">
              Welcome Back 👋
            </Title>
          </Center>
          <Text c="white" size="sm" align="center" mt="xs">
            Enter your credentials to access the dashboard.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" bg="white">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  label="Email or Username"
                  placeholder="you@manush.com"
                  {...form.getInputProps('identifier')}
                  radius="md"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps('password')}
                  radius="md"
                />
              </Stack>
              <Button fullWidth mt="xl" type="submit" radius="md">
                Sign In
              </Button>
            </form>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default SignIn;
