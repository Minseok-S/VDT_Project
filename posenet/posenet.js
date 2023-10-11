// 비디오 및 캔버스 엘리먼트 가져오기
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let shouldStop = false; // 프로그램을 멈추기 위한 플래그

// PoseNet 모델 선언
let posenetModel;

// 웹캠을 활성화하고 비디오 스트림을 연결합니다.
startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) // 웹캠에서 오디오를 사용하지 않음
    .then(function (stream) {
      video.srcObject = stream; // 비디오 스트림을 비디오 엘리먼트에 연결
    });
  startButton.disabled = true; // 시작 버튼 비활성화
  stopButton.disabled = false; // 종료 버튼 활성화
  shouldStop = false; // 측정 중으로 설정
  predict(); // 측정 시작
});

// PoseNet 모델 로드 및 전역 변수에 할당
posenet.load().then((model) => {
  posenetModel = model; // 전역 변수에 모델 할당
  video.onloadeddata = (e) => {
    // 비디오가 load된 다음에 predict하도록 합니다. (안하면 콘솔에 에러가 발생할 수 있습니다)
    predict();
  };
});

const frame = 300; // 프레임 수 설정
let frameCount = 0; // 프레임 수를 세는 변수

// predict() 함수를 전역 함수로 정의
function predict() {
  const totalX = Array(7).fill(0);
  const totalY = Array(7).fill(0);

  // 프레임마다 포즈 추정 함수를 호출합니다.
  posenetModel.estimateSinglePose(video).then((pose) => {
    // 캔버스 크기를 비디오 크기와 일치하도록 설정합니다.
    canvas.width = video.width;
    canvas.height = video.height;

    // PoseNet에서 추정한 포즈 정보를 로그로 출력합니다.
    // console.log("Pose Estimation Result:", pose);

    // 정면을 바라보고 있는지 확인하고 포즈 정보를 처리합니다.
    if (pose.keypoints[2].score >= 0.7 && pose.keypoints[3].score >= 0.7) {
      // 키포인트의 위치를 합산합니다.
      [1, 2, 5, 6].forEach((i) => {
        totalX[i] += pose.keypoints[i].position.x;
        totalY[i] += pose.keypoints[i].position.y;
      });

      frameCount++; // 프레임 수 증가
    } else {
      // console.log("정면을 바라보세요");
    }

    // 5초(150프레임) 동안의 평균을 계산하고 출력합니다.
    if (frameCount === frame) {
      const avgX = totalX.map((sum) => sum / frame);
      const avgY = totalY.map((sum) => sum / frame);

      const VectorX = avgX[5] - avgX[6] - (avgX[1] - avgX[2]);
      const VectorY = avgY[5] - avgY[6] - (avgY[1] - avgY[2]);
      const angleRadians = Math.atan2(VectorY, VectorX);
      const angleDegrees = ((angleRadians * 180) / Math.PI).toFixed(3);

      console.log(angleDegrees);
      if (angleDegrees > 10 || angleDegrees < -10) {
        alert("자세를 바로하세요");
      }
      frameCount = 0; // 프레임 수를 세는 변수
    }

    // 프로그램을 멈추는 조건을 검사하고, 조건이 충족되면 종료합니다.
    if (shouldStop) {
      return;
    }

    // 키포인트와 스켈레톤을 그리는 함수를 호출합니다.
    drawKeypoints(pose.keypoints, 0.6, context); // 키포인트 그리기 (정확도 설정 가능)

    // 프레임마다 재귀적으로 predict 함수를 호출합니다.
    requestAnimationFrame(predict);
  });
}

const color = "aqua"; // 그리기에 사용할 색상 설정

const drawPoint = (ctx, y, x, r, color) => {
  // 지정한 위치에 원을 그리는 함수
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color; // 원의 색상 설정
  ctx.fill();
};

const drawKeypoints = (keypoints, minConfidence, ctx, scale = 1) => {
  // 키포인트 그리기 함수
  keypoints.forEach((keypoint, i) => {
    if ([1, 2, 5, 6].includes(i)) {
      const { y, x } = keypoint.position;
      if (keypoint.score >= minConfidence) {
        drawPoint(ctx, y * scale, x * scale, 3, color); // 원의 반지름 3으로 키포인트 그리기
      }
    }
  });
};

// 종료 버튼 클릭 시 측정 종료
stopButton.addEventListener("click", () => {
  shouldStop = true;
  startButton.disabled = false; // 시작 버튼 활성화
  stopButton.disabled = true; // 종료 버튼 비활성화
});
