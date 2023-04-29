import { FormEvent, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Select from "react-select";

import { getCurrentSymbol } from "@/utils/services";
import { useGetConvert } from "@/hooks/useGetConvert";
import { Button } from "@/styled/Button";
import { Input } from "@/styled/Input";

import currentSymbols from "../data/currentSymbols.json";
import { ContainerData, ContainerForm } from "@/styled/Div";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ listSymbols }: any) {
  const [options] = useState(listSymbols);
  const { isError, isLoading, values, handleRequest } = useGetConvert();

  console.log({ isError, isLoading, values });

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { target } = e;

    let data: any = Object.fromEntries(new FormData(target as HTMLFormElement));
    handleRequest(data);
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <ContainerForm>
            <Input
              required
              type="number"
              placeholder="coin amount"
              name="amount"
            />

            <Select
              className={styles.selector}
              name="from"
              defaultValue={""}
              options={options}
            />

            <Select
              className={styles.selector}
              name="to"
              defaultValue={""}
              options={options && options}
            />

            <Button>send</Button>
          </ContainerForm>
        </form>
        <div className="container">
          {isLoading && <div className="loading" />}
          {isError.state && <h4 className="error">{isError.message}</h4>}
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
  let { success, symbols } = currentSymbols; /* await getCurrentSymbol() */
  let listSymbols: any = [];

  if (success) {
    for (const property in symbols) {
      listSymbols = [
        ...listSymbols,
        {
          value: property,
          label: `${property} - ${symbols[property as keyof typeof symbols]}`,
        },
      ];
    }
  } else listSymbols = [];

  return {
    props: { listSymbols },
  };
}
