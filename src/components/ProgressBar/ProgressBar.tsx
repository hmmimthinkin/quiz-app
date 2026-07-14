import { LAST_SECONDS, PROGRESS_COLORS, PROGRESS_DANGER, PROGRESS_LOW, PROGRESS_MEDIUM, PROGRESS_WARNING } from "../../constants/consts";
import styles from "./ProgressBar.module.scss";


interface IProgressBarProps {
  timeLeft: number;
  maxTime: number;
}

const ProgressBar = ({ timeLeft, maxTime }: IProgressBarProps) => {
  const percentage = Math.min((timeLeft / maxTime) * 100, 100);
  const color =
  percentage <= PROGRESS_DANGER
    ? PROGRESS_COLORS.DANGER
    : percentage <= PROGRESS_LOW
    ? PROGRESS_COLORS.LOW
    : percentage <= PROGRESS_MEDIUM
    ? PROGRESS_COLORS.MEDIUM
    : percentage <= PROGRESS_WARNING
    ? PROGRESS_COLORS.WARNING
    : PROGRESS_COLORS.SAFE;
  return (
    <div className={styles.progressBar}>
      <div className={`${styles.fill} ${timeLeft <= LAST_SECONDS ? styles.danger : ""}`} 
        style={{width: `${percentage}%`, backgroundColor: color}}/>
    </div>
  );
};

export default ProgressBar;

