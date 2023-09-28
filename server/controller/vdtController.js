import * as vdtRepository from "../data/vdtData";

// GET /vdt
// GET /tweets?username=:username
export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? vdtRepository.getAllByUsername(username) // 특정 사용자의 트윗 목록을 가져옴
    : vdtRepository.getAll()); // 모든 트윗 목록을 가져옴
  res.status(200).json(data); // 성공적으로 데이터를 가져와 클라이언트에게 응답
}

//GET /vdt
//GET /

// GET /tweets/:id
export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await vdtRepository.getById(id); // 주어진 id에 해당하는 트윗을 가져옴
  if (tweet) {
    res.status(200).json(tweet); // 트윗이 존재하면 클라이언트에게 응답
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` }); // 트윗이 없으면 404 에러 응답
  }
}

// POST /tweeets
export async function createTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = await vdtRepository.create(text, name, username); // 새로운 트윗 생성
  res.status(201).json(tweet); // 생성된 트윗 정보를 클라이언트에게 응답
}

// PUT /tweets/:id
export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await vdtRepository.update(id, text); // 주어진 id의 트윗을 업데이트
  if (tweet) {
    res.status(200).json(tweet); // 업데이트된 트윗 정보를 클라이언트에게 응답
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` }); // 트윗이 없으면 404 에러 응답
  }
}

// DELETE /tweets/:id
export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await vdtRepository.remove(id); // 주어진 id의 트윗 삭제
  res.sendStatus(204); // 성공적으로 삭제되면 204(No Content) 응답
}
