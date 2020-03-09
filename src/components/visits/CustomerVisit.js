import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { deleteVisit } from '../../store/actions/customerAction'
import DeleteVisit from '../visits/DeletetVisit';


class CustomerVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visits: [],
            deleteVisit: false,
            id: ''
        }
    }

    componentDidMount = () => {
        const db = getFirestore()
        db.collection('customers').doc(this.props.id).collection('visits').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let wholeVisit = {
                    id: doc.id,
                    visit: [doc.data()]
                }
                this.setState({
                    visits: [...this.state.visits, wholeVisit]
                })
            })
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        this.setState({
            deleteVisit: !this.state.deleteVisit
        })
    }


    render() {
        const sortedVisits = this.state.visits.sort((a, b) => a.visit[0].time.seconds < b.visit[0].time.seconds ? 1 : -1)
        const { customer } = this.props
        const lastLetter = customer.firstName[customer.firstName.length - 1]

        if (sortedVisits.length > 0) {
            return (
                <div className="customerVisits">
                    {sortedVisits.map(visit => {
                        let date = new Date(visit.visit[0].time.seconds * 1000)
                        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                        let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
                        let fullDate = `${day}-${month}-${date.getFullYear()}`
                        return (
                            <div className="singleVisit" key={visit.id} id={visit.id}>
                                <div className="singleVisitHeader">
                                    <p className="singleVisitText">Data wizyty: {fullDate}</p>
                                    <button className="material-icons deleteBtn" style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); this.setState({ deleteVisit: true, id: visit.id, time: fullDate }) }}>delete</button>
                                </div>

                                {visit.visit[0].activeUser ? (<p className="createdBy">Utworzone przez: {visit.visit[0].activeUser.firstName} {visit.visit[0].activeUser.lastName}</p>) : null}
                                {visit.visit[0].visit.map(vis => {
                                    return <div className="singleVisitInfo" key={vis.id}>{vis.color ? `${vis.service}: ${vis.color}` : `${vis.service}`}</div>
                                })}
                                {this.state.deleteVisit ? <DeleteVisit onClose={this.handleClick} deleteVisit={this.props.deleteVisit} id={this.state.id} time={this.state.time} userID={this.props.id} /> : null}

                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="noVisit">
                    {lastLetter === 'a' ? (
                        <h1>{customer.firstName} jeszcze u nas nie była!</h1>
                    ) : (
                            <h1>{customer.firstName} jeszcze u nas nie był!</h1>
                        )}
                    <button id="addVisit" style={{ cursor: 'pointer' }} onClick={this.props.addVisit} className="addFirstVisit">Dodaj pierwszą wizytę</button>
                </div>
            )

        }
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteVisit: (id, userID) => dispatch(deleteVisit(id, userID))
    }
}


export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
        { collection: 'visits' }
    ])
)(CustomerVisit)