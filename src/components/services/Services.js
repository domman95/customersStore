import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'


class Services extends Component {

    render() {
        const { services } = this.props
        if (services) {
            return (
                <div className="serviceBtns">
                    {services && services.map(service => {
                        return (
                            <button type="button" key={service.id} value={service.service} id={service.id} className="btn" onClick={() => {
                                const eachService = document.getElementById(`${service.id}`)
                                if (service.service === 'Koloryzacja' && !service.defaultCheck) {
                                    document.querySelector('.color_popUp').style.display = 'flex'
                                }
                                service.defaultCheck = !service.defaultCheck
                                service.defaultCheck ? eachService.classList.add('active') : eachService.classList.remove('active')
                                this.props.state.choosenServices = services.filter(serv => {
                                    return serv.defaultCheck ? serv.service : null
                                })
                            }}>{service.service}</button>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="serviceBtns">
                    <p>Wczytuję...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.firestore.ordered.services
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'services' }
    ])
)(Services)