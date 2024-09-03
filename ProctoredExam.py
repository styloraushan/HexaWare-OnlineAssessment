import cv2
import mediapipe as mp
import time

mp_face_mesh = mp.solutions.face_mesh
mp_pose = mp.solutions.pose
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5)
pose = mp_pose.Pose(min_detection_confidence=0.5)

cap = cv2.VideoCapture(0)


def log_message(level, message):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(f"[{level}] {timestamp} - {message}")


def detect_eye_movement(landmarks):
    left_eye_top = landmarks[159].y
    left_eye_bottom = landmarks[145].y
    right_eye_top = landmarks[386].y
    right_eye_bottom = landmarks[374].y

    eye_movement = abs(left_eye_top - left_eye_bottom) > 0.01 or abs(right_eye_top - right_eye_bottom) > 0.01
    return eye_movement


def detect_body_movement(landmarks):
    shoulder_left = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
    shoulder_right = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y
    body_movement = abs(shoulder_left - shoulder_right) > 0.05
    return body_movement


while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_results = face_mesh.process(rgb_frame)
    body_results = pose.process(rgb_frame)

    # Check for eye movement

    if face_results.multi_face_landmarks:
        for face_landmarks in face_results.multi_face_landmarks:
            if detect_eye_movement(face_landmarks.landmark):
                log_message("SECURITY", "Suspicious Behavior Detected: Unusual Eye Movement")
                log_message("INFO", "User Warned: Suspicious Activity")

    # Check for body movement

    if body_results.pose_landmarks:
        if detect_body_movement(body_results.pose_landmarks.landmark):
            log_message("SECURITY", "Suspicious Behavior Detected: Unusual Body Movement")
            log_message("INFO", "User Warned: Suspicious Activity")

    cv2.imshow('Proctored Exam', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
