import React, { Component } from 'react';
import './sectionCook.css'
import db from '../../config/firebase';
import ReadyCards from '../../components/ready-cards'

class ReadyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
          orders: [],
        }
      }

    componentDidMount() {
        const orderedByTime = db.collection('orders').where('cooked', '==', 'LISTO').orderBy('time', 'asc');
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
        return (
            <div className="containersOrders">
                <h4 className="titleContent">Listos, para retirar:</h4>
                <div className="orderCardsDiv readyOrders">
                    {this.state.orders.map(order => {
                        return (
                            <ReadyCards
                                name={order.dataOrder.client}
                                table={order.dataOrder.table}
                                order={order.dataOrder.order}
                                state={order.dataOrder.cooked}
                                delivered={order.dataOrder.delivered}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ReadyOrders;