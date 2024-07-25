import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import styles from "./field.module.css";
import { Label } from "../Label";
import { Input } from "../Input";

const defaultElement = Input;

type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>>;

type FieldProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<E> & {
  label: string;
};

export const Field = <E extends ElementType = typeof defaultElement>({ as, label, ...props }: FieldProps<E>) => {
  const Component = as ?? defaultElement;

  return (
    <div className={styles.field}>
      <Label>{label}</Label>
      <Component {...props} />
    </div>
  );
};
