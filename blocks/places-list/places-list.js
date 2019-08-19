import Card from '../place-card/place-card';

export default class PlacesList {
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