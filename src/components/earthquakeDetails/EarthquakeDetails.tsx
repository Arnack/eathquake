import React, {FC, useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {Icon} from "leaflet";

import L from 'leaflet';
import {RouteComponentProps} from "@reach/router";
import {GeoDataService} from "../../services/api/GeoDataService";
import {GeoFeature} from "../../model/GeoFeature";
import './EarthQuakeDetails.css';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {LoadingPlaceholder} from "../loadingPlaceholder/LoadingPlaceholder";

interface IProps extends RouteComponentProps {
    earthquakeId?: string;
}

export const EarthquakeDetails: FC<IProps> = ({earthquakeId}) => {

    const [quake, setQuake] = useState<GeoFeature | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const markerIcon = new Icon({
        iconUrl: require("../../assets/marker.png"),
        iconSize: [20, 30],
    });

    let DefaultIcon = new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    const fetchSingleEarthQuake = () => {
        setIsLoading(true);
        if (earthquakeId != null) {
            GeoDataService.fetchSingleEarthQuake(earthquakeId)
                .then((res) => {
                    setQuake(res)
                })
                .catch((err) => {
                    console.error(err.toString());
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }

    }

    useEffect(() => {
        fetchSingleEarthQuake();
    }, []);

    if (isLoading) {
        return <LoadingPlaceholder />
    }

    return <>
        {!isLoading && quake && <MapContainer
            center={[quake.geometry.coordinates[1], quake.geometry.coordinates[0]]}
            zoom={3}
            scrollWheelZoom={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            <Marker position={[quake.geometry.coordinates[1], quake.geometry.coordinates[0]]}
                    icon={DefaultIcon }
            >
                <Popup>
                <span className="popup__span">
                  {new Date(quake.properties.time).toUTCString()}
                </span>
                    <br/>
                    {`${quake.properties.mag} magnitude earthquake, situated ${quake.properties.place}. Find the details `}
                    <a className="popup__a" href={quake.properties.url}>
                        here
                    </a>
                    .
                </Popup>
            </Marker>
        </MapContainer>}
    </>
}