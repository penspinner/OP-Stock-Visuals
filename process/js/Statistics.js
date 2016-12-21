import React from 'react';

class Statistics extends React.Component
{
    render()
    {
        return (
            <div className="col-md-12 nopad">
                <h3>Statistics</h3>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <td><h4>{this.props.statistics.t1}</h4></td>
                            <td><h4>{this.props.statistics.t2}</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Recent: ${this.props.statistics.t1Recent}</td>
                            <td>Recent: ${this.props.statistics.t2Recent}</td>
                        </tr>
                        <tr>
                            <td>Oldest: ${this.props.statistics.t1Oldest}</td>
                            <td>Oldest: ${this.props.statistics.t2Oldest}</td>
                        </tr>
                        <tr>
                            <td>High: ${this.props.statistics.t1Max}</td>
                            <td>High: ${this.props.statistics.t2Max}</td>
                        </tr>
                        <tr>
                            <td>Low: ${this.props.statistics.t1Min}</td>
                            <td>Low: ${this.props.statistics.t2Min}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Statistics;