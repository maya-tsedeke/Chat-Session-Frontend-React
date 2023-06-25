import { User } from "../types";

export const findUserByEmail = async (email: string,password:string): Promise<User | undefined> => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + '/data.json');
    const data = await response.json();
    const users: User[] = data.users;

    return users.find((user) => user.email === email && user.password === password);
  } catch (error) {
    console.log('Error fetching user data:', error);
    return undefined;
  }
};
