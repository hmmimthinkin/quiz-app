import { playSound } from "../../utils/playSound";
import PixelButton from "../PixelButton/PixelButton";
import styles from "./Exit.module.scss";

interface IExitProps {
    onCancel: () => void;
    onLeave: () => void;
}

const Exit = ({ onCancel, onLeave }: IExitProps) => (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2>⚠️ EXIT GAME</h2>
            <p>Your progress will be lost.<br /> Are you sure? </p>
            <div className={styles.buttons}>
                <PixelButton color="green" onClick={onCancel}>
                    Stay
                </PixelButton>
                <PixelButton color="red" onClick={() =>{
                    onLeave();
                    playSound("homepage");
                }}>
                    Leave
                </PixelButton>
            </div>
        </div>
    </div>
);

export default Exit;