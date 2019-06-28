import axios from 'axios';
import axiosRetry from 'axios-retry';
const config = require('../configuration')

export default class BFFClient {
    constructor() {
        this.instance = axios.create({
            baseURL: `${config.get('BFF_API_BASE_URL')}${config.get('BFF_API_WEATHER_PATH')}`,
        })
        axiosRetry(this.instance, { retries: 5 });
    }

    getWeatherByPosition(latitude, longitude) {
        return new Promise((resolve, reject) => {
            this.instance.request({
                method: 'get',
                url: `${latitude}/${longitude}`,
                timeout: 3000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                if (error.response) {
                    reject(error.response.data)
                } else if (error.request) {
                    reject(error.request)
                } else {
                    reject(error.message)
                }
            })
        })
    }
}
