import React from 'react';

class TickerForm extends React.Component
{
    /* Validate ticker input and then send to props to generate chart. */
    createChart(e)
    {
        e.preventDefault();
        this._t1.value = this._t1.value.toUpperCase().trim();
        this._t2.value = this._t2.value.toUpperCase().trim();
        if (this._t1.value && this._t2.value)
            this.props.createChart(this._t1, this._t2);
    }

    render()
    {
        return (
            <div className="col-md-12 nopad">
                <form onSubmit={(e) => this.createChart(e)}>
                    <div className="input-group">
                        <label>Ticker 1</label>
                        <input className="form-control" ref={(ref) => this._t1 = ref} type="text" maxLength="10" autoFocus/>
                    </div>
                    <div className="input-group">
                        <label>Ticker 2</label>
                        <input className="form-control" ref={(ref) => this._t2 = ref} type="text" maxLength="10"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }
}

export default TickerForm;