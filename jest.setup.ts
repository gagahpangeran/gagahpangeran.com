import "@testing-library/jest-dom";
import { TextDecoder } from "util";

// @ts-expect-error mock global TextDecoder
global.TextDecoder = TextDecoder;
