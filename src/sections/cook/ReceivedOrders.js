import React, { Component } from 'react';
import OrderCards from '../../components/order-cards'
import './sectionCook.css'
import db from '../../config/firebase';
import Button from "../../components/button";
import Modal from "react-bootstrap/Modal";

class ReceivedOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
          orders: [],
          showModal: false,
          currentOrder: {},
        }
      }

    hideModal = () => {
    this.setState({
        showModal: false,
        currentOrder: null,
    });
    };

    getModal(order) {
    return (
        <Modal className="modalCook" show={this.state.showModal} onHide={() => this.hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>
                ¿La orden fue preparada con éxito?
                </Modal.Title>
            </Modal.Header>
        <Modal.Body>
        <div className="buttonsModal">
            <Button title="Todavía no" onClick={() => this.hideModal()}/>
            <Button title="Confirmar" onClick={() => this.editCooked(order.id)}/>
        </div>
        </Modal.Body>
    </Modal>
    );
    }

    // Editar Post
    editCooked = (id) => {
        const postRef = db.collection('orders').doc(id);
        console.log('Está editando');
        return postRef.update({
        cooked: 'LISTO',
        }).then(() => {
        console.log('Document successfully updated!');
        this.hideModal()
        }).catch((error) => {
        console.error('Error updating document: ', error);
        });
    };

    handleClickOnCard = (e, order) => {
        e.preventDefault();

        //Actualizamos estado de Modal
        this.setState ({
            currentOrder: order,
            showModal: true, 
        })
        console.log('currentOrder', this.state.currentOrder)
    }

    

    componentDidMount() {
        const orderedByTime = db.collection('orders').where('cooked', '==', 'PREPARANDO').orderBy('time', 'asc');
        orderedByTime.onSnapshot((querySnapshot) => {
            const orders = [];
    
            querySnapshot.forEach(doc => {
              const infoOrder = 
              { dataOrder: doc.data(),
                id: doc.id }
                console.log(infoOrder);
              orders.push(infoOrder);
            });
    
            this.setState({
                  orders,
            });
        });
      } 


    render() {

        const { currentOrder, showModal } = this.state;
        return (
            <div className="containersOrders">
                <h4 className="titleContent">Por preparar:</h4>
                <div className="orderCardsDiv receivedOrders">
                    {this.state.orders.map(order => {
                    return (
                        <OrderCards 
                        name= {order.dataOrder.client}
                        table = {order.dataOrder.table}
                        order = {order.dataOrder.order}
                        state = {order.dataOrder.cooked}
                        delivered = {order.dataOrder.delivered}
                        onClick = {e => this.handleClickOnCard(e, order)}
                        />
                    )
                    })} 
                </div>
                { showModal && this.getModal(currentOrder) }
            </div>
        );
    }
}

export default ReceivedOrders;