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
                <span className={"icon" + (this.props.chartType === "line" ? " active" : "")} onClick={() => this.lineChart()}>
                    <i className="fa fa-line-chart fa-3x" aria-hidden="true"></i>
                </span>
                <span className={"icon" + (this.props.chartType === "bar" ? " active" : "")} onClick={() => this.barChart()}>
                    <i className="fa fa-bar-chart fa-3x" aria-hidden="true"></i>
                </span>
                <span className={"icon" + (this.props.chartType === "table" ? " active" : "")} onClick={() => this.dataTable()}>
                    <i className="fa fa-table fa-3x" aria-hidden="true"></i>
                </span>
                <span className="icon" onClick={() => this.unloadData()}>
                    <i className="fa fa-times fa-3x" aria-hidden="true"></i>
                </span>
            </div>
        );
    }
}

export default OptionBar;