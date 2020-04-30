import React from 'react';
import PropTypes from 'prop-types'
import './ready-cards.css'

const ReadyCards = ({name, table, order, state, delivered, onClick}) => {
    return (
        <div
        className = 'ready-cards'
        onClick= {onClick} >
            <div className='identification-ready'>
                <p>{name}</p>
                <p>Mesa: {table}</p>
            </div>
            <div>
              {order.map((item) => {
                return (
                <div>
                <p className='item-ready mainItem-ready'>- {item.name}</p>
                <p className='item-ready subMenus-ready'>{item.option}</p>
                <p className='item-ready subMenus-ready'>{item.extras}</p>
                </div>
                )
              })}
            </div>
            <div className='status-ready'>
                <p>Estado: <span className='cooked-ready'>{state}</span></p>
                <p>Entregado: <span className='preparation-ready'>{delivered}</span></p>
            </div>
    </div>
    )
}

ReadyCards.propTypes = {
    onClick: PropTypes.func
}

export default ReadyCards;