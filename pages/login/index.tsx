import Button from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
import Flex from "@/components/ui/flex";
import Input from "@/components/ui/input";
import InputContainer from "@/components/ui/input-container";
import { Label } from "@/components/ui/label";
import { Stack } from "@/components/ui/stack";
import Typography from "@/components/ui/typography";
import { useFormik } from "formik";
import { useLoginMutation } from "graphql/genenerated";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiCloset } from "react-icons/bi";
import { toast, useToast } from "react-toastify";
import { styled } from "stitches.config";
import { useAuth } from "utils/hooks/use-auth";
import { ROUTES } from "utils/routes";

const LoginContainer = styled("div", {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Login = () => {
  const { login, isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push(ROUTES.CARS);
    }
  }, [isAuth]);

  const [signIn, { loading }] = useLoginMutation();

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      const { data } = await signIn({
        variables: {
          object: values,
        },
      });
      console.log(data, values);

      if (data.login.errors.includes("WRONG_EMAIL")) {
        toast("El email ingresado no existe", {
          type: "error",
        });
        return;
      }

      if (data.login.errors.includes("WRONG_PASSWORD")) {
        toast("Contraseña incorrecta", {
          type: "error",
        });
        return;
      }

      login(data.login.user);

      router.push(ROUTES.CARS);
    },
  });

  return (
    <LoginContainer>
      <Stack
        as="form"
        onSubmit={handleSubmit}
        css={{ gap: 42, width: 300 }}
        direction={"vertical"}
      >
        <Stack css={{ gap: 4, width: 300 }} direction={"vertical"}>
          <Typography size="xl" weight={"bold"}>
            Iniciar Sesion
          </Typography>

          <Stack css={{ gap: 20, width: 300 }} direction={"vertical"}>
            <Input label="Correo" type={"email"} {...getFieldProps("email")} />

            <Input
              {...getFieldProps("password")}
              label="Contraseña"
              type="password"
            />
          </Stack>
        </Stack>
        <Flex css={{ justifyContent: "end" }}>
          <Button loading={loading}>Continuar</Button>
        </Flex>
      </Stack>
    </LoginContainer>
  );
};

export default Login;
