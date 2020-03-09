import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Services from '../services/Services';
import { connect } from 'react-redux';
import { createVisit } from '../../store/actions/customerAction'


class AddVisit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            firstStepIsDone: false,
            choosenServices: [],
            color: '',
            closeColor: false,
            activeUser: {
                firstName: this.props.auth.firstName,
                lastName: this.props.auth.lastName
            }
        }
        this.choose = []

        this._handleChange = this._handleChange.bind(this)
        this._createVisit = this._createVisit.bind(this)
        this._handleClick = this._handleClick.bind(this)
        this._removeIfClose = this._removeIfClose.bind(this)

    }

    _removeIfClose = (x, y, z) => {
        x.map(item => {
            if (item.z === y) {
                return { ...item, z }
            } else {
                return item
            }
        })
    }

    _handleClick = (e) => {
        e.preventDefault()
        document.querySelector('.color_popUp').style.display = 'none'
        this.state.choosenServices.find(i => {
            return i.service.includes('Koloryzacja') ? i.color = this.state.color : null
        })
        document.querySelector('.colorInput').value = ''
    }

    _handleChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    _createVisit = (e) => {
        e.preventDefault()
        const visits = this.state.choosenServices.filter(visit => {
            return visit === undefined ? null : visit
        })
        visits.length === 0 ? alert('Wybierz usługi') : this.props.createVisit(visits, this.props.id, this.state.startDate, this.state.activeUser)
    }

    render() {
        return (
            <div className="addVisit_popUp">
                <div className="color_popUp">
                    <form className="colorForm">
                        <div onClick={() => { document.querySelector('.color_popUp').style.display = 'none'; this.setState({ closeColor: true, choosenServices: this.state.choosenServices.map(item => { return item.service === 'Koloryzacja' ? item.defaultCheck = false : item }) }); document.querySelector('button[value="Koloryzacja"]').classList.remove('active') }} className="exit"><i className="material-icons">close</i></div>
                        <input className="colorInput" type="text" placeholder="Wpisz kod farby" onChange={(e) => { this.setState({ color: e.target.value }) }} />
                        <button className="colorSubmit" type="submit" value="Zatwierdź" onClick={this._handleClick}>Zatwierdź</button>
                    </form>
                </div>

                <div className="addVisitPanel">
                    <div onClick={this.props.onClose} className="exit"><i className="material-icons">close</i></div>
                    {!this.state.firstStepIsDone ? (
                        <div className="datapicker">
                            <label className="datapickerText" htmlFor="datapicker">Wybierz datę wizyty</label>
                            <DatePicker
                                className="datapickerInput"
                                name="datapicker"
                                selected={this.state.startDate}
                                dateFormat="dd/MM/yyyy"
                                onChange={this._handleChange}
                                disabledKeyboardNavigation
                            />
                            <button className="datapickerSubmit" onClick={(e) => { e.preventDefault(); this.setState({ firstStepIsDone: true }) }}>Dalej</button>
                        </div>
                    ) : (
                            <div className="services">
                                <div onClick={() => this.setState({ firstStepIsDone: false })} className="back"><i className="material-icons">arrow_back</i></div>
                                <label className="servicesText" htmlFor="services">Wybierz usługi</label>
                                <Services choose={this.choose} state={this.state} />
                                <button type="submit" onClick={this._createVisit} className="servicesSubmit" >Utwórz wizytę</button>
                            </div>)}
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        createVisit: (visit, id, time, activeUser) => dispatch(createVisit(visit, id, time, activeUser))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVisit)