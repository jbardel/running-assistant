import GeoJSON from 'ol/format/GeoJSON';
import React from 'react'
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';


class RunMap extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        var styles = {
            'MultiLineString': new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1,
                }),
            }),
        };

        var styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };


        let geoJson = {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiLineString',
                'coordinates': [
                    [
                        [-1e6, -7.5e5],
                        [-1e6, 7.5e5]],
                    [
                        [1e6, -7.5e5],
                        [1e6, 7.5e5]],
                    [
                        [-7.5e5, -1e6],
                        [7.5e5, -1e6]],
                    [
                        [-7.5e5, 1e6],
                        [7.5e5, 1e6]]],
            },

        }

        let vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geoJson),
        })

        var vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction,
        });

        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: [0, 0],
                zoom: 0
            })
        });

    }

    render() {

        const mapStyle = {
            width: "100%",
            height: "400px"
        }

        return (
            <div id="map" style={mapStyle}></div>
        )
    }
}

export default RunMap