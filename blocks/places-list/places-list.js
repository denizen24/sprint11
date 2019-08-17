import Card from './blocks/place-card/place-card';

export default class CardList {
    constructor(domEl, arrCard) {
      this.domEl = domEl;
      this.arrCard = arrCard;
    };

    addCard(name, link) {
      const card = new Card(name, link);
      this.domEl.appendChild(card.create());
    }

    render() {
      this.arrCard.forEach(card => {
          this.addCard(card.name, card.link)
      });
    }
}