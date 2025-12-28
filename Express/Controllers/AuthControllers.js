const express = require("express");
const jwt = require("jsonwebtoken");
const { use } = require("..");

const users = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    password: "12345",
    role: "admin",
  },
  {
    id: 2,
    name: "Sid",
    email: "sid@example.com",
    password: "12345",
    role: "user",
  },
];

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOPKEN, {
    expiresIn: parseInt(process.env.TOKEN_JWT_EXPIRES),
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  // 1. Check Input
  if (!email || !password) {
    return res.status(400).json({
      status: "Fail",
      message: "Please provide email and password",
    });
  }
  //   2. Check user Exists or not
  const user = users.find((u) => u.email === email && u.password == password);
  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }
  const token = signToken(user.id);
  res.status(200).json({
    status: "Success",
    token,
    details: {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

exports.signUp = (req, res) => {
  const { name, email, password, role } = req.body;
  // check user exists or not
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      status: "fail",
      message: "User already exists",
    });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: role || "user",
  };
  users.push(newUser);
  const token = signToken(newUser.id);
  res.status(201).json({
    status: "Success",
    token,
    data: newUser,
  });
};
