import User from "../models/user.model";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const createUser = async (data: CreateUserData) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create(data);

  return user;
};

export const getUsers = async () => {
  return User.find().select("-password");
};