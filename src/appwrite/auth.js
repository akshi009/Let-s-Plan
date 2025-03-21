import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async Signup({ email, password, name }) {
    try {
      const newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      if (newUser) {
        // Attempt to login after successful signup
        const session = await this.login({ email, password });
        return session;
      }
      
      return newUser;
    } catch (error) {
      console.log(error, ": in signup appwrite");
      throw error; // Rethrow to allow handling in UI
    }
  }

  async login({ email, password }) {
    try {
      // Check if a session already exists
      const existingSession = await this.account.getSession("current").catch(() => null);

      if (existingSession) {
        console.log("User already has an active session:", existingSession);
        return existingSession; // Avoid re-login
      }

      // If no session exists, proceed with login
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Login successful:", session);
      return session;
    } catch (error) {
      console.error("Error in login:", error);
      throw error; // Rethrow to allow handling in UI
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      console.log(user, ":fetch user from appwrite");
      return user;
    } catch (error) {
      console.log(error, " :error in fetching user");
      return null; // Return null to indicate no user is logged in
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return { success: true };
    } catch (error) {
      console.log(error, " :error in logout in appwrite");
      throw error; // Rethrow to allow handling in UI
    }
  }
  
  // You might want to add this helper method
  async isLoggedIn() {
    try {
      const user = await this.getUser();
      return !!user; // Convert to boolean
    } catch {
      return false;
    }
  }
}

const auth = new Service();
export default auth;