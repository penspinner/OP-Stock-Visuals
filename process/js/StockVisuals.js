import React from 'react';
import ReactDOM from 'react-dom';

class StockVisuals extends React.Component
{
    render()
    {
        return (
            <div>
                <div>
                    <input type="text"/>
                    <input type="text"/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StockVisuals/>, document.getElementById('stockVisuals'));