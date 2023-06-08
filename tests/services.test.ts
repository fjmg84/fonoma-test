import "whatwg-fetch";
import { getServerSideProps } from "@/pages";
import { getCurrentSymbol, getConvert } from "../utils/services";
import { server } from "@/mocks/server";

describe("request API Layer", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should return all symbols value", async () => {
    let { success, symbols } = await getCurrentSymbol();

    expect(success).toBeTruthy();
    expect(symbols).not.toBeNull();
    expect(symbols).not.toBeUndefined();
  });

  test("should return to convert current symbol", async () => {
    let response = await getConvert({
      amount: 1,
      from: "USD",
      to: "CUP",
    });

    const { success, query } = response;

    expect(success).toBeTruthy();
    expect(JSON.stringify(query)).toContain(
      JSON.stringify({ from: "CUC", to: "USD", amount: 25 })
    );
  });

  test("should return symbols formatted of the getServerSideProps", async () => {
    let { props } = await getServerSideProps();
    const { listSymbols } = props;

    expect(listSymbols).not.toHaveLength(0);

    let data = await listSymbols.find((symbol) => symbol.value === "USD");

    expect(JSON.stringify(data)).toBe(
      JSON.stringify({
        value: "USD",
        label: "USD - United States Dollar",
      })
    );
  });
});
