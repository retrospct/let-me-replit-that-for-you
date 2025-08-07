import { type User, type InsertUser, type Demo, type InsertDemo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemo(demo: InsertDemo): Promise<Demo>;
  getDemo(id: string): Promise<Demo | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private demos: Map<string, Demo>;

  constructor() {
    this.users = new Map();
    this.demos = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemo(insertDemo: InsertDemo): Promise<Demo> {
    const id = randomUUID();
    const demo: Demo = { 
      ...insertDemo, 
      id,
      createdAt: new Date()
    };
    this.demos.set(id, demo);
    return demo;
  }

  async getDemo(id: string): Promise<Demo | undefined> {
    return this.demos.get(id);
  }
}

export const storage = new MemStorage();
