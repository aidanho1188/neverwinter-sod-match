// GameLogic.js
// Utility functions for quiz logic with text and image support

/**
 * Generates a set of answer options for a question, including the correct answer and random distractors.
 * @param {Array} allAnswers - Array of all possible answers (objects with text and image).
 * @param {Object} correctAnswer - The correct answer object.
 * @param {number} numOptions - Number of options to display.
 * @returns {Array} - Shuffled array of answer options.
 */
export function generateOptions(allAnswers, correctAnswer, numOptions) {
  // Exclude the correct answer from distractors
  const distractors = allAnswers.filter(ans => ans.text !== correctAnswer.text);
  // Shuffle distractors
  const shuffled = distractors.sort(() => 0.5 - Math.random());
  // Pick (numOptions - 1) distractors
  const options = [correctAnswer, ...shuffled.slice(0, numOptions - 1)];
  // Shuffle final options
  return options.sort(() => 0.5 - Math.random());
}

/**
 * Gets the number of options for a given level (level 1 = 2 options, up to level 7 = 8 options).
 * @param {number} level - The current level (1-7).
 * @returns {number}
 */
export function getNumOptionsForLevel(level) {
  return Math.min(2 + (level - 1), 8); // Level 1: 2, Level 2: 3, ..., Level 7+: 8
}
