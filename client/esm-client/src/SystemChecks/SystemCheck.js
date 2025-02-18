import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { FaArrowUp } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './SystemCheck.css'; // Ensure the correct path to your CSS file

const { confirm } = Modal;

const SystemCheck = () => {
  const [webcamStatus, setWebcamStatus] = useState('');
  const [microphoneStatus, setMicrophoneStatus] = useState('');
  const [browserStatus, setBrowserStatus] = useState('');
  const [internetStatus, setInternetStatus] = useState('');
  
  const history = useHistory(); // Access the history object

  useEffect(() => {
    checkWebcamAndMicrophone();
    checkBrowserCompatibility();
    checkInternetConnection();
  }, []);

  // Check if the webcam and microphone are available
  const checkWebcamAndMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setWebcamStatus('Available');
      setMicrophoneStatus('Available');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setWebcamStatus('Not available');
      setMicrophoneStatus('Not available');
    }
  };

  // Check browser version (for example: Chrome, Firefox, Safari)
  const checkBrowserCompatibility = () => {
    const browserName = getBrowserName();
    if (browserName === 'Chrome' || browserName === 'Firefox' || browserName === 'Safari') {
      setBrowserStatus('Compatible');
    } else {
      setBrowserStatus('Not compatible');
    }
  };

  // Helper function to detect browser name
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) return "Safari";
    return "Unknown";
  };

  // Check internet connection
  const checkInternetConnection = () => {
    if (navigator.onLine) {
      setInternetStatus('Connected');
    } else {
      setInternetStatus('Disconnected');
    }

    // Listen for changes in internet connectivity
    window.addEventListener('online', () => setInternetStatus('Connected'));
    window.addEventListener('offline', () => setInternetStatus('Disconnected'));
  };

  // Handle the next button click event
  const handleNextClick = (event) => {
    event.preventDefault(); // Prevent default navigation

    // Perform the AJAX request to send system check results to the server
    $.ajax({
      url: "/systemCheck",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        webcamStatus: webcamStatus,
        microphoneStatus: microphoneStatus,
        browserStatus: browserStatus,
        internetStatus: internetStatus
      }),
      success: function (response) {
        console.log(response);
        // Redirect based on the server's response (like result.html)
        window.location.href = "/AttemptTest" + response['output'];
      },
      error: function (xhr, status, error) {
        console.error("AJAX request failed:", error);
      }
    });
  };

  // Handle test start confirmation
  const handleStartTest = () => {
    confirm({
      title: "Do you want to start the test now?",
      icon: <ExclamationCircleOutlined />,
      content: "Once you click OK, the timer will start!",
      onOk() {
        console.log("Starting the test...");
        history.push("/start-test"); // Use history.push for navigation
      },
      onCancel() {
        console.log("Test start cancelled.");
      },
    });
  };

  return (
    <div>
      <main className="table">
        <section className="table__header">
          <h1>System Compatibility Check</h1>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Device <span className="icon-arrow"><FaArrowUp /></span></th>
                <th>Status <span className="icon-arrow"><FaArrowUp /></span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Webcam:</td>
                <td><p id="webcam-status">{webcamStatus}</p></td>
              </tr>
              <tr>
                <td>Microphone:</td>
                <td><p id="microphone-status">{microphoneStatus}</p></td>
              </tr>
              <tr>
                <td>Browser:</td>
                <td><p id="browser-status">{browserStatus}</p></td>
              </tr>
              <tr>
                <td>Internet Connection:</td>
                <td><p id="internet-status">{internetStatus}</p></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section-button">
          <div className="nextButton">
            {/* <a href="#" className="next" onClick={handleNextClick}>Next &raquo;</a> */}
            {/* <button className="startTestButton" onClick={handleStartTest}>Start Test</button> */}
            <button className="next" onClick={handleStartTest}>Start Test</button>
          </div>
         
        </section>
      </main>
    </div>
  );
};

export default SystemCheck;