import { ComponentProps } from "react";

import styles from "./textarea.module.css";

export const Textarea = (props: ComponentProps<"textarea">) => {
  return <textarea className={styles.textarea} {...props} />;
};
