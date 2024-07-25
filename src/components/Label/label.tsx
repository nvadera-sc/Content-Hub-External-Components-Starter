import { ComponentProps } from "react";

import styles from "./label.module.css";

export const Label = (props: ComponentProps<"label">) => {
  return <label className={styles.label} {...props} />;
};
