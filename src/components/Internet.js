import React from 'react'
import '../style/internet.css'
import HomeButton from './HomeButton'
import LeftArrowButton from './LeftArrowButton'
import RightArrowButton from './RightArrowButton'
import DownloadButton from './DownloadButton'
import ConnectButton from './ConnectButton'
import websites from '../internet/websites'

class Internet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connect_active: false,
      website: this.defaultWebsite(),
      webadress: 'store.heap',
    }
  }

  defaultWebsite = () => {
    const Site = websites["store.heap"]
    this.webadress = 'store.heap'
    return <Site />
  }

  render() {
    return (
      <div className="internet">
        <div className="internet-window-title">
          <div className="internet-window-title-buttons-left">
            <HomeButton className="internet-window-title-buttons-home" style={{ fill: "white", }} onClick={() => this.setState({ website: this.defaultWebsite() })} />
            <LeftArrowButton className="internet-window-title-buttons-leftarrow" style={{ fill: "white", }} onClick={console.log("oui")} />
            <RightArrowButton className="internet-window-title-buttons-rightarrow" style={{ fill: "white", }} onClick={console.log("oui")} />
          </div>
          <input type="text" value={this.state.webadress} onChange={e => this.setState({ webadress: e.target.value })} onKeyDown={(e) => {
            if (e.key === "Enter") {
              const Site = websites[e.currentTarget.value]
              this.setState({ website: Site ? <Site /> : <div style={{ color: "black", textAlign: "center", marginTop: "20%" }}>404</div> })
            }
          }}></input>
          <div className="internet-window-title-buttons-right">
            <DownloadButton className="internet-window-title-buttons-download" style={{ fill: "white", }} onClick={console.log("oui")} />
            <ConnectButton className="internet-window-title-buttons-connect" style={{ fill: this.state.connect_active ? "lightblue" : "lightred" }} onClick={() => this.setState({ connect_active: !this.state.connect_active })} />
          </div>
        </div>
        <div className="internet-window-content">
          {this.state.website}
        </div>
      </div>
    )
  }
}

export default Internet
