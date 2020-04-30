import React, { Component } from 'react';
import '../../App.css';
import db from '../../config/firebase';
import OrderCards from '../../components/order-cards'
import './orderStats.css'

class OrderStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }
  }

  // const collectionOfOrders = db.collection('orders');
  
  componentDidMount() {
    const orderedByTime = db.collection('orders').orderBy('time', 'asc');
    orderedByTime.onSnapshot((querySnapshot) => {
        const orders = [];

        querySnapshot.forEach(doc => {
          // console.log(doc.data());
          const dataOrder = doc.data();
          orders.push(dataOrder);
          console.log("STATE:", this.state)
        });

        this.setState({
              orders,
        });
    });
  } 
  render () {
    
    return (
      <div className='container-orders'>
        <h5 className='title-OrderStats'>Estados de las órdenes:</h5>
            <div className='container-cards'>
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
      </div>
    )
  }


}

export default OrderStats;