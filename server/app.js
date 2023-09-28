// 필요한 모듈을 가져옵니다.
import express from "express"; // Express.js 웹 프레임워크
import "express-async-errors"; // 비동기 오류 처리 미들웨어
import cors from "cors"; // CORS(Cross-Origin Resource Sharing) 처리 미들웨어
import morgan from "morgan"; // HTTP 요청 로깅 미들웨어
import helmet from "helmet"; // 보안 헤더 설정 미들웨어
import vdtRouter from "./router/vdtRouter.js"; // tweets 라우터 모듈

// Express 애플리케이션을 생성합니다.
const app = express();

// 미들웨어 설정
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어
app.use(helmet()); // 보안 관련 헤더 설정 미들웨어
app.use(cors()); // CORS 처리 미들웨어
app.use(morgan("tiny")); // HTTP 요청 로그 생성 미들웨어

// 라우팅 설정: '/vdt' 엔드포인트에 대한 요청은 vdtRouter로 전달됩니다.
app.use("/vdt", vdtRouter);

// 404 오류 처리 미들웨어: 어떤 경로에도 일치하지 않는 요청에 대해 404 응답을 보냅니다.
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 에러 처리 미들웨어: 미들웨어나 라우터에서 발생한 오류를 처리합니다.
app.use((error, req, res, next) => {
  console.error(error); // 콘솔에 오류를 출력합니다.
  res.sendStatus(500); // 500(서버 오류) 상태 코드를 응답으로 보냅니다.
});

// 서버를 8080 포트에서 실행합니다.
app.listen(8080);
