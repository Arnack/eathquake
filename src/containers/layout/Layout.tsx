import React, {FC} from "react";
import { Router } from "@reach/router"
import EarhquakeList from "../../components/earthquakeList";
import {Header} from "./facilities/Header";
import {EarthquakeDetails} from "../../components/earthquakeDetails/EarthquakeDetails";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export const Layout:FC = () => {
    return <>
        <ToastContainer position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={true}
        />
        <Header />
            <Router>
                <EarhquakeList path="/" />
                <EarthquakeDetails path="features/:earthquakeId" />
            </Router>
        </>
}