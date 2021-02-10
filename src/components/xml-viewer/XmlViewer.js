import React from 'react';
import fetch from '../../fetcher/fetcher'


class XmlViewer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            trackpoints: null,
        }
    }

    componentDidMount(){
        fetch()
        .then(r => {
            this.setState({
                trackpoints: r
            })
        });
    }

    render(){
        console.log(this.state)
        return (
        <div>
            <h1>XmlViewer</h1>
            <table>
            {
                this.state.trackpoints ? 
                    this.state.trackpoints.map((trackpoint, i) => {
                        return (
                        <tr>
                            <td>{i}</td>
                            <td>{trackpoint.lat}</td>
                            <td>{trackpoint.long}</td>
                            <td>{trackpoint.ele}</td>
                        </tr>)
                    }) : ""
            }
            </table>
        </div>
        )
    }

}

export default XmlViewer;