import { useEffect } from "react";

interface IUseRecordProps {
    gameFinished: boolean;
    finalScore: number;
    category: string;
    userName: string;
    records: any;
    isNewRecord: boolean;
}

export const useRecord = ({
    gameFinished,
    finalScore,
    category,
    userName,
    records,
    isNewRecord,
}: IUseRecordProps) => {
    useEffect(() => {
        if (!gameFinished) {
            return;
        }
        if (!isNewRecord) {
            return;
        }
        records[userName][category] = finalScore;
        localStorage.setItem("records", JSON.stringify(records));
    }, [gameFinished]);
};