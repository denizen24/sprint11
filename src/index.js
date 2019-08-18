import "../src/style.css";
import CardList from '../blocks/places-list/places-list';
import Popup from '../blocks/popup/popup';

fetch('http://praktikum.tk/cohort0/users/me', {
    headers: {
        authorization: '77cc3d84-97a1-47d6-8548-cefc66c159d6'
    }
})
    
    .then((res) => {if (res.ok) {
    return res.json();}
    })

    .then((result) => {
        document.querySelector('.user-info__name').textContent = result.name;
        document.querySelector('.user-info__job').textContent = result.about;
        document.querySelector('.user-info__photo').style = `background-image: url(${result.avatar})`;
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
    })

let initialCards = [];

fetch('http://praktikum.tk/cohort0/cards', {
    headers: {
        authorization: '77cc3d84-97a1-47d6-8548-cefc66c159d6'
    }
})
    .then((res) => {if (res.ok) {
    return res.json();}
    })

    .then((result) => {
        initialCards = result;
        const dmEl = document.querySelector('.places-list');
        const cardList = new CardList(dmEl, initialCards);
        cardList.render();
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
    })

const dmEl = document.querySelector('.places-list');
const cardList = new CardList(dmEl, initialCards);
cardList.render();

const popupAddCard = new Popup(document.querySelector('.popup'), 'popup_is-opened');
const popupEdit = new Popup(document.querySelector('.popup1'), 'popup1_is-opened');
const popupImg = new Popup(document.querySelector('.popup2'), 'popup2_is-opened');

document.querySelector('.button').addEventListener('click', function (event) {
    popupAddCard.open();
})

document.querySelector('.button1').addEventListener('click', function (event) {
    popupEdit.open();
})

document.querySelector('.popup__close').addEventListener('click', function (event) {
    popupAddCard.close();
})

document.querySelector('.popup1__close').addEventListener('click', function (event) {
    popupEdit.close();
})

document.querySelector('.popup2__close').addEventListener('click', function (event) {
    popupImg.close();
})

const form = document.forms.new
const form1 = document.forms.new1

form.addEventListener('submit', function (event) {
    const fNew = document.forms.new
    const name = fNew.elements.name
    const link = fNew.elements.link

    if (name.value.length <= 0) {
        alert('Вы не ввели название!')
    } else {
        if (link.value.length <= 0) {
            alert('Вы не ввели ссылку на картинку!')
        } else {
            cardList.addCard(name.value, link.value);
            popupAddCard.close();
            form.reset();
        }
    }
    event.preventDefault()
})

form1.addEventListener('submit', function (event) {
    const name = form1.elements.name1
    const about = form1.elements.about

    if (name.value.length <= 0) {
        alert('Вы не ввели имя!')
    } else {
        if (about.value.length <= 0) {
            alert('Вы не ввели данные о себе!')
        } else {
            document.querySelector('.user-info__name').textContent = name.value
            document.querySelector('.user-info__job').textContent = about.value
            document.querySelector('.popup1__button').classList.remove('popup1__button__active')

            fetch('http://praktikum.tk/cohort0/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: '77cc3d84-97a1-47d6-8548-cefc66c159d6',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    about: about.value
                })
            })
                .then((res) => {if (res.ok) {
                    return res.json();}
                })

                .then((result) => {
                    console.log(result);
                })

                .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен');
                })
                .finally(() => {
                    popupEdit.close();
                });

        }
    }
    event.preventDefault();
})

form.addEventListener('input', function (event) {
    const name = form.elements.name
    const link = form.elements.link

    if ((name.value.length > 0) && (link.value.length > 0)) {
        document.querySelector('.popup__button').classList.add('popup__button__active')
    } else {
        document.querySelector('.popup__button').classList.remove('popup__button__active')
    }
})

function validaTor (elem1, elem2, elem3) {
  document.querySelector(elem1).setAttribute('style', 'display: flex')
  document.querySelector(elem1).innerHTML = elem2
  document.querySelector(elem3).setAttribute('disabled', 'true')
}

form1.addEventListener('input', function (event) {
    const name = form1.elements.name1
    const about = form1.elements.about

    document.querySelector('.error_name1').setAttribute('style', 'display: none')
    document.querySelector('.error_about').setAttribute('style', 'display: none')
    document.querySelector('.popup1__button').classList.remove('popup1__button__active')
    document.querySelector('.popup1__button').removeAttribute('disabled')

    if (name.value.length === 0) {
        validaTor('.error_name1', 'Это обязательное поле', '.popup1__button')
    }
    if (about.value.length === 0) {
        validaTor('.error_about', 'Это обязательное поле', '.popup1__button')
    }
    if ((name.value.length === 1) || (name.value.length > 30)) {
        validaTor('.error_name1', 'Должно быть от 2 до 30 символов', '.popup1__button')
    }
    if ((about.value.length === 1) || (about.value.length > 30)) {
        validaTor('.error_about', 'Должно быть от 2 до 30 символов', '.popup1__button')
    }
    if ((name.value.length > 1) && (about.value.length > 1)) {
        if ((name.value.length <= 30) && (about.value.length <= 30)) {
            document.querySelector('.popup1__button').classList.add('popup1__button__active')
            document.querySelector('.popup1__button').removeAttribute('disabled')
        } else {
            document.querySelector('.popup1__button').classList.remove('popup1__button__active')
            document.querySelector('.popup1__button').setAttribute('disabled', 'true')
        }
    }
})

form.addEventListener('input', function (event) {
    const name = form.elements.name
    const link = form.elements.link

    document.querySelector('.error_name').setAttribute('style', 'display: none')
    document.querySelector('.error_link').setAttribute('style', 'display: none')
    document.querySelector('.popup__button').classList.remove('popup__button__active')
    document.querySelector('.popup__button').removeAttribute('disabled')

    if (name.value.length === 0) {
        validaTor('.error_name', 'Это обязательное поле', '.popup__button')
    }
    if (link.value.length === 0) {
        validaTor('.error_link', 'Это обязательное поле', '.popup__button')
    }
    if ((name.value.length === 1) || (name.value.length > 30)) {
        validaTor('.error_name', 'Должно быть от 2 до 30 символов', '.popup__button')
    }
    if ((name.value.length > 1) && (link.value.length > 1)) {
        if ((name.value.length <= 30) && (link.value.length <= 30)) {
            document.querySelector('.popup__button').classList.add('popup__button__active')
            document.querySelector('.popup__button').removeAttribute('disabled')
        } else {
            document.querySelector('.popup__button').classList.remove('popup__button__active')
            document.querySelector('.popup__button').setAttribute('disabled', 'true')
        }
    }
    if (!(link.value.slice(0, 8) === 'https://') && !(link.value.slice(0, 7) === 'http://')) {
        document.querySelector('.error_link').setAttribute('style', 'display: flex')
        document.querySelector('.error_link').innerHTML = 'Здесь должна быть ссылка'
        document.querySelector('.popup__button').setAttribute('disabled', 'true')
        document.querySelector('.popup__button').classList.remove('popup__button__active')
    } else {
        document.querySelector('.popup__button').classList.add('popup__button__active')
        document.querySelector('.popup__button').removeAttribute('disabled')
    }
})
