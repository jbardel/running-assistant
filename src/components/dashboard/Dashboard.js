import React from 'react';
import { fetchList } from '../../fetcher/fetcher'
import Header from './header/Header'
import Menu from './menu/Menu'
import './Dashboard.css'
import TrackpointViewer from '../trackpointviewer/TrackpointViewer';
import { Route, Switch } from 'react-router-dom';

class Dashboard extends React.Component {


    constructor(props) {
        super(props)

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
                    <Menu list={this.state.list} />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="main chart-wrapper">
                            <Switch>
                                <Route path="/detail/:filename" children={<TrackpointViewer />} />
                            </Switch>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

}

export default Dashboard;