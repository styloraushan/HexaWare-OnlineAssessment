import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import { Offline } from "react-detect-offline";
import { Roles } from "../Roles/roles";

// Component Imports
import Hero from "../home/Front";
import Login from "../logIn/Login";
import Signup from "../signUp/Signup";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import StudentDashboard from "../dashboard/Dashboard";
import TeacherDashboard from "../Teacher/Dashboard/Dashboard";
import AttemptTest from "../attemptTest/AttemptTest";
import Navbar from "../navbar";
import Result from "../result/ResultWrapper";
import TestInstruction from "../TestInstructions/TestInstruction";
import IndividualResult from "../result/ShowResult";
import TestPreviewWrapper from "../testPreview/TestPreviewWrapper";
import Profile from "../profile/Profile";
import CreateTest from "../Teacher/CreateTest/CreateTest";
import AssignedTestsWrapper from "../Teacher/AssigenedTest/AssignedTestsWrapper";
import TestStatus from "../Teacher/TestStatus/TestStatus";
import ExamRules from "../SystemChecks/ExamRules";
import SystemCheck from "../SystemChecks/SystemCheck";
function App(props) {



  const [count, setCount] = useState(1);

  const handleOffline = () => {
    setCount(count + 1);
    if (count % 2 === 0) {
      message.success("Connected to internet");
    } else {
      message.error("Please connect to internet");
    }
  };

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "F12") {
        e.preventDefault();
      }
    });
  }, []);

  const { selectedTestName, selectedAssignedTestName } = props;
  const role = props.userInfo.role;
  const { confirm } = Modal;

  return (
    <div className={count % 2 ? "" : " pointer__select__none"}>
      <Offline onChange={(e) => handleOffline(e)}></Offline>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Hero id="Front" />} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Login} />
          {/* <Route exact path="/ExamRules" component={ExamRules} />
          <Route exact path="/SystemCheck" component={SystemCheck} /> */}
          <ProtectedRoute
            exact
            path="/dash"
            component={Roles.teacher === role ? TeacherDashboard : StudentDashboard}
          />
          <ProtectedRoute
            exact
            path="/attempt-test"
            component={AttemptTest}
          />
          <ProtectedRoute
            exact
            path="/create-test"
            component={Roles.teacher === role ? CreateTest : AttemptTest}
          />
          <ProtectedRoute exact path="/result" component={Result} />
          <ProtectedRoute
            exact
            path={`/result/${selectedTestName}`}
            component={IndividualResult}
          />
          <ProtectedRoute
            exact
            path="/test-instructions"
            component={TestInstruction}
          />
           <ProtectedRoute
            exact
            path="/exam-rules"
            component={ExamRules}
          />
            <ProtectedRoute
            exact
            path="/System-Check"
            component={SystemCheck}
          />
          <ProtectedRoute
            exact
            path="/start-test"
            component={TestPreviewWrapper}
          />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/assigned-test"
            component={Roles.teacher === role ? AssignedTestsWrapper : StudentDashboard}
          />
          <ProtectedRoute
            exact
            path={`/test-status/${selectedAssignedTestName}`}
            component={TestStatus}
          />
          <ProtectedRoute component={Login} />
        </Switch>
      </Router>
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTestName: state.selectedTest.selectedTestResultData.testName
      ?.replace(/\s+/g, "-")
      .toLowerCase(),
    userInfo: state.auth.user,
    selectedAssignedTestName: state.selectedTest.selectedAssignedTestData.testName
      ?.replace(/\s+/g, "-")
      .toLowerCase(),
  };
};

export default connect(mapStateToProps, null)(App);
