import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { authActions } from './../../store/reducers/authReducer';
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`, values); // adjust if needed
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
    <Container size={420} my={40}>
      <Title align="center">Welcome Back</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Identifier"
              placeholder="you@manush.com"
              {...form.getInputProps("identifier")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
          </Stack>
          <Button fullWidth mt="xl" type="submit">
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
