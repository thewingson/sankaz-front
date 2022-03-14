export class JwtResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
  
    constructor(accessToken: string, refreshToken: string, userId: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.userId = userId;
    }
  }