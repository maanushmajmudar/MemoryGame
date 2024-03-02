// library_scores.js
const scores = (function() {
    let numTurns = 0;
    let numMatches = 0;
  
    function incrementTurns() {
      numTurns++;
    }
  
    function incrementMatches() {
      numMatches++;
    }
  
    function isGameComplete(numOfPairs) {
      return numMatches === numOfPairs;
    }
  
    function calculatePercentage() {
      return ((numMatches / numTurns) * 100).toFixed(2);
    }
  
    function compareAndUpdateHighScore(playerName, percentage) {
      const currentHighScore = parseFloat(localStorage.getItem(playerName)) || 0;
      if (percentage > currentHighScore) {
        localStorage.setItem(playerName, percentage.toString());
      }
    }
  
    function displayHighScore(playerName) {
      return localStorage.getItem(playerName) || "N/A";
    }
  
    return {
      incrementTurns,
      incrementMatches,
      isGameComplete,
      calculatePercentage,
      compareAndUpdateHighScore,
      displayHighScore
    };
  })();
  
  export default scores;
  