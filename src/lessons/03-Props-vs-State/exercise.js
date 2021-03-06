////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make the "Go to Step 2" button work.
//
// In order to do this, you'll have to make tabs a "pure component" so that it
// no longer manages its own state. Instead add a prop to tell it which tab to
// show, and then move the state up to the <App>.
//
// Also, be sure that clicking on the individual tabs still works.
//
// Got extra time?
//
// - Now that <Tabs> doesn't have any state, refactor it from a class into a
//   pure function that takes props as an argument and returns an element (JSX).
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";
import data from "./data";

class Tabs extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  state = { activeIndex: 0 };

  selectTab = index => this.setState({ activeIndex: index });

  render() {
    let { data } = this.props;
    let { activeIndex } = this.state;

    let tabs = data.map((item, index) => {
      let isActive = index === activeIndex;
      let style = isActive ? styles.activeTab : styles.tab;

      return (
        <div
          key={index}
          className="Tab"
          style={style}
          onClick={() => this.selectTab(index)}
        >
          {item.name}
        </div>
      );
    });

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {data[activeIndex].description}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Props v. State</h1>

        <button>Go to "Step 2"</button>

        <Tabs data={this.props.tabs} />
      </div>
    );
  }
}

export default function Exercise() {
  return (<App tabs={data} />);
}

// ReactDOM.render(<App tabs={data} />, document.getElementById("app"));
