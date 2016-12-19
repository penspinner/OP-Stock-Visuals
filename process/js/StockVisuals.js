import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';

import TickerForm from './TickerForm';

class StockVisuals extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {type: 'line'};
    }

    componentDidMount()
    {
        let numDaysTenYears = this.getNumDaysForTenYears();
        let daysList = this.generateDaysList(numDaysTenYears);
        // console.log(daysList);
        let chart = c3.generate
        ({
            bindto: '#chart',
            data: 
            {
                columns: [],
                selection: {draggable: true}
            },
            axis: 
            {
                x: {label: {text: 'Date', position: 'outer-center'}},
                y: {label: {text: 'Stock Price', position: 'outer-middle'}}
            },
            size: {height: 480},
            type: this.state.type,
            zoom: {enabled: true}
        });
        this.setState({numDaysTenYears: numDaysTenYears, daysList: daysList, chart: chart});
    }

    createChart(t1, t2)
    {
        // Create new chart only if input values are different from before. 
        if (t1.value !== this.state.t1 || t2.value !== this.state.t2)
        {
            // Get chart and generate random prices. 
            let chart = this.state.chart;
            // Unload all stock price data and regenerate new data.
            chart.unload
            ({
                done: () =>
                {
                    let t1PriceHistory = this.generateRandomPrices(t1.value);
                    let t2PriceHistory = this.generateRandomPrices(t2.value);
                    let priceHistoryRatio = this.generatePriceHistoryRatio(t1PriceHistory, t2PriceHistory);
                    this.createDataTable(t1, t2, t1PriceHistory, t2PriceHistory, priceHistoryRatio);
                    // console.log(t1PriceHistory, t2PriceHistory);
                    // console.log(priceHistoryRatio);
                    chart.load({columns: [t1PriceHistory, t2PriceHistory]});
                    // chart.zoom([0,10]);
                    this.setState
                    ({
                        t1: t1.value,
                        t2: t2.value,
                        chart: chart, 
                        t1PriceHistory: t1PriceHistory,
                        t2PriceHistory: t2PriceHistory,
                        priceHistoryRatio: priceHistoryRatio
                    });
                }
            });
        } else
        { 
            console.log('Change at least one input value.');
        }
    }

    unloadData() {this.state.chart.unload();}

    generatePriceHistoryRatio(t1, t2)
    {
        let ratios = ['Ratio'], ratio;
        for (let i = 1; i < t1.length; i++)
        {
            ratio = t1[i] / t2[i];
            ratios.push(ratio);
        }
        return ratios;
    }

    generateRandomPrices(stockName)
    {
        let prices = [stockName],
            days = this.state.numDaysTenYears, 
            rand, price;
        for (let i = 0; i <= days; i++)
        {
            rand = Math.random() * (100 - 1) + 1;
            price = Math.ceil(rand * 100) / 100;
            prices.push(price);
        }
        return prices;
    }
    
    generateDaysList(days)
    {
        let daysList = ['Date'], d;
        for (let i = 0; i < days; i++)
        {
            d = new Date();
            d.setDate(d.getDate() - i);
            daysList.push(d);
        }
        return daysList;
    }

    getNumDaysForTenYears()
    {
        let dayMS = 24 * 60 * 60 * 1000;
        let today = new Date();
        let tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

        return Math.round(Math.abs((today.getTime() - tenYearsAgo.getTime()) / (dayMS)));
    }

    lineChart()
    {
        this.state.chart.transform('line');
    }

    barChart()
    {

        this.state.chart.transform('bar');
    }

    createDataTable(t1, t2, t1PriceHistory, t2PriceHistory, priceHistoryRatio)
    {
        let daysList = this.state.daysList,
            // t1PriceHistory = this.state.t1PriceHistory,
            // t2PriceHistory = this.state.t2PriceHistory,
            // priceHistoryRatio = this.state.priceHistoryRatio,
            numDaysTenYears = this.state.numDaysTenYears;
        
        let table, tableHead, tableBody, tableRows = [], currentRow;

        // tableHead holds the header of the data.
        tableHead = (
            <thead>
                <tr>
                    <th>{'Date'}</th>
                    <th>{t1.value}</th>
                    <th>{t2.value}</th>
                    <th>{'Ratio'}</th>
                </tr>
            </thead>
        );

        // Create each row with date, stock 1 price, stock 2 price, and price ratio.
        // Then push the row in the table rows.
        for (let i = 1; i < numDaysTenYears + 1; i++)
        {
            currentRow = (
                <tr key={i}>
                    <td>{daysList[i].toLocaleDateString()}</td>
                    <td>{t1PriceHistory[i]}</td>
                    <td>{t2PriceHistory[i]}</td>
                    <td>{priceHistoryRatio[i]}</td>
                </tr>
            );
            tableRows.push(currentRow);
        }
        // 
        tableBody = (<tbody>{tableRows}</tbody>);
        // Create the table.
        table = (
            <table className="table table-condensed table-hover table-bordered">
                {tableHead}
                {tableBody}
            </table>
        );
        this.setState({table: table});
    }

    render()
    {
        return (
            <div className="container">
                <h2 className="text-center">OP Stock Visuals</h2>
                <TickerForm
                    createChart = {(t1, t2) => this.createChart(t1, t2)}
                />
                <div className="row text-center">
                    <span className="icon" onClick={() => this.lineChart()}>
                        <i className="fa fa-line-chart fa-3x" aria-hidden="true"></i>
                    </span>
                    <span className="icon" onClick={() => this.barChart()}>
                        <i className="fa fa-bar-chart fa-3x" aria-hidden="true"></i>
                    </span>
                    <span className="icon" onClick={() => this.dataTable()}>
                        <i className="fa fa-table fa-3x" aria-hidden="true"></i>
                    </span>
                    <span className="icon" onClick={() => this.unloadData()}>
                        <i className="fa fa-times fa-3x" aria-hidden="true"></i>
                    </span>
                </div>
                <div id="chart" className="row"></div>
                <div className="table-responsive">
                    {this.state.table}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));