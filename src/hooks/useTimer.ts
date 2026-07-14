import { useEffect } from "react";
import { playSound } from "../utils/playSound";
import { SECONDS, TIME_LEFT } from "../constants/consts";

interface IUseTimerProps {
    timeLeft: number;
    gameFinished: boolean;
    onTick: () => void;
    onFinish: () => void;
}

export const useTimer = ({
    timeLeft,
    gameFinished,
    onTick,
    onFinish,
}: IUseTimerProps) => {
    useEffect(() => {
        if (timeLeft === TIME_LEFT) {
            playSound("countdown");
        }
    }, [timeLeft]);

    useEffect(() => {
        if (gameFinished) {
            return;
        }
        if (timeLeft <= 0) {
            playSound("gamefinished");
            onFinish();
            return;
        }
        const timer = setTimeout(() => {onTick()}, SECONDS);
        return () => clearTimeout(timer);
    }, [timeLeft, gameFinished]);
};