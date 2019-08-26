import React from 'react'

class DownloadButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  close = () => {
    document.removeEventListener('click', this.close)
    this.setState({ visible: false })
  }

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e 
   */
  open = e => {
    e.preventDefault()
    document.addEventListener('click', this.close)
    this.setState({ visible: true })
  }
  
  render() {
    return (
      <div >
        <svg className='download-button' onClick={this.open} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 21.825 21.825" style={{ enableBackground: 'new 0 0 21.825 21.825', fill: 'white' }} xmlSpace="preserve">
          <g>
            <path d="M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651
              c-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587
              s1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z"/>
          </g>
        </svg>
        <div className='download-dropdown' style={{ display: this.state.visible ? 'block' : 'none' }}>
          <div className='download-dropdown-actions'>
            <div className='download-dropdown-action'>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DownloadButton
