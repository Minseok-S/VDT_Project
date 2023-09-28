import cv2
import numpy as np
import pyopenpose as op

# OpenPose 설정 로드
params = dict()
params["model_folder"] = "openpose/models"  # OpenPose 모델 경로

# OpenPose 초기화
opWrapper = op.WrapperPython()
opWrapper.configure(params)
opWrapper.start()

# 웹캠에서 비디오 스트림 읽기
cap = cv2.VideoCapture(0)  # 0은 기본 웹캠을 의미, 다른 카메라를 사용하려면 인덱스 변경

while True:
    # 프레임 읽기
    ret, frame = cap.read()

    if not ret:
        break

    # OpenPose로 포즈 검출 수행
    datum = op.Datum()
    datum.cvInputData = frame
    opWrapper.emplaceAndPop([datum])

    # 포즈 검출 결과 가져오기
    pose_keypoints = datum.poseKeypoints

    # 결과 그리기
    if pose_keypoints is not None:
        # OpenPose 결과를 화면에 그립니다.
        cv2.imshow("OpenPose", datum.cvOutputData)

    # 'q' 키를 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 리소스 해제 및 창 닫기
cap.release()
cv2.destroyAllWindows()
