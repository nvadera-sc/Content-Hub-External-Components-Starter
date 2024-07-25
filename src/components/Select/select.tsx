import { ComponentProps } from "react";

import styles from "./select.module.css";

export const Select = (props: ComponentProps<"select">) => {
  return <select className={styles.select} {...props} />;
};
