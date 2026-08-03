import { BaseAPI } from "@/infrastructure/api/BaseAPI";

export class AuthAPI extends BaseAPI {
  protected BASE_PATH = "/api/auth";

  async login(email: string, password: string) {
    return this.request("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request(`/sign-up`, {
      method: "POST",
      headers: { "Contend-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  }

  async refreshAccess(refreshToken: string): Promise<{ token: string }> {
    return this.request(`/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  async logout() {
    return this.request(`/logout`, {
      credentials: "include",
    });
  }
}
