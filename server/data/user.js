let users = [
  {
    userID: "bbb9316",
    username: "민석",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    email: "bob@gmail.com",
    createAt: "2023-07-12",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.userID === id);
}

export async function createUser(user) {
  const created = { ...user, createAt: Date.now().toString() };
  users.push(created);
  return created.userID;
}
