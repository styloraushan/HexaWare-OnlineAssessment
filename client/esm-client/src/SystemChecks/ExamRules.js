import React from 'react';
import './Description.css'; // Make sure this path is correct

const ExamRules = () => {
    return (
        <main>
            {/* Navigation Bar */}
            <navbar>
                
                    
            
                <div className="right-links">
                    <a className="links" href="#section-diferenciais">Rules</a>
                    <a className="links" href="#section-header-prof">Requirements</a>
                </div>
            </navbar>

            {/* Section: Citação */}
            <section id="section-citação">
                <div className="container1">
                    <p className="quote">“As students take the test, System monitors their camera, mic and the screen they are looking at.”</p>
                    <p className="author">– AssessPro-</p>
                </div>
            </section>

            {/* Section: Diferenciais */}
            <section id="section-diferenciais">
                <h2 className="section-header">Rules & Regulations</h2>
                <div className="container2">
                    <div className="box1">
                        <div>
                            <img className="img-box1" src={`${process.env.PUBLIC_URL}/assets/img/101391-online-test_zu1cw4.gif`} alt="image" />
                        </div>
                        <div>
                            <p>Monitors your camera and microphone during the exam. When you load the exam, grant permissions for both to Exam Proctor.</p>
                        </div>
                    </div>

                    <div className="box2">
                        <div>
                            <img className="img-box2" src={`${process.env.PUBLIC_URL}/assets/img/Not-detect-face.png`} alt="image" />
                        </div>
                        <div>
                            <p>If the camera doesn't detect your face, System calls these events VIOLATIONS.</p>
                        </div>
                    </div>

                    <div className="box3">
                        <div>
                            <img className="img-box3" src={`${process.env.PUBLIC_URL}/assets/img/Detect-face.png`} alt="image" />
                        </div>
                        <div>
                            <p>During the exam, make sure the camera can focus on your face.</p>
                        </div>
                    </div>

                    <div className="box4">
                        <div>
                            <img className="img-box4" src={`${process.env.PUBLIC_URL}/assets/img/Take-photo.png`} alt="image" />
                        </div>
                        <div>
                            <p>Once your face is detected, the first photo will be taken.</p>
                        </div>
                    </div>

                    <div className="box5">
                        <div>
                            <img className="img-box5" src={`${process.env.PUBLIC_URL}/assets/img/Detect-two-persons.png`} alt="image" />
                        </div>
                        <div>
                            <p>Make sure that only you are in front of the exam. The background should be as clean as possible.</p>
                        </div>
                    </div>

                    <div className="box6">
                        <div>
                            <img className="img-box6" src={`${process.env.PUBLIC_URL}/assets/img/Talking.png`} alt="image" />
                        </div>
                        <div>
                            <p>You must take the exam in a quiet environment. If any sound is detected, it will be recorded.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Professora */}
            <h2 id="section-header-prof">How to setup your Environment</h2>
            <section id="section-prof">
                <div className="container3">
                    <h2 className="title2">Test environment</h2>
                    <ul>
                        <li>You must sit at a clean desk or table.</li>
                        <li>You must take the exam in the same room that you scanned during the proctoring setup for the current exam.</li>
                        <li>The room must be as quiet as possible. Sounds such as music or television are not permitted.</li>
                        <li>No other person is allowed to enter the room while you are taking the proctored exam.</li>
                        <li>The following items must not be on your desk or used during your proctored exam, unless posted rules for the exam specifically permit these materials: Books, Paper, Pens, Calculators, Textbooks, Notebooks, Phones.</li>
                    </ul>
                </div>
            </section>

            <section className="section-button">
                <div className="nextButton">
                    <a href="/signin" className="next">Next &raquo;</a>
                </div>
            </section>

            {/* Footer */}
          
        </main>
    );
};

export default ExamRules;
