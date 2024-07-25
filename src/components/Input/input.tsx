import { ComponentProps } from "react";

import styles from "./input.module.css";

export const Input = (props: ComponentProps<"input">) => {
  return <input className={styles.input} {...props} />;
};
