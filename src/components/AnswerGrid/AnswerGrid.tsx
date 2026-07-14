import PixelButton from "../PixelButton/PixelButton";
import {OPTION_COLORS, OPTION_LETTERS} from "../../constants/consts";

import styles from "./AnswerGrid.module.scss";

interface IAnswerGridProps {
    options: string[];
    hiddenOptions: string[];
    showAnswer: boolean;
    selectedAnswer: string | null;
    correctAnswer: string;
    onAnswer: (answer: string) => void;
}

const AnswerGrid = ({options, hiddenOptions, showAnswer, selectedAnswer, correctAnswer, onAnswer}
    : IAnswerGridProps) =>(
    <div className={styles.options}>
        {options.map((option, index) => {
            if (hiddenOptions.includes(option)){
                return null;
            } 
            return (
                <PixelButton
                    key={option}
                    color={OPTION_COLORS[index]}
                    onClick={() => {if (!showAnswer) {onAnswer(option)}}}
                    className={`${styles.option}
                    ${
                        showAnswer
                            ? option === correctAnswer
                                ? styles.correct
                                : option === selectedAnswer
                                ? styles.wrong
                                : styles.disabledOption
                            : ""
                    }`}
                >
                    {OPTION_LETTERS[index]} • {option}
                </PixelButton>
            );
        })}
    </div>
);

export default AnswerGrid;