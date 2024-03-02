// library_card.js
class Card {
    constructor(cardAnchor) {
      this.img = cardAnchor.find("img");
      this.id = cardAnchor.attr("id");
    }
  
    isCardBlankOrRevealed() {
      return this.img.attr("src") === cards.blankCardSrc || this.img.is(":hidden");
    }
  
    isMatchingCard(firstCardId) {
      return this.id === firstCardId;
    }
  }
  
  export default Card;
  