import { useNavigate } from "react-router-dom";

import { playSound } from "../../utils/playSound";

import styles from "./Home.module.scss";

interface IUser {
    name: string;
    password: string;
}

const Home = () => {
    const navigate = useNavigate();
    const currentUser: IUser | null = JSON.parse(localStorage.getItem("currentUser") || "null");
    const records = JSON.parse(localStorage.getItem("records") || "{}");
    
    const userRecords = currentUser && records[currentUser.name]
        ? records[currentUser.name]
        : {planets: 0,countries: 0};

    const handleLogout = () => {localStorage.removeItem("currentUser"); navigate("/")};
    return (
        <div className={styles.container}>
            <div className={styles.stars}></div>
            <h1 className={styles.logo}>
            {"QUIZ QUEST".split("").map((letter, index) => (
                <span key={index}>
                {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
            </h1>
            <div className={styles.games}>
                <button className={styles.card}
                    onClick={() => {
                            playSound("gamestart");
                            navigate("/game/planets");
                        }}
                >
                    <div className={styles.icon}>🪐</div>
                    <span>PLANET QUIZ</span>
                </button>

                <button className={styles.card}
                    onClick={() => {
                        playSound("gamestart");
                        navigate("/game/countries")
                    }}
                >
                    <div className={styles.icon}>🌍</div>
                    <span>COUNTRY QUIZ</span>
                </button>
            </div>
            <div className={styles.recordCard}> 
                <h3>🏆 BEST SCORES</h3> 
                <div className={styles.recordRow}> 
                    <span>🪐 Planets</span> 
                    <strong>{userRecords.planets}</strong> 
                </div> 
                <div className={styles.recordRow}> 
                    <span>🌍 Countries</span> 
                    <strong>{userRecords.countries}</strong> 
                </div> 
            </div>
            <button
                className={styles.logout}
                onClick={
                    () => {
                        handleLogout();
                        playSound("click");
                    }
                }
            >
                LOGOUT
            </button>
        </div>
    );
};

export default Home;