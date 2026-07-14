import type { ReactNode } from "react";
import styles from "./AuthCard.module.scss";

interface IAuthCardProps {
  title: string;
  children: ReactNode;
}

const AuthCard = ({title, children}: IAuthCardProps) => (
  <div className={styles.background}>
    <div className={styles.stars}></div>
    <div className={styles.container}>
      <h1 className={styles.logo}>
        {title.split("").map((letter, index) => (
          <span key={index}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
      {children}
    </div>
  </div>
);

export default AuthCard;