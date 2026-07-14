import PixelButton from "../PixelButton/PixelButton";
import Confetti from "react-confetti";
import { useEffect, useState } from "react"
import { playSound } from "../../utils/playSound";

import styles from "./Result.module.scss";
import { Sound } from "../../constants/sound";
import { NUMBER_OF_CONFETTI, MODAL_Z_INDEX } from "../../constants/consts";

import { FinishReason } from "../../constants/finish";

interface IResultProps {
  score: number;
  totalQuestions: number;
  bestScore: number;
  isNewRecord: boolean;
  category: string;
  finishReason: string | null;
  onPlayAgain: () => void;
  onHome: () => void;
}

const ResultModal = ({
  score,
  totalQuestions,
  bestScore,
  isNewRecord,
  category,
  finishReason,
  onPlayAgain,
  onHome,
}: IResultProps) => {
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
  const displayedBestScore = isNewRecord ? score : bestScore;

  useEffect(() => {
    const resize = () =>
      setSize({width: window.innerWidth,height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (score === totalQuestions || isNewRecord) playSound(Sound.Victory);
    else if (finishReason === FinishReason.Time)  playSound(Sound.GameFinished);
    else if (finishReason === FinishReason.Lives) playSound(Sound.GameOver);
  }, []);
  return (
  <>
    {isNewRecord && (
      <Confetti width={size.width} height={size.height} numberOfPieces={NUMBER_OF_CONFETTI} recycle={false}
        style={{position: "fixed", top: 0, left: 0, zIndex: MODAL_Z_INDEX, pointerEvents: "none"}}
      />
    )}
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h1>GAME OVER</h1>
        <h2>{category.toUpperCase()}</h2>
        <div className={styles.score}>
          <p>Score</p>
          <h3>{score} / {totalQuestions}</h3>
        </div>
        <div className={styles.record}>
          <p>Best Score</p>
          <h3>{displayedBestScore}</h3>
        </div>
        {isNewRecord && (
          <h2 className={styles.newRecord}>
            🏆 NEW RECORD!
          </h2>
        )}
       
        <div className={styles.buttons}>
          <PixelButton color="green" onClick={
              () => {
                playSound(Sound.GameStart);
                onPlayAgain();
              }
            }>
            PLAY AGAIN 
          </PixelButton>
          <PixelButton color="blue" onClick={
              () => {
                onHome();
                playSound(Sound.HomePage);
              }
            }>
            HOME
          </PixelButton>
        </div>
      </div>
    </div>
  </>
  );
};

export default ResultModal;