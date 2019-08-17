
export default class Card {// класс карточки
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.element = null;
        this.likeBtnElement = null;
    };

    create() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('place-card');

        const imgElement = document.createElement('div');
        imgElement.classList.add('place-card__image');
        imgElement.style = `background-image: url(${this.url})`;

        const btnElement = document.createElement('button');
        btnElement.classList.add('place-card__delete-icon');
        imgElement.appendChild(btnElement);

        const titleElement = document.createElement('div');
        titleElement.classList.add('place-card__description');
        const titleH3Element = document.createElement('h3');
        titleH3Element.classList.add('place-card__name');
        titleH3Element.textContent = this.name;
        titleElement.appendChild(titleH3Element);
        const likeBtnElement = document.createElement('button');
        likeBtnElement.classList.add('place-card__like-icon');
        titleElement.appendChild(likeBtnElement);

        cardElement.appendChild(imgElement);
        cardElement.appendChild(titleElement);

        this.element = cardElement;
        this.likeBtnElement = likeBtnElement;

        btnElement.addEventListener('click', this.remove.bind(this));
        likeBtnElement.addEventListener('click', this.like.bind(this));

        imgElement.addEventListener('click', this.showImgPopUp.bind(this));

        return this.element;
    }

    like() {
        this.likeBtnElement.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.element.parentNode.removeChild(this.element);
    }


    showImgPopUp (event) {
      if (event.target.classList.contains('place-card__image')) {
        document.querySelector('.popup2__image').setAttribute('src', this.url);
        popupImg.open();
    }
    }
}