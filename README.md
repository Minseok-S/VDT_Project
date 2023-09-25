
1. **사용자(User) 테이블**:
   - 테이블 이름: `users`
   - 열:
     - `user_id` (VARCHAR): 고유한 사용자 식별자 (기본키)
     - `user_name` (VARCHAR): 사용자 이름
     - `user_email` (VARCHAR): 이메일 주소
     - `user_pw` (VARCHAR): 비밀번호(암호화)
     - `user_nickname` (VARCHAR): 닉네임
     - `CreatedAt` (TIMESTAMP): 계정 생성 일시

2. **자세 점수표(PostureScore) 테이블**:
   - 테이블 이름: `posture_scores`
   - 열:
     - `score_id` (VARCHAR): 고유한 점수표 식별자 (기본키)
     - `user_id` (VARCHAR): 사용자 식별자 (외래 키)
     - `Date` (DATE): 자세 기록 날짜
     - `Score` (INT): 자세 점수
     - `time` (INT): 측정 시간


---
**1. 사용자 회원가입 API**
- 엔드포인트: POST /api/users/register
- 요청 형식:
```json
{
  "user_name": "John Doe",
  "user_email": "johndoe@example.com",
  "user_pw": "hashed_password",
  "user_nickname": "johndoe123"
}
```
- 응답 형식:
```json
{
  "message": "회원가입이 성공적으로 완료되었습니다."
}
```

**2. 사용자 로그인 API**
- 엔드포인트: POST /api/users/login
- 요청 형식:
```json
{
  "user_email": "johndoe@example.com",
  "user_pw": "hashed_password"
}
```
- 응답 형식:
```json
{
  "user_id": "user_id_here",
  "user_name": "John Doe",
  "user_nickname": "johndoe123",
  "access_token": "JWT_access_token_here"
}
```

**3. 자세 측정 API**
- 엔드포인트: POST /api/posture-scores
- 요청 형식:
```json
{
  "user_id": "user_id_here",
  "Date": "2023-09-25",
  "Score": 85,
  "time": 15
}
```
- 응답 형식:
```json
{
  "message": "자세 측정 데이터가 성공적으로 저장되었습니다."
}
```

**4. 자세 점수 조회 API**
- 엔드포인트: GET /api/posture-scores/:user_id
- 요청 형식: 사용자 ID를 엔드포인트에 포함시켜 해당 사용자의 자세 점수를 조회합니다.
- 응답 형식:
```json
{
  "user_id": "user_id_here",
  "user_name": "John Doe",
  "posture_scores": [
    {
      "Date": "2023-09-25",
      "Score": 85
    },
    {
      "Date": "2023-09-24",
      "Score": 90
    },
    ...
  ]
}
```

