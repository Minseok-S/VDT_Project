import { validationResult } from "express-validator";

// 데이터 유효성 검사 미들웨어 함수
export const validate = (req, res, next) => {
  // 요청 데이터의 유효성을 검사하고 결과를 errors에 저장합니다.
  const errors = validationResult(req);

  // 검사 결과가 비어 있으면, 유효성 검사를 통과한 것이므로 다음 미들웨어로 넘깁니다.
  if (errors.isEmpty()) {
    return next();
  }

  // 검사 결과가 비어 있지 않으면, 유효성 검사에 실패한 것이므로 400 상태 코드와 에러 메시지를 응답으로 반환합니다.
  return res.status(400).json({ message: errors.array()[0].msg });
};
