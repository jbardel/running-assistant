import React from "react"
import { withRouter } from "react-router-dom"
import ElevationGraph from "../elevation-graph/ElevationGraph"
import RunMap from "../map/RunMap"
import { fetch } from '../../fetcher/fetcher'

class TrackpointViewer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trackpoints: null,
            filename: null
        }
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.fetchTrackpoints()
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate")
        if (prevProps.match.params.filename !== this.props.match.params.filename) {
            this.fetchTrackpoints()
        }
    }

    fetchTrackpoints() {
        let filename = this.props.match.params.filename
        console.log("filename", filename)
        fetch(filename).then(elem => {
            this.setState({
                trackpoints: elem,
                filename: filename
            })
        })
    }

    render() {
        console.log("TrackpointViewer.render")
        return (
            <div>
                {
                    this.state.trackpoints != null &&
                    <ElevationGraph filename={this.state.filename} trackpoints={this.state.trackpoints} />
                }
                <RunMap />
            </div>
        )
    }
}

export default withRouter(TrackpointViewer)