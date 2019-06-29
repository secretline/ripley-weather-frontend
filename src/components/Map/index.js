import React, {Component, Fragment} from 'react'
import {
    withGoogleMap, GoogleMap, withScriptjs, Marker,
} from 'react-google-maps'
import Geocode from 'react-geocode'
import Autocomplete from 'react-google-autocomplete'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap'
import BFFClient from '../../common/BFFClient'
import Skycons from 'react-skycons'

class Map extends Component {
    constructor(props) {
        super(props)
        const {center, apiKey} = this.props
        Geocode.setApiKey(apiKey)
        this.bffClient = new BFFClient()
        this.state = {
            address: '',
            modal: false,
            modalData: {},
            mapPosition: {
                lat: center.lat,
                lng: center.lng,
            },
            markerPosition: {
                lat: null,
                lng: null,
            },
            country: ''
        }
    }

    toggleModal = () => {
        const {modal} = this.state
        this.setState({modal: !modal})
    }

    componentDidMount = async () => {
        try {
            await this.updateData(this.state.mapPosition.lat, this.state.mapPosition.lng, null, false)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {center} = this.props
        const {markerPosition, address} = this.state
        if (markerPosition.lat !== center.lat || address !== nextState.address) {
            return true
        }
        if (center.lat === nextProps.center.lat) {
            return false
        }
        return false
    }

    onPlaceSelected = async(place) => {
        if(!place.formatted_address) { return }
        const address = place.formatted_address
        const latValue = place.geometry.location.lat()
        const lngValue = place.geometry.location.lng()
        await this.updateData(latValue, lngValue, address)
    }


    handleClickOnMap = async (e) => {
        const latValue = e.latLng.lat()
        const lngValue = e.latLng.lng()
        await this.updateData(latValue, lngValue, null)
    }

    updateData = async (latValue, lngValue, address, toggle = true) => {
        if(!address) {
            const response = await Geocode.fromLatLng(latValue, lngValue)
            address = response.results[0].formatted_address
        }
        const weatherData = await this.bffClient.getWeatherByPosition(latValue, lngValue)
        let country = address.split(', ')
        country = country.length > 0 ? country[country.length-1] : ''
        this.setState({
            address: address || '',
            modalData: weatherData,
            country,
            markerPosition: {
                lat: latValue,
                lng: lngValue,
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue,
            },
        })
        if(toggle) { this.toggleModal() }
    }

    render() {
        const AsyncMap = withScriptjs(withGoogleMap(() => {
                const {google, zoom} = this.props
                const {mapPosition, markerPosition, modal, modalData, address, country} = this.state
                return (
                    <GoogleMap
                        google={google}
                        defaultZoom={zoom}
                        defaultCenter={{lat: parseFloat(mapPosition.lat), lng: parseFloat(mapPosition.lng)}}
                        onClick={e => this.handleClickOnMap(e)}
                    >
                        <Marker
                            google={google}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{lat: parseFloat(markerPosition.lat), lng: parseFloat(markerPosition.lng)}}
                            options={{
                                icon: {
                                    url: '/images/marker.png',
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }
                            }}
                        />
                        <Marker/>

                        <Modal isOpen={modal} toggle={this.toggleModal}>
                            <ModalHeader
                                toggle={this.toggleModal}>{country}: {modalData.currently ? modalData.currently.summary : ''}</ModalHeader>
                            <ModalBody>
                                {modalData.currently && <Fragment>
                                    <div className="row justify-content-center">
                                        { address }
                                    </div>
                                    <div className="row justify-content-center">
                                        <Skycons
                                            color='black'
                                            icon={modalData.currently.icon.toUpperCase().replace(/-/g,'_')}
                                            autoplay={true}
                                            style={{maxHeight: 100}}
                                        />
                                    </div>
                                    <div className="row justify-content-center" style={{marginBottom: "15px"}}>
                                        {modalData.currently.temperature} ºC
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-8">
                                            Probabilidad de lluvia:
                                        </div>
                                        <div className="col-4">
                                            {modalData.currently.precipProbability} %
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-8">
                                            Sensación térmica:
                                        </div>
                                        <div className="col-4">
                                            {modalData.currently.apparentTemperature} ºC
                                        </div>
                                    </div>
                                </Fragment>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>Ok!</Button>
                            </ModalFooter>
                        </Modal>
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                    </GoogleMap>
                )
            }),
        )
        const {mapPosition} = this.state

        const {height} = this.props
        if (mapPosition.lat && mapPosition.lng) {
            return (
                <div>
                    <AsyncMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBi1fxFvjh0sJSGl_A1ydiDh1PoSiPCqLA&libraries=places"
                        loadingElement={
                            <div style={{height: '100%'}}/>
                        }
                        containerElement={
                            <div style={{height}}/>
                        }
                        mapElement={
                            <div style={{height: '100%'}}/>
                        }
                    />
                </div>
            )
        }
        return <div style={{height}}/>
    }
}

export default Map
