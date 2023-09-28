const imageInput = document.getElementById("imageInput");
const inputImage = document.getElementById("inputImage");
const outputCanvas = document.getElementById("outputCanvas");
const outputContext = outputCanvas.getContext("2d");

let net;

imageInput.addEventListener("change", handleImage);

// Load PoseNet model
posenet.load().then((model) => {
  net = model;
});

function handleImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      inputImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

inputImage.onload = async function () {
  if (net) {
    const image = inputImage;
    const pose = await estimatePose(image);
    drawPose(pose, image);
  }
};

async function estimatePose(imageElement) {
  const image = tf.browser.fromPixels(imageElement);
  const pose = await net.estimateSinglePose(image);
  image.dispose(); // Release the tensor memory
  return pose;
}

function drawPose(pose, imageElement) {
  // Resize the canvas to match the image dimensions
  outputCanvas.width = imageElement.width;
  outputCanvas.height = imageElement.height;

  // Draw the image on the canvas
  outputContext.drawImage(
    imageElement,
    0,
    0,
    imageElement.width,
    imageElement.height
  );

  // Draw keypoints and skeleton
  const minPartConfidence = 0.01; // Minimum confidence score to render a keypoint

  pose.keypoints.forEach((keypoint, i) => {
    if (keypoint.score >= minPartConfidence) {
      const { y, x } = keypoint.position;
      drawPoint(outputContext, x, y, 3, "red");
      console.log(
        `Keypoint ${i}: ${keypoint.part}, (x: ${x}, y: ${y}, Score: ${keypoint.score})`
      );
    }
  });

  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    pose.keypoints,
    minPartConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      keypoints[0].position,
      keypoints[1].position,
      "red",
      2,
      outputContext
    );
  });
}

function drawPoint(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
