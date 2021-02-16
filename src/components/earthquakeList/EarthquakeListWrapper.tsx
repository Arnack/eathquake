import React, {FC, useEffect, useState} from "react";
import {GeoDataService} from "../../services/api/GeoDataService";
import {RouteComponentProps} from "@reach/router";
import {EarhquakeList} from "./EarthquakeList";
import {GeoFeature} from "../../model/GeoFeature";
import {Filter} from "../filter/Filter";

interface IProps extends RouteComponentProps  {

}


let intervalId: NodeJS.Timeout | null = null;


export const EarthquakeListWrapper:FC<IProps> = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [earthQuakes, setEarthQuakes] = useState<GeoFeature[]>([]);
    const [filterText, setFilterText] = useState("");

    const filterEarthQuakes = () => {
        if (filterText.length < 3) {
            return earthQuakes;
        }
        return earthQuakes.filter(item =>
            item.properties.place.toLowerCase().includes(filterText.toLowerCase()));
    }

    const fetchEarthQuakes = () => {
        setIsLoading(true);
        GeoDataService.fetchEarthQuakeData(10000)
            .then((res) => {
                console.log(res);
                setEarthQuakes(res.features)
            })
            .catch((err) => {
                console.error(err.toString());
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchEarthQuakes();
        intervalId = setInterval(fetchEarthQuakes, 3000 * 1000);
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, []);

    return <>
        <Filter handleChange={setFilterText} />
        <EarhquakeList isLoading={isLoading} data={filterEarthQuakes()} />
    </>
}
