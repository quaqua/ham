import React, { PureComponent } from 'react';

export default class Player extends PureComponent {

  handleTogglePlay = () =>
    this.sendSqueezeboxCmd(['pause'])

  incVolume = () =>
    this.sendSqueezeboxCmd(['mixer', 'volume', '+1'])

  decVolume = () =>
    this.sendSqueezeboxCmd(['mixer', 'volume', '-1'])

  sendSqueezeboxCmd = cmd => {
    const body = JSON.stringify({
      id: 1,
      method: 'slim.request',
      params: ['b8:27:eb:5d:68:b2', cmd] });

    fetch(`http://${process.env.REACT_APP_SQUEEZEBOX}/jsonrpc.js`, {
      method: 'POST',
      mode: 'no-cors',
      body,
    });
  }

  render() {
    return (
      <div className="player">
        <div className="volume-btn">
          <i className="material-icons" onClick={this.decVolume}>volume_down</i>
        </div>
        <div className="play-stop">
          <i className="material-icons" onClick={this.handleTogglePlay}>play_arrow</i>
        </div>
        <div className="volume-btn">
          <i className="material-icons" onClick={this.incVolume}>volume_up</i>
        </div>
      </div>
    );
  }

}