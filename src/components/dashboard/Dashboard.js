import React from 'react';
import { fetch, fetchList } from '../../fetcher/fetcher'
import ElevationGraph from '../elevation-graph/ElevationGraph'
import Header from './header/Header'
import Menu from './menu/Menu'
import RunMap from '../map/RunMap'
import './Dashboard.css'

class Dashboard extends React.Component {


    constructor(props) {
        super(props)

        this.handleFileChange = this.handleFileChange.bind(this)

        this.state = {
            trackpoints: null,
            list: null
        }
    }

    componentDidMount() {

        fetchList().then(r => {
            this.setState({
                list: r
            })
        })
    }

    render() {
        console.log("render Dashboard")
        return (
            <div>
                <Header />
                <div className="row">
                    <Menu list={this.state.list} onFileChange={this.handleFileChange} />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="main chart-wrapper">
                            {
                                this.state.trackpoints != null &&
                                <ElevationGraph filename={this.state.filename} trackpoints={this.state.trackpoints} />
                            }
                            <RunMap />
                        </div>
                    </main>
                </div>
            </div>
        )
    }


    handleFileChange(filename) {
        console.log("Le fichier " + filename + " a été selectionné !")

        fetch(filename)
            .then(r => {
                this.setState({
                    trackpoints: r,
                    filename: filename
                })
            });
    }


}

export default Dashboard;