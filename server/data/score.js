let postureScores = [
  {
    score_id: "1",
    user_id: "bbb9316",
    createdAt: Date.now().toString(),
    score: "66",
    time: "2937",
  },
  {
    score_id: "1",
    user_id: "bbb9316",
    createdAt: Date.now().toString(),
    score: "66",
    time: "2937",
  },
  {
    score_id: "1",
    user_id: "bbb9316",
    createdAt: Date.now().toString(),
    score: "66",
    time: "2937",
  },
  {
    score_id: "1",
    user_id: "bbb9316",
    createdAt: Date.now().toString(),
    score: "66",
    time: "2937",
  },
];

export async function getAllByUsername(id) {
  return postureScores.filter((Score) => Score.user_id === id);
}

export async function getById(id) {
  return postureScores.find((postureScore) => postureScore.user_id === id);
}

export async function create(text, name, username) {
  const postureScore = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  postureScores = [postureScore, ...postureScores];
  return postureScore;
}
