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

export async function getAllByUserId(id) {
  return scores.filter((score) => score.userID === id);
}

export async function create(userID, score, time) {
  const scoreData = {
    userID,
    date: new Date(),
    score,
    time,
  };
  scores = [scoreData, ...scores];
  return scoreData;
}

// 사용할지 안할지 미지수
export async function update(id, text) {
  const score = scores.find((score) => score.userID === id);
  if (score) {
    score.text = text;
  }
  return score;
}
