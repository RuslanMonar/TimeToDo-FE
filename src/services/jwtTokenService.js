import { jwtDecode } from "jwt-decode";

export const GetUserInfoFromToken = (token) => {
    var user = jwtDecode(token);  // Використовуємо 'decode', а не 'jwt_decode'
    user = { name: user.unique_name, id: user.nameid, email: user.email };
    return user;
};