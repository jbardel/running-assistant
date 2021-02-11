import React from 'react';
import Chart from 'chart.js'

class ElevationGraph extends React.Component {


    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        this.eleChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: ['A', 'B', 'C'],
                datasets: [{
                  label: 'My data',
                  data: [10, 20, 30],
                  backgroundColor: '#112233'
                }]
              }
        })
    }

    render(){
        console.log("props", this.props)
        return (<canvas ref={this.chartRef}></canvas>)
    }

}

export default ElevationGraph