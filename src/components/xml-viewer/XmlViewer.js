import React from 'react';
import { fetch } from '../../fetcher/fetcher';
import './XmlViewer.css';

class XmlViewer extends React.Component {

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

    render() {
        return (
            <div>
                <h1>XmlViewer</h1>
                {
                    this.state.trackpoints ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>lat</th>
                                    <th>long</th>
                                    <th>ele</th>
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.trackpoints.map((trackpoint, i) => {
                                    return (<tr key={i}>
                                        <td>{i}</td>
                                        <td>{trackpoint.lat}</td>
                                        <td>{trackpoint.long}</td>
                                        <td>{trackpoint.ele || ""}</td>
                                    </tr>)
                                })
                            }</tbody>
                        </table>
                        : ""}
            </div>
        )
    }
}

export default XmlViewer;