import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { SignIn } from "./index";

export default {
  title: "Pages/SignIn",
  component: SignIn,
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (req, res, ctx) => {
          return res(
            ctx.json({
              message: "Usuário logado com sucesso!",
            })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.type(
      canvas.getByPlaceholderText("Digite seu e-mail"),
      "diogorocha12@live.com"
    );
    userEvent.type(canvas.getByPlaceholderText("Digite sua senha"), "123456");
    userEvent.click(canvas.getByRole("button"));
    waitFor(() => {
      return expect(
        canvas.getByText("Usuário logado com sucesso!")
      ).toBeInTheDocument();
    });
  },
};
