import { FormEvent, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

import { useMutation } from "react-query";

import { getConvert, getCurrentSymbol } from "@/utils/services";
import { Button } from "@/styled-components/Button";
import { Input, Label } from "@/styled-components/Input";

import { ContainerData, Container } from "@/styled-components/Div";
import { ListSymbols, ValuesQuery } from "@/interfaces";
import styles from "@/styles/Home.module.scss";
import { Form } from "@/components/Form";

const inter = Inter({ subsets: ["latin"] });

const DATA_TESTS = {
  success: true,
  result: 0.1223456,
  query: {
    amount: 25,
    from: "CUC",
    to: "CUC",
  },
};

export default function Home({ listSymbols }: { listSymbols: ListSymbols[] }) {
  const prevValues = useRef<ValuesQuery>();

  const { mutate, isLoading, isError, data: values } = useMutation(getConvert);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { target } = e;

    let data: any = Object.fromEntries(new FormData(target as HTMLFormElement));

    const { amount, from, to, date } = data;
    if (
      prevValues.current?.amount === amount &&
      prevValues.current?.from === from &&
      prevValues.current?.to === to &&
      prevValues.current?.date === date
    )
      return;

    prevValues.current = { ...data };
    mutate(data);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <div className={styles.container}>
          <Container>
            <div className={styles.container}>
              <Form handleSubmit={handleSubmit} options={listSymbols} />
              <>
                {!isLoading && values?.success ? (
                  <Container>
                    <table className={styles.table}>
                      <tbody>
                        <tr>
                          <td>date:</td>
                          <td>{values?.date}</td>
                        </tr>
                        <tr>
                          <td>rate:</td>
                          <td>{values?.info?.rate}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h4 className={styles.amount}>
                      <ContainerData>
                        {values.query?.amount}
                        <small>{values.query?.from}</small>
                      </ContainerData>
                    </h4>

                    <span>
                      <i className="fa fa-arrow-down"></i>
                    </span>

                    <h4 className={styles.result}>
                      <ContainerData>
                        {values.result}
                        <small>{values.query?.to}</small>
                      </ContainerData>
                    </h4>
                  </Container>
                ) : (
                  <h4 className="error">{values?.error?.message}</h4>
                )}

                {isLoading && <div className="loading" />}
                {isError && <h4 className="error">{isError}</h4>}
              </>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let listSymbols: ListSymbols[] = [];

  try {
    let { success, symbols } = await getCurrentSymbol();

    if (success)
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
      props: { listSymbols },
    };
  }
}
