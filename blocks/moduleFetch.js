export default class ModuleFetch {
    constructor() {
      this.token = '77cc3d84-97a1-47d6-8548-cefc66c159d6';
      this.cohortId = 'cohort0';
      this.ipValue = 'https://praktikum.tk';
    }
    userEdit(name, about) {
        return fetch(`${this.ipValue}/${this.cohortId}/users/me`, {
          method: 'PATCH',
          headers: {
              authorization: this.token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              about: about
          })
        })
    }
    authorCheck() {
      return fetch(`${this.ipValue}/${this.cohortId}/users/me`, {
        headers: {
          authorization: this.token
        }
      })
    }
    cardsBaseSet() {
      return fetch(`${this.ipValue}/${this.cohortId}/cards`, {
        headers: {
          authorization: this.token
        }
      })
    }
  };