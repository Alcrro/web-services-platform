import { AuthAPI } from "../infrastructure/auth.api";
import { RegisterInput } from "./validators/registerSchema";

export class AuthAction {
  private authApi = new AuthAPI();

  async loginAction(data: { email: string; password: string }) {
    try {
      await this.authApi.login(data.email, data.password);
      return { success: true, message: "You are logged in successfully!" };
    } catch (error) {
      console.error("LoginAction error:", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  }

  async registerAction(data: RegisterInput) {
    try {
      const { name, email, password } = data;
      await this.authApi.register(name, email, password);
      return { success: true, message: "You are registered successfully!" };
    } catch (error) {
      console.error("RegisterAction error:", error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  }
}
