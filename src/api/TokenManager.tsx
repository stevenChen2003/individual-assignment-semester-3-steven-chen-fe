import jwt_decode from "jwt-decode";

const TokenManager = {
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  getClaims: () => {
      if (!sessionStorage.getItem("claims")) {
          return undefined;
      }
      return JSON.parse(sessionStorage.getItem("claims"));
  },
  setAccessToken: (token) => {
      sessionStorage.setItem("accessToken", token);
      const claims = jwt_decode(token);
      sessionStorage.setItem("claims", JSON.stringify(claims));
      return claims;
  },
  clear: () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("claims");
  }
}

export default TokenManager;

