import React, { PureComponent } from "react";

import Button from "@material-ui/core/Button";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class ActionItem extends PureComponent {

  shut = () => {
    const { mqtt, item } = this.props;
    const value = typeof(item.value) === 'undefined' || item.value >= 0 ? -1 : 0;
    console.log('pub', value);
    mqtt.publish('@shutter/request', JSON.stringify({ ...item, value}));
  }

  open = () => {
    const { mqtt, item } = this.props;
    const value = typeof (item.value) === 'undefined' || item.value < 1 ? 1 : 0;
    mqtt.publish('@shutter/request', JSON.stringify({ ...item, value }));
  }

  render() {
    const { item } = this.props;
    const up = item.acting && typeof(item.value) !== 'undefined' && item.value > 0;
    const down = item.acting && typeof(item.value) !== 'undefined' && item.value < 0;
    console.log(item, up, down);
    return (
      <ListItem>
        <ListItemText primary={item.label} />
        <ListItemSecondaryAction>
          <Button size="small" color={ up ? 'primary' : undefined} variant={up ? 'contained' : undefined} onClick={this.open}>
            <ArrowUpward />
          </Button>
          <Button size="small" variant={down ? 'contained' : undefined} color={down ? 'primary' : undefined} onClick={this.shut}>
            <ArrowDownward />
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default ActionItem;
