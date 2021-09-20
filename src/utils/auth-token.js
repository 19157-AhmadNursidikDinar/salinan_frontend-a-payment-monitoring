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
      this.removeToken();
      return null;
    }
    return item.value;
  }

  removeToken() {
    const sessionToken = localStorage.getItem("token");
    if (sessionToken) {
      localStorage.removeItem("token");
    }
    const localStorageToken = window.sessionStorage.getItem("token");
    if (localStorageToken) {
      window.sessionStorage.removeItem("token");
    }
  }
}

export default new AuthToken();
