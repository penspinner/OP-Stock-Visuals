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
        this.setState({chart: chart});
    }

    createChart(t1, t2)
    {
        if (t1.value && t2.value)
        {
            /* Get chart and generate random prices. */
            let chart = this.state.chart;
            let t1PriceHistory = this.generateRandomPrices(t1.value);
            let t2PriceHistory = this.generateRandomPrices(t2.value);
            let priceHistoryRatio = this.generatePriceHistoryRatio(t1PriceHistory, t2PriceHistory);
            console.log(t1PriceHistory, t2PriceHistory);
            console.log(priceHistoryRatio);
            chart.load
            ({
                columns: [t1PriceHistory, t2PriceHistory],
            });
            chart.zoom([0,10]);
            this.setState({chart: chart});
        } else
        {
            /* Alert */
        }
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
            days = this.getNumDaysForTenYears(), 
            rand, price;
        for (let i = 0; i <= 100; i++)
        {
            rand = Math.random() * (100 - 1) + 1;
            price = Math.ceil(rand * 100) / 100;
            prices.push(price);
        }
        return prices;
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

    dataTable()
    {
        
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
                </div>
                <div id="chart" className="row"></div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));