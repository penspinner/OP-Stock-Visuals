import React from 'react';

class OptionBar extends React.Component
{
    lineChart() {this.props.lineChart();}
    barChart() {this.props.barChart();}
    dataTable() {this.props.dataTable();}
    unloadData() {this.props.unloadData();}

    render()
    {
        return (
            <div className="col-md-12 nopad">
                <h3 className="text-center">Options</h3>
                <i className={"fa fa-line-chart fa-3x icon" + (this.props.chartType === "line" ? " active" : "")} 
                    onClick={() => this.lineChart()} aria-hidden="true"></i>
                <i className={"fa fa-bar-chart fa-3x icon" + (this.props.chartType === "bar" ? " active" : "")} 
                    onClick={() => this.barChart()} aria-hidden="true"></i>
                <i className={"fa fa-table fa-3x icon" + (this.props.chartType === "table" ? " active" : "")} 
                    onClick={() => this.dataTable()} aria-hidden="true"></i>
                <i className="fa fa-times fa-3x icon" onClick={() => this.unloadData()} aria-hidden="true"></i>
            </div>
        );
    }
}

export default OptionBar;