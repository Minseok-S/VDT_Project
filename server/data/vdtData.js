let tweets = [
  // 초기 트윗 데이터
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
  },
];

// 모든 트윗을 반환
export async function getAll() {
  return tweets;
}

// 특정 사용자의 모든 트윗을 반환
export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

// 특정 id에 해당하는 트윗을 반환
export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

// 새로운 트윗 생성
export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(), // 고유한 id 생성
    text,
    createdAt: new Date().toString(), // 현재 시간을 생성일로 저장
    name,
    username,
  };
  tweets = [tweet, ...tweets]; // 새로운 트윗을 배열의 맨 앞에 추가
  return tweet;
}

// 특정 id에 해당하는 트윗을 업데이트
export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text; // 트윗 내용 업데이트
  }
  return tweet;
}

// 특정 id에 해당하는 트윗을 삭제
export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id); // 해당 id의 트윗을 배열에서 제거
}
