import React from 'react';

class ChartAndTable extends React.Component
{
    render()
    {
        return (
            <div>
                <h3 className="text-center">{this.props.typeTitle}</h3>
                <div className={"c3" + (this.props.type === "line" || this.props.type === "bar" ? "" : " hidden")}>
                    <div id="chart"></div>
                </div>
                <div id="dataTable" className={(this.props.type === "table" ? "" : "hidden")}>
                    <div className="table-responsive">
                        {this.props.table}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartAndTable;