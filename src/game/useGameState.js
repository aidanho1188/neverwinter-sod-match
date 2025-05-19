import { useState, useMemo, useRef } from 'react';
import { generateOptions, getNumOptionsForLevel } from './GameLogic';

// Use assets for questions and answers
const QUESTIONS = [
	{
		question: { text: 'Abjuration', image: '/src/assets/questions/abjuration.png' },
		answer: { text: 'Fork', image: '/src/assets/answers/fork.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Conjuration', image: '/src/assets/questions/conjuration.png' },
		answer: { text: 'Horns', image: '/src/assets/answers/horns.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Divination', image: '/src/assets/questions/divination.png' },
		answer: { text: 'Pipe', image: '/src/assets/answers/pipe.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Enchantment', image: '/src/assets/questions/enchantment.png' },
		answer: { text: 'Cross', image: '/src/assets/answers/cross.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Evocation', image: '/src/assets/questions/evocation.png' },
		answer: { text: 'Window', image: '/src/assets/answers/window.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Illusion', image: '/src/assets/questions/illusion.png' },
		answer: { text: 'Eye', image: '/src/assets/answers/eye.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Necromancy', image: '/src/assets/questions/necromancy.png' },
		answer: { text: 'Hat', image: '/src/assets/answers/hat.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
	{
		question: { text: 'Transmutation', image: '/src/assets/questions/transmutation.png' },
		answer: { text: 'Towers', image: '/src/assets/answers/towers.png' },
		allAnswers: [
			{ text: 'Window', image: '/src/assets/answers/window.png' },
			{ text: 'Hat', image: '/src/assets/answers/hat.png' },
			{ text: 'Pipe', image: '/src/assets/answers/pipe.png' },
			{ text: 'Towers', image: '/src/assets/answers/towers.png' },
			{ text: 'Eye', image: '/src/assets/answers/eye.png' },
			{ text: 'Fork', image: '/src/assets/answers/fork.png' },
			{ text: 'Horns', image: '/src/assets/answers/horns.png' },
			{ text: 'Cross', image: '/src/assets/answers/cross.png' },
		],
	},
];

// Helper to shuffle an array
function shuffleArray(arr) {
	const array = [...arr];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export default function useGameState() {
	const [gameSeed, setGameSeed] = useState(Date.now());
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(() => {
		const saved = localStorage.getItem('sod_high_score');
		return saved ? parseInt(saved, 10) : 0;
	});
	const [showAnswer, setShowAnswer] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [level, setLevel] = useState(1);
	const [timeTaken, setTimeTaken] = useState(0);
	const timerRef = useRef();
	const startTimeRef = useRef(Date.now());

	// Shuffle questions at the start of each game (when gameSeed changes)
	const shuffledQuestions = useMemo(() => shuffleArray(QUESTIONS), [gameSeed]);
	const currentQuestion = shuffledQuestions[currentIndex];
	const numOptions = getNumOptionsForLevel(level);

	// Memoize options so they only regenerate when question/level/currentQuestion changes
	const options = useMemo(() => {
		if (!currentQuestion) return [];
		return generateOptions(shuffleArray(currentQuestion.allAnswers), currentQuestion.answer, numOptions);
	}, [currentQuestion, numOptions]);

	// Timer logic
	function startTimer() {
		startTimeRef.current = Date.now();
		setTimeTaken(0);
		if (timerRef.current) clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setTimeTaken(Math.floor((Date.now() - startTimeRef.current) / 1000));
		}, 200);
	}
	function stopTimer() {
		if (timerRef.current) clearInterval(timerRef.current);
	}
	useMemo(() => {
		if (!showAnswer && currentQuestion) startTimer();
		if (showAnswer) stopTimer();
		return () => stopTimer();
	}, [showAnswer, currentQuestion]);

	function selectOption(option) {
		setSelectedOption(option);
		setShowAnswer(true);
		stopTimer();
		if (option.text === currentQuestion.answer.text) {
			const base = 100 * (1 + (level - 1) * 0.05);
			const penalty = Math.min(timeTaken * 10, base);
			setScore((prev) => {
				const newScore = prev + Math.round(base - penalty);
				if (newScore > highScore) {
					setHighScore(newScore);
					localStorage.setItem('sod_high_score', newScore);
				}
				return newScore;
			});
		}
	}

	function nextQuestion() {
		setCurrentIndex((prev) => prev + 1);
		setShowAnswer(false);
		setSelectedOption(null);
		setTimeTaken(0);
	}

	function resetGame() {
		setGameSeed(Date.now());
		setCurrentIndex(0);
		setScore(0);
		setShowAnswer(false);
		setSelectedOption(null);
		setTimeTaken(0);
	}

	return {
		currentQuestion,
		currentIndex,
		score,
		highScore,
		showAnswer,
		selectedOption,
		selectOption,
		nextQuestion,
		isFinished: currentIndex >= shuffledQuestions.length,
		totalQuestions: shuffledQuestions.length,
		options,
		level,
		setLevel,
		timeTaken,
		resetGame,
	};
}