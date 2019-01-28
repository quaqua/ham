import React from 'react';
import flowRight from 'lodash/flowRight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectLastTopicMessageByName,
  subscribeTopic
} from '../store';

class SimpleTempWidget extends React.Component {

  constructor(props) {
    super(props);
    props.actions.subscribeTopic(props.topic);
  }

  render() {
    const { lastMsg } = this.props;
    if (!lastMsg) return <div />;
    return (
      <div className="start-screen-widget">
        <div className="widget-label">{this.props.label}</div>
        <div className="widget-value">{`${Math.round(lastMsg * 10) / 10}°`}</div>
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

export default enhance(SimpleTempWidget);