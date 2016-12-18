import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';

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
            data: 
            {
                columns: 
                [
                    
                ]
            }
        });
        this.setState({chart: chart});
    }

    createChart(e)
    {
        e.preventDefault();
        if (this._t1.value.toUpperCase() && this._t2.value.toUpperCase())
        {
            /* Get chart and generate random prices. */
            let chart = this.state.chart;
            let t1PriceHistory = this.getRandomPrices(this._t1.value);
            let t2PriceHistory = this.getRandomPrices(this._t2.value);
            console.log(t1PriceHistory, t2PriceHistory);
            chart.load
            ({
                columns: [t1PriceHistory, t2PriceHistory],
                axis: 
                {
                    x: {},
                    y: {label: 'Stock Prices'}
                }
            });
            this.setState({chart: chart});
        } else
        {
            /* Alert */
        }
    }

    getRandomPrices(stockName)
    {
        let prices = [stockName];
        let rand, price;
        for (let i = 0; i < 3600; i++)
        {
            rand = Math.random() * (100 - 1) + 1;
            price = Math.ceil(rand * 100) / 100;
            prices.push(price);
        }
        return prices;
    }

    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <form className="col-sm-4 center-block" onSubmit={(e) => this.createChart(e)}>
                        <div className="form-group">
                            <label>Ticker 1</label>
                            <input className="form-control" ref={(ref) => this._t1 = ref} type="text" maxLength="10"/>
                        </div>
                        <div className="form-group">
                            <label>Ticker 2</label>
                            <input className="form-control" ref={(ref) => this._t2 = ref} type="text" maxLength="10"/>
                        </div>
                        <button type="submit" className="btn">Update</button>
                    </form>
                </div>
                <div id="chart" className="row"></div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));