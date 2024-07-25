import { ComponentProps, FC, useEffect, useRef } from "react";
import styles from "./icon.module.css";

interface IconProps {
  insertIconInElement: (icon: string, htmlElement: HTMLElement) => Promise<void>;
  iconName: string;
}

export const Icon = ({ insertIconInElement, iconName, className = "", ...props }: IconProps & ComponentProps<"i">) => {
  const iconRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const loadSvgIcon = async (): Promise<void> => {
      if (iconRef.current) await insertIconInElement(iconName, iconRef.current);
    };

    if (iconName) {
      void loadSvgIcon();
    }
  }, [iconName]);

  return <i ref={iconRef} className={`${styles.icon} ${className}`} {...props} />;
};
