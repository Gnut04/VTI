import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.createUser(req.body);

    const userResponse = user.toObject();

    delete userResponse.password;

    res.status(201).json({
      success: true,
      data: userResponse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Create user failed",
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await userService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get users failed",
    });
  }
};