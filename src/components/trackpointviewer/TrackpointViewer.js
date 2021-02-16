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
        this.fetchTrackpoints()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.filename !== this.props.match.params.filename) {
            this.fetchTrackpoints()
        }
    }

    fetchTrackpoints() {
        let filename = this.props.match.params.filename
        fetch(filename).then(elem => {
            this.setState({
                trackpoints: elem,
                filename: filename
            })
        })
    }

    render() {
        return (
            <div className="row">
                <h2>{this.state.filename}</h2>
                {
                    this.state.trackpoints != null &&
                    <ElevationGraph trackpoints={this.state.trackpoints} />
                }
                {
                    this.state.trackpoints != null &&
                    <RunMap trackpoints={this.state.trackpoints}/>
                }
            </div>
        )
    }
}

export default withRouter(TrackpointViewer)