import React, { Component } from "react";
import update from 'immutability-helper';

import { subscribe } from 'mqtt-react';

import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import ActionItem from 'components/ActionItem';

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

const items = [
  { label: 'WZ West', items: [
    { type: 'shutter', label: 'WZ Fenster West', port: 0 },
    ],
  },
  {
    label: 'WZ Süd', items: [
      { type: 'shutter', label: 'WZ Fenster Süd', port: 1 },
      { type: 'shutter', label: 'Terrassentüre', port: 2 },
      { type: 'shutter', label: 'Esszimmer Süd', port: 3 },
    ],
  },
  {
    label: 'WZ Ost', items: [
      { type: 'shutter', label: 'WZ Fenster Ost', port: 4 },
      { type: 'shutter', label: 'Küchenfenster Ost', port: 5 },
      { type: 'shutter', label: 'Fenster Speis Ost', port: 6 },
    ],
  },
];
class ShuttersTab extends Component {

  state = { items }

  componentWillReceiveProps(props) {
    const { data } = props;
    if (!data || data.length < 1) return;
    let newItems = this.state.items;
    this.state.items.forEach( (g, gidx) => {
      g.items.forEach( (i, iidx) => {
        const d = data[0];
        if (i.port === d.port) {
          newItems = update(newItems, { [gidx]: { items: { [iidx]: { $set: d } } } });
        }
      })
    });
    this.setState({ items: newItems });
  }

  render () {
    const { mqtt } = this.props;
    return (
      <div>
        { this.state.items.map(g =>
          <List key={g.label} subheader={<ListSubheader>{g.label}</ListSubheader>}>
            {g.items.map(i => <ActionItem mqtt={mqtt} item={i} key={i.label} /> )}
          </List>
        )}
      </div>
    );
  }
}


export default withStyles(teamStyle)(subscribe({
  topic: '@shutter/act',
})(ShuttersTab));
