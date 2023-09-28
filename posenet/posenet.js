// 비디오 및 캔버스 엘리먼트 가져오기
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// 웹캠을 활성화하고 비디오 스트림을 연결
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false }) // 웹캠에서 오디오를 사용하지 않음
  .then(function (stream) {
    video.srcObject = stream; // 비디오 스트림을 비디오 엘리먼트에 연결
  });

// PoseNet 모델 로드
posenet.load().then((model) => {
  // 이곳의 model과 아래 predict의 model은 같아야 합니다.
  video.onloadeddata = (e) => {
    // 비디오가 load된 다음에 predict하도록 합니다. (안하면 콘솔에 에러가 발생할 수 있습니다)
    predict();
  };

  function predict() {
    // 프레임마다 포즈 추정 함수를 호출합니다.
    model.estimateSinglePose(video).then((pose) => {
      // 캔버스 크기를 비디오 크기와 일치하도록 설정합니다.
      canvas.width = video.width;
      canvas.height = video.height;

      // PoseNet에서 추정한 포즈 정보를 로그로 출력합니다.
      console.log("Pose Estimation Result:", pose);

      // 키포인트와 스켈레톤을 그리는 함수를 호출합니다.
      drawKeypoints(pose.keypoints, 0.6, context); // 키포인트 그리기 (정확도 설정 가능)
      drawSkeleton(pose.keypoints, 0.6, context); // 스켈레톤 그리기 (정확도 설정 가능)
    });

    // 프레임마다 재귀적으로 predict 함수를 호출합니다.
    requestAnimationFrame(predict);
  }
});

// TensorFlow.js에서 제공하는 파트
const color = "aqua"; // 그리기에 사용할 색상 설정
const boundingBoxColor = "red"; // 바운딩 박스의 색상 설정
const lineWidth = 2; // 그리기 선의 두께 설정

function toTuple({ y, x }) {
  return [y, x]; // TensorFlow.js PoseNet에서 사용되는 튜플로 변환
}

function drawPoint(ctx, y, x, r, color) {
  // 지정한 위치에 원을 그리는 함수
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color; // 원의 색상 설정
  ctx.fill();
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  // 두 점을 연결하는 선을 그리는 함수
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale); // 시작점 설정
  ctx.lineTo(bx * scale, by * scale); // 끝점 설정
  ctx.lineWidth = lineWidth; // 선의 두께 설정
  ctx.strokeStyle = color; // 선의 색상 설정
  ctx.stroke(); // 그리기
}

function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  // 스켈레톤 그리기 함수
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  // 키포인트 그리기 함수
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color); // 원의 반지름 3으로 키포인트 그리기
  }
}

function drawBoundingBox(keypoints, ctx) {
  // 바운딩 박스 그리기 함수
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY
  );

  ctx.strokeStyle = boundingBoxColor; // 바운딩 박스의 선의 색상 설정
  ctx.stroke(); // 바운딩 박스 그리기
}
