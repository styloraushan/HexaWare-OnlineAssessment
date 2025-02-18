import React from 'react';
import './Error.css'; // Ensure the correct path to your CSS file

const ExamSystemCheckError = () => {
    return (
        <div style={{ backgroundColor: '#e2e2e2' }}>
            <nav>
                <span>The Online Exam Proctor</span>
                <a href="/main">Logout</a>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img id="error" src={`${process.env.PUBLIC_URL}/assets/img/error.png`} alt="Error" />
                    </div>
                    <div className="col-md-9 mt-5">
                        <h1 style={{ marginTop: '30px' }}>
                            <img id="error1" src={`${process.env.PUBLIC_URL}/assets/img/error2.png`} alt="Error" />
                            System Compatibility Error
                            <img id="error2" src={`${process.env.PUBLIC_URL}/assets/img/error2.png`} alt="Error" />
                        </h1>
                        <div className="pag" style={{ marginTop: '80px' }}>
                            <p>
                                Sorry, your computer is not compatible with taking the online exam. Please use a computer with a webcam and voice recorder. If you have any questions, please contact the exam administrator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; The Online Exam Proctor System</p>
            </footer>
        </div>
    );
};

export default ExamSystemCheckError;
