import React, {Component} from 'react'
import Map from '../../components/Map'

const config = require('../../configuration')

class Home extends Component {
    render() {
        const {google} = this.props
        return (
            <div style={{margin: '0px'}}>
                <Map
                    google={google}
                    center={{...config.center}}
                    height={window.innerHeight - 200}
                    zoom={config.zoom}
                    apiKey={config.apiKey}
                />
            </div>
        )
    }
}

export default Home
