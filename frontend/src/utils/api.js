class Api {
  constructor({ baseUrl, headers, apiKey }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  /**
   * Returns a Promise of type Response that waits for user information and card data from server
   * @returns Promise<Response>
   */
  getAppInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  /**
   *Returns a Promise of type Response that yields user avatar
   * @param {String} avatar url of the user's profile
   * @returns Promise<Response>
   */
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(this._handleResponse);
  }

  /**
   * Returns a Promise of type Response that yields a
   * single card given an ID
   * @param {String} cardId that corresponds to a card
   * @returns Promise<Response>
   */
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._handleResponse);
  }

  /**
   * Returns if the card is liked or not. Depending on it deletes or adds a like
   * @param {*String} cardId
   * @param {*Boolean} isLiked
   * @returns Promise<Response>
   */
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._handleResponse);
  }
}

const TOKEN = "6af9648e-23ea-4651-bc48-5ca8b1b3f30e";
const GROUP_ID = "group-10";

//  export instance of Api
const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${GROUP_ID}`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
