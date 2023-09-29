import * as userRepository from "./user.js";

let scores = [
  {
    userID: "1",
    date: Date.now().toString(),
    score: "58",
    time: "12342",
  },
  {
    userID: "2",
    date: Date.now().toString(),
    score: "78",
    time: "52535",
  },
  {
    userID: "1",
    date: Date.now().toString(),
    score: "23",
    time: "12412",
  },
];

export async function getAll() {
  return Promise.all(
    scores.map(async (score) => {
      const { username, email, createAt } = await userRepository.findById(
        score.userID
      );
      return { ...score, username, email, createAt };
    })
  );
}

export async function getById(id) {
  const found = scores.find((score) => score.userID === id);
  if (!found) {
    return null;
  }
  const { username, email, createAt } = await userRepository.findById(
    found.userID
  );
  return { ...found, username, email, createAt };
}

export async function getAllByUserId(userID) {
  return getAll().then((scores) =>
    scores.filter((score) => score.userID === userID)
  );
}

export async function create(userID, score, time) {
  const scoreData = {
    userID,
    date: new Date(),
    score,
    time,
  };
  scores = [scoreData, ...scores];
  return getById(scoreData.userID);
}

export async function update(id, text) {
  const score = scores.find((score) => score.userID === id);
  if (score) {
    score.text = text;
  }
  return getById(score.userID);
}
