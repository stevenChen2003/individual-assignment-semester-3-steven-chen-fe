import { jwtDecode, JwtPayload } from 'jwt-decode';

let userData: { accessToken: string | undefined, claims: JwtPayload | undefined } = {
  accessToken: undefined,
  claims: undefined
}

const TokenManager = {
  getAccessToken: () => userData.accessToken,
  getClaims: () => {
      if (!userData.claims) {
          return undefined;
      }
      return userData.claims;
  },
  setAccessToken: (token: string) => {
      userData = { ...userData, accessToken: token };
      const claims = jwtDecode<JwtPayload>(token);
      userData = { ...userData, claims: claims };
      return claims;
  },
  clear: () => {
      userData = { ...userData, accessToken: undefined, claims: undefined };
  }
}

export default TokenManager;
