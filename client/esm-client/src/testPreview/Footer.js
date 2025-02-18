import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom"; // To use history.push()

class Footer extends Component {
  state = {
    isModalVisible: false, // Controls modal visibility
  };

  handleNext = (e) => {
    this.props.handleFooterButtons(e.currentTarget.classList[0]);
  };

  // Show modal when "End Test" is clicked
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  // Handle "OK" action in modal
  handleOk = () => {
    this.setState({ isModalVisible: false });
    // Submit the test and redirect to a different URL
    this.props.handleSubmitTest();
    this.props.history.push("/results"); // Redirect to the results page
  };

  // Handle "Cancel" action in modal
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <>
        <div className="footer__wrapper">
          <div className="left__footer">
            <div
              className="previous__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Previous
            </div>
            <div
              className="flag__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Flag
            </div>
            <div
              className="next__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Next
            </div>
          </div>
          <div className="right__footer">
            <div className="end__test box" onClick={this.showModal}>
              Submit
            </div>
          </div>
        </div>

        {/* Modal for confirmation */}
        <Modal
          title="Confirm Submission"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Submit"
          cancelText="Cancel"
        >
          <p>Are you sure you want to submit the test? This action cannot be undone.</p>
        </Modal>
      </>
    );
  }
}

export default withRouter(Footer);