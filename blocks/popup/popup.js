export default class Popup {
    constructor(popupElement, openedClass) {
        this.popupElement = popupElement;
        this.openedClass = openedClass;
    }

    open() {
        this.popupElement.classList.add(this.openedClass)
    }

    close() {
        this.popupElement.classList.remove(this.openedClass)
    }
}