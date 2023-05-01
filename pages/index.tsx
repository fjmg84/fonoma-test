import { FormEvent, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Select from "react-select";
import { useMutation } from "react-query";

import { getConvert, getCurrentSymbol } from "@/utils/services";
import { Button } from "@/styled/Button";
import { Input } from "@/styled/Input";

import { ContainerData, ContainerForm } from "@/styled/Div";
import styles from "@/styles/Home.module.css";
import { ValuesQuery } from "@/interfaces";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ listSymbols }: any) {
  const [options, setOptions] = useState([]);
  const prevValues = useRef<ValuesQuery>();

  const { mutate, isLoading, isError, data: values } = useMutation(getConvert);

  useEffect(() => {
    setOptions(listSymbols);
  }, [listSymbols]);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { target } = e;

    let data: any = Object.fromEntries(new FormData(target as HTMLFormElement));
    const { amount, from, to } = data;
    if (
      prevValues.current?.amount === amount &&
      prevValues.current?.from === from &&
      prevValues.current?.to === to
    )
      return;
    else {
      prevValues.current = { ...data };
      mutate(data);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <form role="form" onSubmit={(e) => handleSubmit(e)}>
          <ContainerForm>
            <Input
              required
              type="number"
              placeholder="coin amount"
              name="amount"
            />
            <div data-testid="from_selector">
              <Select
                className={`from ${styles.selector}`}
                defaultValue={""}
                options={options}
                placeholder="from this current"
                name="from"
                required
              />
            </div>
            <div data-testid="to_selector">
              <Select
                className={`to ${styles.selector}`}
                name="to"
                defaultValue={""}
                options={options && options}
              />
            </div>

            <Button data-testid="send">send</Button>
          </ContainerForm>
        </form>
        <div className="container">
          {isLoading && <div className="loading" />}
          {isError && <h4 className="error">{isError}</h4>}
          {!isLoading && values?.success && (
            <ContainerData>
              <h4 className="amount">
                <span>from:</span>
                {values.query?.amount}
                <small>{values.query?.from}</small>
              </h4>

              <h4 className="result">
                <span>to:</span>
                {values.result}
                <small>{values.query?.to}</small>
              </h4>
            </ContainerData>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    let { symbols } = await getCurrentSymbol();
    let listSymbols: (typeof symbols)[] = [];

    for (const property in symbols) {
      listSymbols = [
        ...listSymbols,
        {
          value: property,
          label: `${property} - ${symbols[property as keyof typeof symbols]}`,
        },
      ];
    }

    return {
      props: { listSymbols },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
