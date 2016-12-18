import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';

import TickerForm from './TickerForm';

class StockVisuals extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    componentDidMount()
    {
        let chart = c3.generate
        ({
            bindto: '#chart',
            data: {columns: []},
            axis: 
            {
                // x: {type: 'timeseries'},
                y: {label: {text: 'Stock Price', position: 'outer-middle'}}
            },
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
            let t1PriceHistory = this.getRandomPrices(t1.value);
            let t2PriceHistory = this.getRandomPrices(t2.value);
            // console.log(t1PriceHistory, t2PriceHistory);
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

    getRandomPrices(stockName)
    {
        let prices = [stockName];
        let days = this.getNumDaysForTenYears();
        let rand, price;
        for (let i = 0; i <= 50; i++)
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

        return Math.round(Math.abs((today.getTime() - tenYearsAgo.getTime())/(dayMS)));
    }

    render()
    {
        return (
            <div className="container">
                <TickerForm
                    createChart = {(t1, t2) => this.createChart(t1, t2)}
                />
                <div id="chart" className="row"></div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));