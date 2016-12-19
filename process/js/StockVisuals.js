import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';

import TickerForm from './TickerForm';
import OptionBar from './OptionBar'

class StockVisuals extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            type: 'line'
        };
    }

    componentDidMount()
    {
        let today = new Date(),
            tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()),
            numDaysTenYears = this.getNumDaysBetween(today, tenYearsAgo),
            dateList = this.generateDateList(numDaysTenYears),
            chart = c3.generate
            ({
                bindto: '#chart',
                data: 
                {
                    x: 'Date',
                    columns: [],
                    selection: {draggable: true}
                },
                axis: 
                {
                    x:  {
                            type: 'timeseries',
                            tick: {format: '%m/%d/%Y'},
                            // label: {text: 'Date MM/DD/YYYY', position: 'outer-center'}
                        },
                    y: {label: {text: 'Stock Price', position: 'outer-middle'}}
                },
                size: {height: 480},
                zoom: {enabled: true}
            });
        this.setState({numDaysTenYears: numDaysTenYears, dateList: dateList, chart: chart});
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
                    let numDaysTenYears = this.state.numDaysTenYears,
                        dateList = this.state.dateList,
                        t1PriceHistory = this.generateRandomPrices(t1.value),
                        t2PriceHistory = this.generateRandomPrices(t2.value),
                        priceHistoryRatio = this.generatePriceHistoryRatio(t1PriceHistory, t2PriceHistory);

                    this.createDataTable(dateList, numDaysTenYears, t1, t2, t1PriceHistory, t2PriceHistory, priceHistoryRatio);
                    // console.log(t1PriceHistory, t2PriceHistory);
                    // console.log(priceHistoryRatio);
                    chart.load
                    ({
                        columns: [dateList, t1PriceHistory, t2PriceHistory]
                    });
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

    createDataTable(dateList, numDaysTenYears, t1, t2, t1PriceHistory, t2PriceHistory, priceHistoryRatio)
    {   
        let table, tableHead, tableBody, tableRows = [], currentRow;

        // tableHead holds the header of the data.
        tableHead = (
            <thead>
                <tr>
                    <th>Date</th>
                    <th>{t1.value}</th>
                    <th>{t2.value}</th>
                    <th>Ratio</th>
                </tr>
            </thead>
        );

        // Create each row with date, stock 1 price, stock 2 price, and price ratio.
        // Then push the row in the table rows.
        for (let i = 1; i < numDaysTenYears + 1; i++)
        {
            currentRow = (
                <tr key={i}>
                    <td>{dateList[i].toLocaleDateString()}</td>
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
            random, price;
        for (let i = 0; i <= days; i++)
        {
            random = Math.random() * (100 - 1) + 1;
            price = Math.ceil(random * 100) / 100;
            prices.push(price);
        }
        return prices;
    }
    
    generateDateList(days)
    {
        let dateList = ['Date'], d;
        for (let i = 0; i < days; i++)
        {
            d = new Date();
            d.setDate(d.getDate() - i);
            dateList.push(d);
        }
        return dateList;
    }

    getNumDaysBetween(d1, d2)
    {
        let dayMS = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((d1.getTime() - d2.getTime()) / (dayMS)));
    }

    lineChart()
    {
        this.state.chart.transform('line');
        this.setState({type: 'line'});
    }

    barChart()
    {
        this.state.chart.transform('bar');
        this.setState({type: 'bar'});
    }

    dataTable()
    {
        this.setState({type: 'table'});
    }

    unloadData() {this.state.chart.unload();}

    render()
    {
        return (
            <div className="container">
                <h2 className="text-center">OP Stock Visuals</h2>
                <TickerForm
                    createChart = {(t1, t2) => this.createChart(t1, t2)}
                />
                <OptionBar
                    chartType = {this.state.type}
                    lineChart = {() => this.lineChart()}
                    barChart = {() => this.barChart()}
                    dataTable = {() => this.dataTable()}
                    unloadData = {() => this.unloadData()}
                />
                <div className="row">
                    {
                        this.state.type === 'line' || 
                        this.state.type === 'bar' ?
                        <div id="chart"></div> : 
                        <div className="table-responsive">
                            {this.state.table}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));