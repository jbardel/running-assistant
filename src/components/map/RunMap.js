import GeoJSON from 'ol/format/GeoJSON';
import React from 'react'
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';


class RunMap extends React.Component {

    componentDidMount() {

        var styles = {
            'Polygon': new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 4,
                }),
            }),
        };

        var styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };

        let coord = this.props.trackpoints.map(e => this.convertCoordinate(e.long, e.lat))
        //var newCoord = transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

        let geoJson = {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        this.props.trackpoints.map(e => this.convertCoordinate(e.long, e.lat))
                    ]
                ]
            }
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

    convertCoordinate(long, lat){
        return transform([parseFloat(long), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857');
    }

}

export default RunMap