import AuthService from "../services/auth.service";
const session = window.sessionStorage;

class AuthToken {
  setToken(value, expiry, isPresist = false) {
    const item = {
      value,
      expiry,
    };
    if (isPresist) {
      localStorage.setItem("token", JSON.stringify(item));
    } else {
      session.setItem("token", JSON.stringify(item));
    }
  }

  getToken() {
    const itemStr = session.getItem("token") || localStorage.getItem("token");
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = Math.round(new Date() / 1000);
    if (now > item.expiry) {
      AuthService.logout();
      return null;
    }
    return item.value;
  }
}

export default new AuthToken();
