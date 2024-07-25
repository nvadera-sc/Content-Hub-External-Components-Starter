import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import styles from "./button.module.css";

const defaultElement = "button";

type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>>;

type ButtonProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<E> & {
  variant?: "primary" | "secondary" | "tertiary" | "icon" | "ghost";
};

export const Button = <E extends ElementType = typeof defaultElement>({ as, variant = "secondary", className = "", ...props }: ButtonProps<E>) => {
  const Component = as ?? defaultElement;

  return <Component className={`${className} ${styles.button} ${styles[variant]}`} {...props} />;
};
