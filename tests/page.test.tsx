import "whatwg-fetch";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../pages/_app";
import { server } from "@/mocks/server";

const mockGetConvert = jest.fn().mockResolvedValue({
  success: true,
  query: {
    from: "CUC",
    to: "USD",
    amount: 25,
  },
  info: {
    timestamp: 1682783403,
    rate: 1,
  },
  date: "2023-04-29",
  result: 25,
});

const listSymbolsData = [
  { value: "USD", label: "United States Dollar" },
  { value: "CUP", label: "Cuban Pesos" },
];

describe("Home component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const wrapper = (children: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  test("should return snapshot", async () => {
    const result = await render(
      wrapper(<Home listSymbols={listSymbolsData} />)
    );

    expect(result).toMatchSnapshot();
  });

  test("should return write in form", async () => {
    const result = render(wrapper(<Home listSymbols={listSymbolsData} />));

    const { getByPlaceholderText, getByText } = result;

    const amountInput = getByPlaceholderText("coin amount");
    const fromSelect = getByText("Select from");
    const toSelect = getByText("Select to");
    const submitButton = getByText("send");

    fireEvent.change(amountInput, { target: { value: 10 } });

    fireEvent.mouseDown(fromSelect);
    fireEvent.click(getByText("United States Dollar"));

    fireEvent.mouseDown(toSelect);
    fireEvent.click(getByText("Cuban Pesos"));

    fireEvent.click(submitButton);
    waitFor(() => expect(mockGetConvert).toHaveBeenCalledTimes(1));

    const amountResult = await screen.findByText("from:");
    expect(amountResult).toBeDefined();
  });
});
