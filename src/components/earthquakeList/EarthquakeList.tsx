import React, {FC} from "react";
import {GeoFeature} from "../../model/GeoFeature";
import {Link} from "@reach/router";
import { FixedSizeList } from 'react-window';
import "./EarthquakeList.css";
import {LoadingPlaceholder} from "../loadingPlaceholder/LoadingPlaceholder";

interface IProps {
    data: GeoFeature[];
    isLoading?: boolean;
}

export const EarhquakeList: FC<IProps> = ({data, isLoading}) => {

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const feature = data[index]
            return (
                <div className={"table-row"} style={style} key={feature.id}>
                    <div className={"cell code-cell"}>
                        {feature.properties.code}
                    </div>
                    <div className={"cell place-cell"}>
                        {feature.properties.place}
                    </div>
                    <div className={"cell coords-cell"}>

                        {feature.geometry.coordinates[1].toFixed(3)},
                        {feature.geometry.coordinates[0].toFixed(3)},
                        {feature.geometry.coordinates[2].toFixed(3)}
                    </div>
                    <div className={"cell date-cell"}>
                        {new Date(feature.properties.time).toLocaleTimeString()}
                    </div>
                    <div className={"cell actions-cell"}>
                        <Link to={`features/${feature.id}`}>Details</Link>
                    </div>
                </div>
            )
        },
        [data]
    )

    return <div className={"earthquake-list__wrapper"}>
        <div className={"table"}>
            <div className={"table-header"}>
                    <div className={"header-cell code-cell"}>Code</div>
                    <div className={"header-cell place-cell"}>Place</div>
                    <div className={"header-cell coords-cell"}>Coordinates</div>
                    <div className={"header-cell date-cell"}>Time</div>
                    <div className={"header-cell actions-cell"}><span>Actions</span></div>
            </div>
            {
                isLoading ?
                    <LoadingPlaceholder /> :

                    <div className={"table-body"}>
                        <FixedSizeList
                            height={window.innerHeight - 200}
                            itemCount={data.length}
                            itemSize={24}
                            width={"100%"}
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </div>
            }
        </div>
    </div>
}