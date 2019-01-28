import React from 'react';
import flowRight from 'lodash/flowRight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgressbar from 'react-circular-progressbar';
import { createStructuredSelector } from 'reselect';
import Moment from 'react-moment';

import {
  makeSelectLastTopicMessageByName,
  subscribeTopic
} from '../store';

class ProgressWidget extends React.Component {

  constructor(props) {
    super(props);
    props.actions.subscribeTopic(props.topic);
  }

  calcPerc = value =>
    (value * 100) / this.props.maxValue;

  render() {
    const { lastMsg } = this.props;
    console.log('last message', lastMsg);
    if (!lastMsg) return <div />;
    const { unit, color } = this.props;
    const value = this.calcPerc(lastMsg);
    return (
      <div className="widget">
        <div className="widget-label">{this.props.label}</div>
        <Moment date={new Date()} fromNow interval={2000} />
        <CircularProgressbar
          percentage={value}
          text={`${Math.round(lastMsg * 10) / 10}${unit}`}
          styles={{
            path: { stroke: color },
            text: { fill: color, fontSize: '16px' },
          }}
        />
      </div>
    )

  }
}

const mapStateToProps = createStructuredSelector({
  lastMsg: makeSelectLastTopicMessageByName(props => props.topic),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    subscribeTopic,
  }, dispatch)
});

const enhance = flowRight(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(ProgressWidget);