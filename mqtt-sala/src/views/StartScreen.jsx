import React from 'react';
import Moment from 'react-moment';

import SimpleTempWidget from 'widgets/SimpleTempWidget';

export default () => (
  <div className="start-screen">
    <div className="time-info">
      <div className="time">
        <Moment interval={60 * 1000} format="HH:mm" />
      </div>
      <div className="date">
        <Moment interval={3600 * 1000} format="dddd, DD. MMMM YYYY" />
      </div>
    </div>

    <div className="temp-info">
      <SimpleTempWidget topic="temppi/temp" label="Sala" />
      <SimpleTempWidget topic="bedroom/temp" label="Bedroom" />
    </div>
  </div>
);