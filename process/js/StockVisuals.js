// import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';
// import yahooFinance from 'yahoo-finance';
// import googleFinance from 'google-finance';

import TickerForm from './TickerForm';
import OptionBar from './OptionBar';
import Statistics from './Statistics';
import ChartAndTable from './ChartAndTable';

class StockVisuals extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            type: 'line',
            typeTitle: 'Progression Chart',
            t1: 'Ticker 1',
            t2: 'Ticker 2'
        };
    }

    /* On mount, init chart and set it in the state. */
    componentDidMount()
    {
        let chart = c3.generate
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
                    y:  {
                            label: {text: 'Ticker 1 Stock Price $', position: 'outer-middle'}
                        },
                    y2: {
                            label: {text: 'Ticker 2 Stock Price $', position: 'outer-middle'},
                            show: true
                        }
                },
                grid: {y: {show: true}},
                bar:  {width: 3},
                size: {height: 500},
                zoom: {enabled: true}
            });
        this.setState({chart: chart});
    }

    
    /** 
     * Generate data for the given tickers and starting & ending date.
     * Then store them in the state and create the charts and table.
    */
    initData(t1, t2, startDateString, endDateString)
    {
        // Create new chart only if input values are different from before. 
        if (t1 !== this.state.t1 ||
            t2 !== this.state.t2 ||
            startDateString !== this.state.startDateString ||
            endDateString !== this.state.endDateString)
        {
            // console.log(startDateString,endDateString);
            // yahooFinance.historical
            // (
            //     {
            //         symbols: [t1, t2],
            //         from: startDateString,
            //         to: endDateString,
            //     }, (err, result) =>
            //     {
            //         console.log(result);
            //     }
            // );
            // // https://www.google.com/finance/historical?q=YHOO&startdate=2015-12-20&enddate=2016-12-20
            // let data = {
            //     "q": t1,
            //     "startdate": startDateString,
            //     "enddate": endDateString,
            //     "output": "csv"
            // };
            // $.ajax
            // ({
            //     url: 'https://www.google.com/finance/historical',
            //     data: data,
            //     type: 'GET',
            //     // crossDomain: true,
            //     dataType: 'csv',
            //     success: function(res) { console.log(res); },
            //     error: function(xhr) { console.log(xhr); }
            //     // beforeSend: setHeader
            // });
            
            let typeTitle = this.state.type === 'bar' ? 'Price Ratio Chart (' + t1 + ' : ' + t2 + ')' : this.state.typeTitle,
                numDays = this.getNumDaysBetween(new Date(startDateString.replace(/-/g, '\/')), new Date(endDateString.replace(/-/g, '\/'))),
                dateList = this.generateDateList(numDays, endDateString.replace(/-/g, '\/')),
                t1PriceHistory = this.generateRandomPrices(t1, numDays),
                t2PriceHistory = this.generateRandomPrices(t2, numDays, 150, 100),
                priceHistoryRatio = this.generatePriceHistoryRatio(t1PriceHistory.slice(1), t2PriceHistory.slice(1)),
                statistics = this.getDataStatistics(t1, t2, t1PriceHistory.slice(1), t2PriceHistory.slice(1));

            // Set values into the state.
            this.setState
            (
                {
                    t1: t1,
                    t2: t2,
                    typeTitle: typeTitle,
                    startDateString: startDateString,
                    endDateString: endDateString,
                    numDays: numDays,
                    dateList: dateList,
                    t1PriceHistory: t1PriceHistory,
                    t2PriceHistory: t2PriceHistory,
                    priceHistoryRatio: priceHistoryRatio,
                    statistics: statistics
                }, 
                // Then create the charts and table.
                () =>
                {
                    this.fillChart(t1, t2, dateList, t1PriceHistory, t2PriceHistory, priceHistoryRatio);
                    this.fillDataTable(t1, t2, numDays, dateList, t1PriceHistory, t2PriceHistory, priceHistoryRatio);
                }
            );
        }   
    }

    /**
     * Retrieve some statistics from the tickers price histories.
     */
    getDataStatistics(t1, t2, t1PriceHistory, t2PriceHistory)
    {  
        let t1Max = Math.max(...t1PriceHistory),
            t2Max = Math.max(...t2PriceHistory),
            t1Min = Math.min(...t1PriceHistory),
            t2Min = Math.min(...t2PriceHistory),
            t1Recent = t1PriceHistory[t1PriceHistory.length - 1],
            t2Recent = t2PriceHistory[t2PriceHistory.length - 1],
            t1Oldest = t1PriceHistory[0],
            t2Oldest = t2PriceHistory[0];
        
        return {
            t1: t1,
            t2: t2,
            t1Max: t1Max,
            t2Max: t2Max,
            t1Min: t1Min,
            t2Min: t2Min,
            t1Recent: t1Recent,
            t2Recent: t2Recent,
            t1Oldest: t1Oldest,
            t2Oldest: t2Oldest
        };
    }

    /**
     * Fills the chart with the given parameters and stores it into the state.
     */
    fillChart(t1, t2, dateList, t1PriceHistory, t2PriceHistory, priceHistoryRatio)
    {
        let chart = this.state.chart;
        // Unload all stock price data and regenerate new data.
        chart.unload
        ({
            done: () =>
            {   
                chart.load
                ({
                    columns: [dateList, t1PriceHistory, t2PriceHistory, priceHistoryRatio],
                    axes: {[t2]: 'y2'}
                });
                // chart.zoom([new Date().setDate(new Date().getDate() - 10), new Date()]);
                this.setState({chart: chart}, 
                () => {
                    if (this.state.type === 'line') this.lineChart();
                    else if (this.state.type === 'bar') this.barChart();
                });
            }
        });
    }

    /**
     * Fills the data table and stores it into the state.
     */
    fillDataTable(t1, t2, numDays, dateList, t1PriceHistory, t2PriceHistory, priceHistoryRatio)
    {
        let table, tableHead, tableBody, tableRows = [], currentRow;

        // tableHead holds the header of the data.
        tableHead = (
            <thead>
                <tr>
                    <th>Date</th>
                    <th>{t1}</th>
                    <th>{t2}</th>
                    <th>Ratio</th>
                </tr>
            </thead>
        );
        // Create each row with date, stock 1 price, stock 2 price, and price ratio.
        // Then push the row in the table rows.
        for (let i = numDays + 1; i >= 1; i--)
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
        // Create the table body.
        tableBody = (<tbody>{tableRows}</tbody>);
        // Create the table.
        table = (
            <table className="table table-condensed table-bordered table-striped">
                {tableHead}
                {tableBody}
            </table>
        );
        this.setState({table: table});
    }

    generatePriceHistoryRatio(t1, t2)
    {
        let ratios = ['Ratio'], ratio;
        for (let i = 0; i < t1.length; i++)
        {
            ratio = t1[i] / t2[i];
            ratios.push(ratio);
        }
        return ratios;
    }

    generateRandomPrices(stockName, days, max = 100, min = 75)
    {
        let prices = [stockName],
            random, price;
        for (let i = 0; i <= days; i++)
        {
            random = Math.random() * (max - min) + min;
            price = Math.ceil(random * 100) / 100;
            prices.push(price);
        }
        return prices;
    }
    
    generateDateList(days, dateString)
    {
        let dateList = ['Date'], d;
        for (let i = days; i >= 0; i--)
        {
            d = new Date(dateString);
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

    /**
     * Switch to line chart
     */
    lineChart()
    {
        let chart = this.state.chart;

        // Hides the price history ratio and shows the ticker data.
        chart.hide(['Ratio']);
        chart.legend.hide(['Ratio']);
        chart.show([this.state.t1, this.state.t2]);
        chart.legend.show([this.state.t1, this.state.t2]);
        // Shows the y2 axis.
        document.getElementsByClassName('c3-axis-y2')[0].style.display = '';
        // Changes the labels
        chart.axis.labels({y: this.state.t1 + ' Stock Price $', y2: this.state.t2 + ' Stock Price $'});
        chart.transform('line');
        this.setState({type: 'line', typeTitle: 'Progression Chart'});
    }

    /**
     * Switch to bar chart.
     */
    barChart()
    {
        let chart = this.state.chart;

        // Shows the price history ratio and hides the ticker data.
        chart.show(['Ratio']);
        chart.legend.show(['Ratio']);
        chart.hide([this.state.t1, this.state.t2]);
        chart.legend.hide([this.state.t1, this.state.t2]);
        // Hides the y2 axis.
        document.getElementsByClassName('c3-axis-y2')[0].style.display = 'none';
        // Changes the y axis to ratio.
        chart.axis.labels({y: 'Ratio'});
        chart.transform('bar');
        this.setState({type: 'bar', typeTitle: 'Price Ratio Chart (' + this.state.t1 + ' : ' + this.state.t2 + ')'});
    }

    switchToLineChart() { if (this.state.type !== 'line') this.lineChart(); }
    switchToBarChart() { if (this.state.type !== 'bar') this.barChart(); }

    /**
     * Switch to data table.
     */
    dataTable()
    {
        if (this.state.type !== 'table')
        {
            this.setState({type: 'table', typeTitle: 'Data Table'});
        }
    }

    /**
     * Unload all data from the chart and resets the state and ticker fields.
     */
    unloadData() 
    {
        if (confirm('Are you sure you want to unload the chart data?'))
        {
            this.state.chart.unload();
            this.setState
            ({
                t1: 'Ticker 1',
                t2: 'Ticker 2',
                t1PriceHistory: [],
                t2PriceHistory: [],
                priceHistoryRatio: [],
                statistics: null,
                table: null
            });
            this._TickerForm.resetFields();
        }
    }

    render()
    {
        return (
            <div>
                <div className="title text-center">OP Stock Visuals</div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 pad">
                            <ChartAndTable
                                typeTitle = {this.state.typeTitle}
                                type = {this.state.type}
                                table = {this.state.table}
                            />
                        </div>
                        <div className="col-md-3 pad">
                            <TickerForm
                                ref = {(ref) => this._TickerForm = ref}
                                initData = {(t1, t2, startDate, endDate) => this.initData(t1, t2, startDate, endDate)}
                            />
                            <OptionBar
                                chartType = {this.state.type}
                                lineChart = {() => this.switchToLineChart()}
                                barChart = {() => this.switchToBarChart()}
                                dataTable = {() => this.dataTable()}
                                unloadData = {() => this.unloadData()}
                            />
                            {
                                this.state.statistics &&
                                <Statistics
                                    statistics = {this.state.statistics}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));