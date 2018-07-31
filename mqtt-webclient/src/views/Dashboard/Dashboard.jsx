import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// @material-ui/icons
import LineWeight from "@material-ui/icons/LineWeight";
import Schedule from "@material-ui/icons/Schedule";
import Highlight from "@material-ui/icons/Highlight";

import ShuttersTab from 'components/ShuttersTab';

// core components
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

class SectionPills extends React.Component {

  state = {
    curTab: 0,
  }

  handleSelectedTab = (e, index) => this.setState({ curTab: index })

  render() {
    const { classes } = this.props;
    const { curTab } = this.state;
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={curTab}
            onChange={this.handleSelectedTab}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Rolläden" icon={<LineWeight />} />
            <Tab label="Beleuchtung" icon={<Highlight />} />
            <Tab label="Automation" icon={<Schedule />} />
          </Tabs>
        </AppBar>
        {curTab === 0 && <ShuttersTab />}
      </div>
    );
  }
}

export default withStyles(pillsStyle)(SectionPills);
