import React, {FC} from "react";
import { Router } from "@reach/router"
import EarhquakeList from "../../components/earthquakeList";
import {Header} from "./facilities/Header";
import {EarthquakeDetails} from "../../components/earthquakeDetails/EarthquakeDetails";

export const Layout:FC = () => {
    return <>
        <Header />
            <Router>
                <EarhquakeList path="/" />
                <EarthquakeDetails path="features/:earthquakeId" />
            </Router>
        </>
}