import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./QuestionCard.module.scss";

interface IQuestionCardProps {
    image: string;
    imageAlt: string;
    timeLeft: number;
    maxTime: number;
    question: string;
}

const QuestionCard = ({image, imageAlt, timeLeft, maxTime, question}: IQuestionCardProps) => (
    <>
        <div className={styles.imageCard}>
            <img src={image} alt={imageAlt} className={styles.image}/>
        </div>
        <ProgressBar timeLeft={timeLeft} maxTime={maxTime}/>    
        <h2 className={styles.question}>
            {question}
        </h2>
    </>
);

export default QuestionCard;