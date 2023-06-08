import { setupServer } from "msw/node";
import { rest } from "msw";
import currentSymbols from "@/data/currentSymbols.json";
import responseData from "@/data/data.json";

const URL_API = `https://api.apilayer.com/exchangerates_data/`;

export const server = setupServer(
  rest.get(`${URL_API}symbols`, (req, res, ctx) => {
    return res(ctx.json(currentSymbols));
  }),

  rest.get(`${URL_API}convert`, (req, res, ctx) => {
    return res(ctx.json(responseData));
  })
);
