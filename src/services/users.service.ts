import type { User } from "../types/user.type";

const baseUrl = "http://localhost:3001/users";

export const userService = {
  getAll: async () => {
    const res = await fetch(baseUrl);
    if(res.ok){
        return res.json();
    }
    throw new Error("Error while fetching users")
  },

  getBy: async (id: number | string) => {
    const res = await fetch(baseUrl + `?id=${id}`);
    if(res.ok){
        const data =await res.json();
        console.log(data)
        if(data.length == 0){
            throw new Error("User does not exist");
        }
        return data;
    }
    throw new Error("Error while fetching user")
    
  },

  create: async (user: User) => {
    const users = await userService.getAll();
    const isUserExist = users.some((u: User) => u.emailAddress === user.emailAddress);
    if(isUserExist){
        throw new Error("User already exists");
    }
    const res = await fetch(baseUrl, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),

    });
    if(!res.ok){
        throw new Error("Failed to create User");
    }
    
  },

  update: async (user: User) => {
    const users = await userService.getAll();
    const isUserExist = users.some((u: User) => u.emailAddress === user.emailAddress && u.id !== user.id);
    if(isUserExist){
        throw new Error("User already exists");
    }
    const res = await fetch(baseUrl + `/${user.id}`,{
        method: "Put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    if(!res.ok){
        throw new Error("Failed to update User");
    }
  },

  delete: async (id: number) => {
    const res = await fetch(baseUrl + `/${id}`, {
        method: "delete"
    })
    if(!res.ok){
        throw new Error("Failed to delete User");
    }
  }
};
