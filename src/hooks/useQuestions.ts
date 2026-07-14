import { useEffect, useState } from "react";
import { planets } from "../data/planets";
import { countries } from "../data/countries";
import { shuffle } from "../utils/shuffle";
import { GAME_CATEGORY } from "../constants/consts";
import { QUESTION_LIMIT } from "../constants/consts";

interface IQuestion {
    name: string;
    image: string;
}

export const useQuestions = (category: string) => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const currentItem = questions[currentQuestion];

    useEffect(() => {
        setCurrentQuestion(0);
        if (category === GAME_CATEGORY.PLANETS) {
            setQuestions(shuffle(planets).slice(0, QUESTION_LIMIT.planets));
            return;
        }
        if (category === GAME_CATEGORY.COUNTRIES) {
            setQuestions(shuffle(countries).slice(0, QUESTION_LIMIT.countries));
        }
    }, [category]);

    useEffect(() => {
        if (!questions.length) {
            return;
        };
        if (!currentItem) {
            return;
        }

        const wrongAnswers = shuffle(
            questions.filter(
                (item) => item.name !== currentItem.name
            )
        ).slice(0, 3);

        const allOptions = shuffle([currentItem.name, ...wrongAnswers.map((item) => item.name)]);
        setOptions(allOptions);
    }, [questions, currentQuestion]);

    const nextQuestion = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };

    return {
        questions,
        currentQuestion,
        options,
        nextQuestion,
        setCurrentQuestion,
    };
};