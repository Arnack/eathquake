import React, {FC} from "react";
import "./LoadingPlaceholder.css";

export const LoadingPlaceholder: FC = () => {
    return <div className={"loader-wrapper"}>
        <h3>Loading...</h3>
    </div>
}