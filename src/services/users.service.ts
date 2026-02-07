const baseUrl = "http://localhost:3001/users"

export const userService = {
    getAll : async () =>  {
        const data = await fetch(baseUrl);
        return data.json();
    }
}