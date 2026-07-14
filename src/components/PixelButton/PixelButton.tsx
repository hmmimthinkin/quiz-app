import type { ButtonHTMLAttributes, ReactNode } from "react";
import { playSound } from "../../utils/playSound";
import type { ButtonColor } from "../../constants/button";
import { Sound } from "../../constants/sound";
import styles from "./PixelButton.module.scss";

interface IPixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: ButtonColor;
}

const PixelButton = ({
  children,
  color = "yellow",
  className = "",
  ...props
}: IPixelButtonProps) => (
  <button 
    className={`${styles.button} ${styles[color]} ${className}`} 
    {...props} 
    onClick={(e) => {playSound(Sound.Click); props.onClick?.(e)}}
  >
    {children}
  </button>
);

export default PixelButton;