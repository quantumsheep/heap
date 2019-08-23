import React from 'react'
import '../style/internet.css'
import HomeButton from './HomeButton'
import LeftArrowButton from './LeftArrowButton'
import RightArrowButton from './RightArrowButton'
import DownloadButton from './DownloadButton'
import ConnectButton from './ConnectButton'

class Internet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connect_active: false,
    }
  }

  render() {
    return (
      <div className="internet">
        <div className="internet-window-title">
          <div className="internet-window-title-buttons-left">
            <HomeButton className="internet-window-title-buttons-home" style={{ fill: "white", }} onClick={console.log("oui")} />
            <LeftArrowButton className="internet-window-title-buttons-leftarrow" style={{ fill: "white", }} onClick={console.log("oui")} />
            <RightArrowButton className="internet-window-title-buttons-rightarrow" style={{ fill: "white", }} onClick={console.log("oui")} />
          </div>
          <input></input>
          <div className="internet-window-title-buttons-right">
            <DownloadButton className="internet-window-title-buttons-download" style={{ fill: "white", }} onClick={console.log("oui")} />
            <ConnectButton className="internet-window-title-buttons-connect" style={{ fill: this.state.connect_active ? "lightblue" : "lightred" }} onClick={() => this.setState({ connect_active: !this.state.connect_active })} />
          </div>
        </div>
        <div className="internet-window-content">
          <div style={{ padding: '4px', color: 'black' }}>Welcome to the World Wide Web!</div>
        </div>
      </div>
    )
  }
}

export default Internet
