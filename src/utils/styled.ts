import styled, { CreateStyled } from "@emotion/styled";

interface Theme {
  background: {
    dark: string;
    light: string;
  };
  black: string;
  gray: {
    dark: string;
    light: string;
  };
  white: string;
  green: string;
  purple: string;
  blue: {
    dark: string;
    light: string;
  };
}

export const theme: Theme = {
  background: {
    dark: "#16161a",
    light: "#242629",
  },
  black: "#010101",
  gray: {
    dark: "#72757e",
    light: "#94a1b2",
  },
  white: "#fffffe",
  green: "#2cb67d",
  purple: "#7f5af0",
  blue: {
    dark: "#0177b0",
    light: "#0e96da",
  },
};

export default styled as CreateStyled<Theme>;
