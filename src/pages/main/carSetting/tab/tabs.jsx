import React, { Component } from "react";
import PropTypes from "prop-types";
import Tab from "./tab";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
      formComment: false,
      isHeart: false,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="body-container settings min-height-no-footer">
        <div className="sidebar sidebar-settings hide-on-med-and-down">
          <ul>
            <li className="heading">
              <p>THÔNG TIN CHUNG</p>
            </li>
            {children.map((child) => {
              const { label, Icon } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                  Icon={Icon}
                />
              );
            })}
          </ul>
        </div>
        <section className="content">
          <div className="content-container">
            {children.map((child) => {
              if (child.props.label !== activeTab) return undefined;
              return child.props.children;
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default Tabs;
