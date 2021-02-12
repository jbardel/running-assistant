import React from 'react';
import Chart from 'chart.js'

class ElevationGraph extends React.Component {

    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.buildChart()
    }

    componentDidUpdate(){
        this.eleChart.destroy()
        this.buildChart()
    }


    render() {
        return (
            <div>
                <h2>{this.props.filename}</h2>
                <canvas ref={this.chartRef}></canvas>
            </div>
        )
    }

    buildChart() {

        let array = this.props.trackpoints.map(function (e) {
            return {
                x: e.date,
                y: e.ele
            }
        })

        this.eleChart = new Chart(this.chartRef.current, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Elevation",
                    data: array,
                    fill: false,
                    borderColor: "rgb(75,192,192)",
                    lineTension: 0.1
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Temps'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Elevation (m)'
                        }
                    }]
                }
            }
        })

    }


}

export default ElevationGraph