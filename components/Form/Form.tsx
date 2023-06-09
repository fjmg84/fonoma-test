import React, { FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { Container } from "@/styled-components/Div";
import { Input, Label } from "@/styled-components/Input";

import { ListSymbols } from "@/interfaces";
import { Button } from "@/styled-components/Button";
import styles from "./Form.module.scss";

export type FormProps = {
  handleSubmit: (e: FormEvent<HTMLElement>) => Promise<void>;
  options: ListSymbols[];
};

const Form: React.FC<FormProps> = ({ handleSubmit, options }) => {
  const [optionsSelector, setOptionsSelector] = useState<ListSymbols[]>([]);

  useEffect(() => {
    if (options.length > 0) setOptionsSelector(options);
  }, [options]);

  return (
    <>
      <form role="form" onSubmit={handleSubmit}>
        <Container>
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
            placeholder="Select from"
            options={optionsSelector as keyof typeof Option}
          />

          <Select
            className={styles.selector}
            name="to"
            defaultValue={""}
            placeholder="Select to"
            options={optionsSelector as keyof typeof Option}
          />

          <Label>
            <Input type="date" name="date" />
            *Specify a date to use historical rates for this currency.(Optional)
          </Label>

          <Button>send</Button>
        </Container>
      </form>
    </>
  );
};

export default Form;
