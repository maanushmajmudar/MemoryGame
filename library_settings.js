// library_settings.js
const settings = {
    getPlayerName: () => sessionStorage.getItem("Player") || "Gamer",
    setPlayerName: (name) => sessionStorage.setItem("Player", name),
    getNumOfCards: () => parseInt(sessionStorage.getItem("Cards")) || 48,
    setNumOfCards: (num) => sessionStorage.setItem("Cards", num.toString())
  };
  
  export default settings;
  