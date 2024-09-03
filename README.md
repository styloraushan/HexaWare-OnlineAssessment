# Proctored Exam System with Eye and Body Movement Detection

This project demonstrates a basic proctored exam system using OpenCV and Mediapipe in Python. The system monitors the user via their webcam and detects suspicious behaviors like unusual eye and body movements.

## Features

- **Real-Time Eye Movement Detection**: Detects unusual eye movements that could indicate cheating during an exam.
- **Real-Time Body Movement Detection**: Monitors for significant body movements that could be suspicious during a proctored exam.
- **Logging System**: Logs suspicious activities and warnings in real time.

## Requirements

- Python 3.x
- OpenCV
- Mediapipe

## Installation

1. Clone the repository:

    ```bash
    git clonegit remote add origin https://github.com/styloraushan/HexaWare-OnlineAssessment.git
git branch -M main
git push -u origin main
    cd your-repo
    ```

2. Install the required Python packages:

    ```bash
    pip install opencv-python mediapipe
    ```

## Usage

1. Run the script:

    ```bash
    python proctored_exam_detection.py
    ```

2. The system will access your webcam and start monitoring for eye and body movements.
3. If suspicious activity is detected, it will be logged in the console.

4. Press `q` to stop the monitoring and close the webcam feed.

## Code Overview

- **Main Script (`proctored_exam_detection.py`)**: The script initializes the Mediapipe models for face and pose detection, opens the webcam, and processes each frame to check for suspicious behaviors.

    ```python
    import cv2
    import mediapipe as mp
    import time

    # Initialize Mediapipe face and pose detection
    mp_face_mesh = mp.solutions.face_mesh
    mp_pose = mp.solutions.pose
    face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5)
    pose = mp_pose.Pose(min_detection_confidence=0.5)

    # Initialize video capture
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

    # Main loop
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert the BGR image to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the face and body
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

        # Show the camera feed
        cv2.imshow('Proctored Exam', frame)

        # Exit on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the resources
    cap.release()
    cv2.destroyAllWindows()
    ```

## How It Works

- **Eye Movement Detection**: The script calculates the vertical distance between certain facial landmarks around the eyes to detect movement.
- **Body Movement Detection**: It uses the shoulder landmarks to monitor significant changes in body position.

## Future Improvements

- Enhance the detection algorithms for better accuracy.
- Integrate a more sophisticated logging or alerting system.
- Add support for detecting additional suspicious behaviors.

## License

This project is licensed under the MIT License.
