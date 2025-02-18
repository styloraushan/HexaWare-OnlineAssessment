import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";



class Navbar extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    // Destructure userInfo from props
    const { userInfo } = this.props;

    // Check if the user is logged in by checking if the email exists
    const isLoggedIn = userInfo && userInfo.email;

    // If the user is logged in, store the email in localStorage
    if (isLoggedIn) {
        localStorage.setItem("email", userInfo.email);
    } else {
        // If the user is not logged in, don't render the menuBar
        return null; // Render nothing if the user is not logged in
    }
    // If the user is logged in, render the menuBar
    return (
      <nav className="menuBar">
        <div className="logo">
          <Link>AssessPro</Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu role={this.props} />
          </Drawer>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user, // Get user info from Redux store
  };
};

export default connect(mapStateToProps, null)(Navbar);