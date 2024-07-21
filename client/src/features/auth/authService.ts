import axios from "axios";

const API_URL = "/api/users";

interface UserRegisterProps {
  name: string;
  email: string;
  password: string;
}

interface UserLoginProps {
  email: string;
  password: string;
}

// Register user
const register = async (userData: UserRegisterProps) => {
  const response = await axios.post("http://localhost:5000/api/users", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: UserLoginProps) => {
  const response = await axios.post(
    "http://localhost:5000/api/users" + "/login",
    {
      email: userData.email,
      password: userData.password,
    }
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
