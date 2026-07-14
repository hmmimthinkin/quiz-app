import PixelButton from "../PixelButton/PixelButton";
import styles from "./Hint.module.scss";

interface IHintButtonsProps {
    used5050: boolean;
    usedExtraTime: boolean;
    usedSkip: boolean;
    on5050: () => void;
    onExtraTime: () => void;
    onSkip: () => void;
}

const HintButtons = ({
    used5050,
    usedExtraTime,
    usedSkip,
    on5050,
    onExtraTime,
    onSkip,
}: IHintButtonsProps) => (
    <div className={styles.hints}>
        <PixelButton className={styles.hintButtons} onClick={on5050} disabled={used5050}>
            50 / 50
        </PixelButton>
        <PixelButton className={styles.hintButtons} onClick={onExtraTime} disabled={usedExtraTime}>
            +10 sec
        </PixelButton>
        <PixelButton className={styles.hintButtons} onClick={onSkip} disabled={usedSkip}>
            Skip
        </PixelButton>
    </div>
);

export default HintButtons;