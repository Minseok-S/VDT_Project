import * as userRepository from "./user.js";

let scores = [
  {
    userID: "bbb9316",
    date: new Date().toString(),
    score: "58",
    time: "12342",
  },
  {
    userID: "aaaa9316",
    date: new Date().toString(),
    score: "58",
    time: "12342",
  },
  {
    userID: "aaaa9316",
    date: new Date().toString(),
    score: "58",
    time: "12342",
  },
  {
    userID: "aaaa9316",
    date: new Date().toString(),
    score: "58",
    time: "12342",
  },
];

export async function getAll() {
  return Promise.all(
    scores.map(async (score) => {
      await userRepository.findById(score.userID);
      return { ...score };
    })
  );
}

export async function getById(id) {
  const found = scores.find((score) => score.userID === id);
  if (!found) {
    return null;
  }

  return { ...found };
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
