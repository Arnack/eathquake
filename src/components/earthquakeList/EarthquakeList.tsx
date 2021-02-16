import {FC} from "react";
import {GeoFeature} from "../../model/GeoFeature";
import {Link} from "@reach/router";
import "./EarthquakeList.css";

interface IProps {
    data: GeoFeature[]
}

export const EarhquakeList: FC<IProps> = ({data}) => {
    return <div className={"earthquake-list__wrapper"}>
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Place</th>
                    <th>Coordinates</th>
                    <th>Date & Time</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
            { data.map((feature) => {
                const date = new Date(feature.properties.time);
                return <tr key={feature.id}>
                    <td>
                        {feature.properties.code}
                    </td>
                    <td>
                        {feature.properties.place}
                    </td>
                    <td>
                        {feature.geometry.coordinates.toString()}
                    </td>
                    <td>
                        {date.toLocaleString()}
                    </td>
                    <td>
                        <Link to={`features/${feature.id}`}>Details</Link>
                    </td>
                </tr>
            }) }
            </tbody>
        </table>
    </div>
}