import React, {FC, useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet'
import {Icon} from "leaflet";

import {Link, RouteComponentProps} from "@reach/router";
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

    const [earthQuakeDetails, setDetails] = useState<GeoFeature | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    let DefaultIcon = new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    const fetchSingleEarthQuake = () => {
        setIsLoading(true);
        if (earthquakeId != null) {
            GeoDataService.fetchSingleEarthQuake(earthquakeId)
                .then((res) => {
                    setDetails(res)
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
        return <LoadingPlaceholder/>
    }

    return <>
        <Link to={"/"}>
            <button className={"goback-details_button"}>
                &laquo; Go Back
            </button>
        </Link>
        {!isLoading && earthQuakeDetails && <MapContainer
            zoomControl={false}
            center={[earthQuakeDetails.geometry.coordinates[1], earthQuakeDetails.geometry.coordinates[0]]}
            zoom={3}
            scrollWheelZoom={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ZoomControl position="bottomright" />
            <Marker position={[earthQuakeDetails.geometry.coordinates[1], earthQuakeDetails.geometry.coordinates[0]]}
                    icon={DefaultIcon}
            >
                <Popup>
                <span className="popup__span">
                  {new Date(earthQuakeDetails.properties.time).toUTCString()}
                </span>
                    <br/>
                    {`${earthQuakeDetails.properties.mag} magnitude earthquake, situated ${earthQuakeDetails.properties.place}. Find the details `}
                    <a className="popup__a" href={earthQuakeDetails.properties.url}>
                        in the source
                    </a>
                    .
                </Popup>
            </Marker>
        </MapContainer>}
    </>
}