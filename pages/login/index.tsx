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
import React from "react";
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
  const { login } = useAuth();
  const router = useRouter();

  const [signIn, {}] = useLoginMutation();

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
            <Fieldset>
              <Label>Correo</Label>
              <InputContainer>
                <Input {...getFieldProps("email")} />
              </InputContainer>
            </Fieldset>
            <Fieldset>
              <Label>Contraseña</Label>
              <InputContainer>
                <Input {...getFieldProps("password")} />
              </InputContainer>
            </Fieldset>
          </Stack>
        </Stack>
        <Flex css={{ justifyContent: "end" }}>
          <Button>Continuar</Button>
        </Flex>
      </Stack>
    </LoginContainer>
  );
};

export default Login;
