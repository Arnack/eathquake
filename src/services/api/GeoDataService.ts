import Axios from "axios"


export class GeoDataService {
    static fetchEarthQuakeData = async (maxLimit = 500) => {
        const result = await Axios
            .get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=${maxLimit}`)

        return result.data;
    }
    static fetchSingleEarthQuake = async (id: string) => {
        const result = await Axios
            .get(`https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=${id}&format=geojson`)
        return result.data;
    }
}