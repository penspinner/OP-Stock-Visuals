import React from 'react';

let defaultEndDate = new Date();
let defaultStartDate = new Date(defaultEndDate.getFullYear() - 1, defaultEndDate.getMonth(), defaultEndDate.getDate());

function formatDate(date, divider) 
{
    var someday = new Date(date);
    var month = someday.getUTCMonth() + 1;
    var day = someday.getUTCDate();
    var year = someday.getUTCFullYear();

    if (month <= 9) { month = '0' + month; }
    if (day <= 9) { day = '0' + day; }

    return ('' + year + divider + month + divider + day);
}

class TickerForm extends React.Component
{
    /* Validate ticker input and then send to props to generate chart. */
    initData(e)
    {
        e.preventDefault();
        this._t1.value = this._t1.value.toUpperCase().trim();
        this._t2.value = this._t2.value.toUpperCase().trim();
        console.log(this._dStart, this._dEnd);
        console.log(new Date(this._dStart.value), new Date(this._dEnd.value));
        if (this._t1.value && this._t2.value)
            this.props.initData(this._t1.value, this._t2.value, this._dStart.value, this._dEnd.value);
    }

    render()
    {
        return (
            <div className="col-md-12 nopad">
                <form onSubmit={(e) => this.initData(e)}>
                    <div className="input-group">
                        <label>Ticker 1</label>
                        <input className="form-control" ref={(ref) => this._t1 = ref} type="text" maxLength="10" autoFocus/>
                    </div>
                    <div className="input-group">
                        <label>Ticker 2</label>
                        <input className="form-control" ref={(ref) => this._t2 = ref} type="text" maxLength="10"/>
                    </div>
                    <div className="input-group">
                        <label>Generate data between:</label>
                        <input className="form-control" ref={(ref) => this._dStart = ref} type="date"
                            defaultValue={formatDate(defaultStartDate, '-')}/>
                        <input className="form-control" ref={(ref) => this._dEnd = ref} type="date"
                            defaultValue={formatDate(defaultEndDate, '-')}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }
}

export default TickerForm;