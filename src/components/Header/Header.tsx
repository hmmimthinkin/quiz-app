import Exit from "../Exit/Exit";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { playSound } from "../../utils/playSound";

import styles from "./Header.module.scss";
import { COUNTDOWN_START, GAME_CATEGORY, MAX_LIVES } from "../../constants/consts";

interface IHeaderProps {
  lives: number;
  timeLeft: number;
  score: number;
  category: string;
}

const Header = ({lives, timeLeft, score, category }: IHeaderProps) => {
  const navigate = useNavigate();
  const [showExit, setShowExit] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <button
          className={styles.backButton}
          onClick={() => {
            playSound("click")
            setShowExit(true)}}
        >
          ⬅
        </button>
        <div className={styles.hearts}>
          {Array.from({ length: MAX_LIVES }, (_, index) => (
            <span key={index} className={index <= lives ? styles.full : styles.empty}>
              ❤
            </span>
          ))}
        </div>
        <div className={styles.info}>
          <span className={styles.category}>
              {category === GAME_CATEGORY.PLANETS ? "🪐 PLANET QUIZ" : "🌍 COUNTRY QUIZ"}
          </span>
          <span className={styles.progress}>
              <b>score:</b> {score}
          </span>
        </div>
        <div className={`${styles.timer} ${timeLeft <= COUNTDOWN_START ? styles.danger : ""}`}>
        ⏱ {timeLeft}s
        </div>
      </div>
      {showExit && (<Exit onCancel={() => setShowExit(false)} onLeave={() => navigate("/home")}/>)}
    </header>
  );
};

export default Header;