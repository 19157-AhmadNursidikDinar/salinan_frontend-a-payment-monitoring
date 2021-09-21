import AuthToken from "../utils/auth-token";

export default function authHeader() {
  const token = AuthToken.getToken();
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
