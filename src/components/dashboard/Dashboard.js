import React from 'react';
import fetch from '../../fetcher/fetcher'
import ElevationGraph from '../elevation-graph/ElevationGraph'
import './Dashboard.css'

class Dashboard extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            trackpoints: null,
        }
    }

    componentDidMount() {
        fetch()
            .then(r => {
                this.setState({
                    trackpoints: r
                })
            });
    }

    render(){
        return (
            <div>
                <div>Dashboard component works!</div>
                <div className="main chart-wrapper">
                    <ElevationGraph trackpoints={this.state.trackpoints} />
                </div>
            </div>
        )
    }


}

export default Dashboard;