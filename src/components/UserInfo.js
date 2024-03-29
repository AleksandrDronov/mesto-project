export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, profileAvatar }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileSubtitle.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = about;
    this._profileAvatar.src = avatar;
    this.userId = _id;
  }
}
