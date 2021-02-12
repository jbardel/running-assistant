
import React from 'react'
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

class RunMap extends React.Component {


    constructor(props) {
        super(props)

        console.log("create runmap")

    }

    componentDidMount() {

        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 0
            })
        });

    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}

export default RunMap