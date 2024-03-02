// library_cards.js
const cards = (function() {
    const cardBackSrc = "images/back.png";
    const blankCardSrc = "images/blank.png";
    const numOfImages = 24;
  
    function preloadImages() {
      const images = [];
      for (let i = 1; i <= numOfImages; i++) {
        images.push(`images/card_${i}.png`);
      }
      return images;
    }
  
    function createCardHtml(id, imgSrc) {
      return `<a href="#" id="${id}"><img src="${imgSrc}" class="defaultCard" alt="Back"/></a>`;
    }
  
    function flipCardWithFade(card) {
      const img = card.find("img");
      img.fadeOut(500, function() {
        img.attr("src", blankCardSrc);
        img.fadeIn(500);
      });
    }
  
    function flipCardWithSlide(card) {
      const img = card.find("img");
      img.slideUp(1000, function() {
        img.attr("src", blankCardSrc);
        img.slideDown(1000);
      });
    }
  
    return {
      cardBackSrc,
      blankCardSrc,
      numOfImages,
      preloadImages,
      createCardHtml,
      flipCardWithFade,
      flipCardWithSlide
    };
  })();
  
  export default cards;
  