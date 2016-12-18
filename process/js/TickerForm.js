import React from 'react';

class TickerForm extends React.Component
{
    createChart(e)
    {
        e.preventDefault();
        this._t1.value = this._t1.value.toUpperCase().trim();
        this._t2.value = this._t2.value.toUpperCase().trim();
        this.props.createChart(this._t1, this._t2);
    }

    render()
    {
        return (
            <div className="row">
                <form className="col-sm-4 col-sm-offset-4" onSubmit={(e) => this.createChart(e)}>
                    <div className="form-group">
                        <label>Ticker 1</label>
                        <input className="form-control" ref={(ref) => this._t1 = ref} type="text" maxLength="10" autoFocus/>
                    </div>
                    <div className="form-group">
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