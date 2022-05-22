export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, profileAvatar }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo(info) {
    this._profileTitle.textContent = info.name;
    this._profileSubtitle.textContent = info.about;
    this._profileAvatar.src = info.avatar;
  }
}
