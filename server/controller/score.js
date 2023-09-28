import * as vdtReposisory from "../data/score.js";

export async function getPostureScores(req, res) {
  const user_id = req.query.user_id;
  const data = await vdtReposisory.getAllByUsername(user_id);
  res.status(200).json(data);
}

export async function getPostureScore(req, res, next) {
  const user_id = req.params.id;
  const postureScore = await vdtReposisory.getById(user_id);
  if (postureScore) {
    res.status(200).json(postureScore);
  } else {
    res.status(404).json({ message: `Tweet id(${user_id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { user_id, score, time } = req.body;
  const postureScore = await vdtReposisory.create(user_id, score, time);
  res.status(201).json(postureScore);
}
