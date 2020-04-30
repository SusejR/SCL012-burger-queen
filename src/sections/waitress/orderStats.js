import React, { Component } from 'react';
import '../../App.css';
import db from '../../config/firebase';
import OrderCards from '../../components/order-cards'
import ReadyCards from '../../components/ready-cards'
import './orderStats.css'
import Button from "../../components/button";
import Modal from "react-bootstrap/Modal";

class OrderStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      ordersReady: [],
      currentOrder: null,
      showModal: false,
    }
  }

  hideModal = () => {
    this.setState({
        showModal: false,
        currentOrder: null,
    });
  };

  deleteOrder = (id) => {
    db.collection("orders").doc(id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      this.hideModal()
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  getModal(order) {
    return (
        <Modal className="modalCook" show={this.state.showModal} onHide={() => this.hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>
                ¿La orden fue entregada con éxito?
                </Modal.Title>
            </Modal.Header>
        <Modal.Body>
        <div className="buttonsModal">
            <Button title="Todavía no" onClick={() => this.hideModal()}/>
            <Button title="Confirmar" onClick={() => this.deleteOrder(order.id)}/>
        </div>
        </Modal.Body>
    </Modal>
    );
    }

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
    const orderedCooking = db.collection('orders').where('cooked', '==', 'PREPARANDO').orderBy('time', 'asc');
    orderedCooking.onSnapshot((querySnapshot) => {
        const orders = [];

        querySnapshot.forEach(doc => {
          // console.log(doc.data());
          const dataOrder = doc.data();
          orders.push(dataOrder);
        });

        this.setState({
              orders,
        });
    });

    const orderedReady = db.collection('orders').where('cooked', '==', 'LISTO').orderBy('time', 'asc');
    orderedReady.onSnapshot((querySnapshot) => {
        const ordersReady = [];

        querySnapshot.forEach(doc => {
          const infoOrder = 
              { dataOrder: doc.data(),
                id: doc.id }
          ordersReady.push(infoOrder);
        });

        this.setState({
              ordersReady,
        });
    });
  } 
  render () {
    
    const { currentOrder, showModal } = this.state;
    return (
      <div className='container-orders'>
        <h5 className='title-OrderStats'>Estados de las órdenes:</h5>
            <div className='container-cards'>
                {this.state.ordersReady.map((order) => {
                return (
                    <ReadyCards 
                    name= {order.dataOrder.client}
                    table = {order.dataOrder.table}
                    order = {order.dataOrder.order}
                    state = {order.dataOrder.cooked}
                    delivered = {order.dataOrder.delivered}
                    onClick = {e => this.handleClickOnCard(e, order)}
                    />
                )
                })} 
                {this.state.orders.map((order) => {
                return (
                    <OrderCards 
                    name= {order.client}
                    table = {order.table}
                    order = {order.order}
                    state = {order.cooked}
                    delivered = {order.delivered}
                    />
                )
                })} 
            </div>
            { showModal && this.getModal(currentOrder) }
      </div>
    )
  }


}

export default OrderStats;