import Header from "../../components/Header/Header";
import Result from "../../components/Result/Result";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import AnswerGrid from "../../components/AnswerGrid/AnswerGrid";
import HintButtons from "../../components/Hint/Hint";

import { useTimer } from "../../hooks/useTimer";
import { useRecord } from "../../hooks/useRecord";
import { useQuestions } from "../../hooks/useQuestions";
import { playSound, stopSound } from "../../utils/playSound";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Game.module.scss";
import { EXTRA_TIME, MAX_LIVES, MAX_TIME, HIDDEN_OPTIONS, COUNTDOWN_START } from "../../constants/consts";

const Game = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [timeLeft, setTimeLeft] = useState(MAX_TIME);

    const [used5050, setUsed5050] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
    const [usedExtraTime, setUsedExtraTime] = useState(false);
    const [usedSkip, setUsedSkip] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const {questions, currentQuestion, options, nextQuestion } = useQuestions(category || "");
    const question = questions[currentQuestion];
    const [screenEffect, setScreenEffect] = useState<"correct" | "wrong" | "">("");
    const [finishReason, setFinishReason] = useState<"time" | "lives" | "completed" | null>(null);

    const handleAnswer = (selectedAnswer: string) => {
        setSelectedAnswer(selectedAnswer);
        setShowAnswer(true);
        let newScore = score;
        let remainingLives = lives;
        if(selectedAnswer === question.name){
            playSound("correct");
            newScore++;
            setScore(newScore);
            setScreenEffect("correct");
        } else{
            playSound("wrong");
            remainingLives--;
            setLives(remainingLives);
            setScreenEffect("wrong");
        }
        setTimeout(() => {
            setScreenEffect("");
            if (remainingLives === 0) {
                setFinalScore(newScore);
                setGameFinished(true);
                setFinishReason("lives");
                return;
            }
            if (currentQuestion + 1 < questions.length) {
                setHiddenOptions([]);
                nextQuestion();
                setSelectedAnswer(null);
                setShowAnswer(false);
            } else {
                setFinalScore(newScore);
                setFinishReason("completed");
                setGameFinished(true);
            }
        }, 700);
    }

    const handleExtraTime = () => {
        if (usedExtraTime) return;
        setTimeLeft((previousTime) => Math.min(previousTime + EXTRA_TIME, MAX_TIME));
        setUsedExtraTime(true);
    };

    const handle5050 = () => {
        if (used5050) return;
        const wrongAnswers = options.filter((option) => option !== question.name);
        const shuffled = [...wrongAnswers].sort(() => Math.random() - 0.5);
        setHiddenOptions(shuffled.slice(0, HIDDEN_OPTIONS));
        setUsed5050(true);
    };

    const handleSkip = () => {
        if (usedSkip) return;
        setHiddenOptions([]);
        if (currentQuestion + 1 < questions.length) {
            nextQuestion();
        } else {
            localStorage.setItem("score", String(score));
            setFinalScore(score);
            setFinishReason("completed");
            setGameFinished(true);
        };
        setUsedSkip(true);
    }
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    const records = JSON.parse(localStorage.getItem("records") || "{}");
    const userName = currentUser?.name;

    if (userName && !records[userName]) {
        records[userName] = {
            planets: 0,
            countries: 0,
        };
    }

    const bestScore = userName && category
        ? records[userName][category] || 0
        : 0;

    const isNewRecord = finalScore > bestScore;

    useTimer({
        timeLeft, gameFinished,
        onTick: () => {
            setTimeLeft((prevTime) => prevTime - 1);
        },
        onFinish: () => {
            setFinalScore(score);
            setFinishReason("time");
            setGameFinished(true);
        },
    });

    useRecord({
        gameFinished,
        finalScore,
        category: category || "",
        userName,
        records,
        isNewRecord,
    });

    useEffect(() => {
        setHiddenOptions([]);
    }, [currentQuestion]);

    useEffect(() => {
        if (timeLeft > COUNTDOWN_START) {
            stopSound("countdown");
        }
    }, [timeLeft]);

    if (questions.length === 0) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
        <Header lives={lives} timeLeft={timeLeft} score={score} category={category || ""}/>
        <div className={`${styles.container} ${ screenEffect ? styles[screenEffect] : ""}`}>
            <QuestionCard
                image={question.image}
                imageAlt={question.name}
                timeLeft={timeLeft}
                maxTime={MAX_TIME}
                question={
                    category === "planets"
                        ? "Which planet is this?"
                        : "Which country is this?"
                }
            />
            <HintButtons
                used5050={used5050}
                usedExtraTime={usedExtraTime}
                usedSkip={usedSkip}
                on5050={handle5050}
                onExtraTime={handleExtraTime}
                onSkip={handleSkip}
            />
            <AnswerGrid
                options={options}
                hiddenOptions={hiddenOptions}
                showAnswer={showAnswer}
                selectedAnswer={selectedAnswer}
                correctAnswer={question.name}
                onAnswer={handleAnswer}
            />
        </div>
        {gameFinished && (
            <Result
                score={finalScore}
                totalQuestions={questions.length}
                bestScore={bestScore}
                isNewRecord={isNewRecord}
                category={category || ""}
                finishReason={finishReason}
                onPlayAgain={() => window.location.reload()}
                onHome={() => navigate("/home")}
            />
            )}
        </>
    );
};

export default Game;