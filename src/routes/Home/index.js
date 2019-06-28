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
                    center={{lat: config.get('CENTER_LAT'), lng: config.get('CENTER_LNG')}}
                    height={window.innerHeight - 200}
                    zoom={config.get('ZOOM')}
                    apiKey={config.get('API_KEY')}
                />
            </div>
        )
    }
}

export default Home
