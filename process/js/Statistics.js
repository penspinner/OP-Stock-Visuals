import React from 'react';

class Statistics extends React.Component
{
    render()
    {
        return (
            <div className="col-md-12 nopad">
                <h3 className="text-center">Statistics</h3>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <td><h4>{this.props.statistics.t1}</h4></td>
                            <td><h4>{this.props.statistics.t2}</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Today: ${this.props.statistics.t1Today}</td>
                            <td>Today: ${this.props.statistics.t2Today}</td>
                        </tr>
                        <tr>
                            <td>Highest: ${this.props.statistics.t1Max}</td>
                            <td>Highest: ${this.props.statistics.t2Max}</td>
                        </tr>
                        <tr>
                            <td>Lowest: ${this.props.statistics.t1Min}</td>
                            <td>Lowest: ${this.props.statistics.t2Min}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Statistics;