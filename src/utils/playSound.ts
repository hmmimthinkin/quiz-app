const sounds: Record<string, HTMLAudioElement> = {
    click: new Audio("/sounds/click.mp3"),
    correct: new Audio("/sounds/correct.mp3"),
    wrong: new Audio("/sounds/wrong.mp3"),
    gamestart: new Audio("/sounds/gamestart.mp3"),
    countdown: new Audio("/sounds/countdown.mp3"),
    gameover: new Audio("/sounds/gameover.mp3"),
    gamefinished: new Audio("/sounds/gamefinished.mp3"),
    victory: new Audio("/sounds/victory.mp3"),
    homepage: new Audio("/sounds/homepage.mp3"),
};

Object.values(sounds).forEach((sound) => {
    sound.preload = "auto";
});

export const playSound = (name: keyof typeof sounds) => {
    const sound = sounds[name];
    sound.currentTime = 0;
    sound.play().catch(() => {});
};

export const stopSound = (name: keyof typeof sounds) => {
    const sound = sounds[name];
    sound.pause();
    sound.currentTime = 0;
};