import React from 'react'
import '../style/internet.css'
import HomeButton from '../components/HomeButton'
import LeftArrowButton from '../components/LeftArrowButton'
import RightArrowButton from '../components/RightArrowButton'
import DownloadButton from '../components/DownloadButton'
import ConnectButton from '../components/ConnectButton'
import websites from '../internet/websites'

import internet_icon from '../ressources/icons/internet.png'

export const info = {
  id: 'U9hwZ937YpzWals4',
  name: 'Internet',
  type: 'program',
  icon: internet_icon,
}

export class Software extends React.Component {
  static control = []

  constructor(props) {
    super(props)

    /** @type {import('../components/HeapOS').default} */
    this.env = this.props.env

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
            <DownloadButton className="internet-window-title-buttons-download" />
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
