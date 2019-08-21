import React from 'react'
import '../style/memory-map.css'
import range from '../utils/range'

class MemoryMap extends React.Component {
  static defaultProps = {
    buffer: [0x00, 0x00]
  }

  render() {
    return (
      <div>
        <table className="memory-map">
          <thead>
            <tr>
              <th>00</th>
              <th>01</th>
              <th>02</th>
              <th>03</th>
              <th>04</th>
              <th>05</th>
              <th>06</th>
              <th>07</th>
              <th>08</th>
              <th>09</th>
              <th>0A</th>
              <th>0B</th>
              <th>0C</th>
              <th>0D</th>
              <th>0E</th>
              <th>0F</th>
            </tr>
          </thead>
          <tbody>
            {
              range(Math.ceil(this.props.buffer.length / 16)).map(i => (
                <tr className="memory-map-row" key={`map${i}`}>
                  {
                    range(16).map(j => (
                      <td key={`map${i}-${j}`}>{('0' + (this.props.buffer[j + (i * 16)] || 0).toString(16).toUpperCase()).substr(-2)}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default MemoryMap
