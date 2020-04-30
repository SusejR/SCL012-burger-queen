import React, { Component } from "react";
import "../../App.css";
import "./menu.css";
import Button from "../../components/button";
import meals from "../../data.json";
import Modal from "react-bootstrap/Modal";

// Componente que muestra el menú dependiendo si es breakfast o dinner
class MenuList extends Component {

  constructor(props) {
    super(props);

    this.state = {      
      showModal: false,
      currentMeal: null,
      option: null,
      extras: []
    };
  }


  hideModal = () => {
    this.setState({
      showModal: false,
      currentMeal: null,
      option: null,
      extras: []
    });
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      option: value,
    });
  }

  handleChangeCheckbox = (event) => {
    const value = event.target.name;
    this.setState(previousState => ({
      extras: [...previousState.extras, value]
    }));
  }

  // actualizar el estado del modal
  addItem = () => {
    if (this.state.option === null) {
      return alert ('Tienes que escoger una de las opciones obligatorias')
    }

    const productModal = {
      name: this.state.currentMeal.name,
      price: this.state.currentMeal.price,
      id: this.state.currentMeal.id,
      option: this.state.option,
      extras: this.state.extras
    }

    this.props.addOrder(productModal);
    this.hideModal();
  }

  // Clicks en los items del menú
  handleClick = (e, meal) => {
    e.preventDefault();
    console.log(`> meal:`, meal);
    // Si no tiene opciones para personalizar el producto
    if (typeof meal.options === "undefined" && typeof meal.extras === "undefined") {
      //Pasamos la función que actualiza el estado de la orden y le pasamos como parametro la data 
      this.props.addOrder(meal);

      return
    }
    //Actualizamos estado de Modal
    this.setState ({
      currentMeal : meal,
      showModal: true, 
    })
  };

  // Modal de las hamburguesas
  getModal(meal) {
    return (
      <Modal key={`modal-${meal.id}`} show={this.state.showModal} onHide={() => this.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {meal.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6" onChange={event => this.handleChange(event)}>
            <p>Elige el tipo:<span className='asterisk'>*</span></p>
            {meal.options.map(option => {
              return (
                <label className="container" key={option.id}>
                  <input type="radio" name="RadioOption" value={option.name} required/>{" "}
                  {option.name}
                </label>
              )
            })}
          </div>

          <div className="col-6" onChange={event => this.handleChangeCheckbox(event)}>
            <p>Elige extra:</p>
            {meal.extras.map(extra => {
              return (
                <label className="container">
                  <input key={extra.id} name={`${extra.name} $${extra.price}`} type="checkbox"/> {extra.name} ${extra.price}
                </label>
              )
            })}
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button title="Agregar" onClick={()=>this.addItem()} />
      </Modal.Footer>
    </Modal>
    );
  }

  render() {
    // Mapea y muestra cada uno de los elementos del array escogido (Breakfast o dinner)
    const meals = this.props.meals.map(meal => {
      return (
        <div
          key={meal.id}
          className="itemsMenu"
          onClick={e => this.handleClick(e, meal)}
        >
          <p className="itemName">{meal.name}</p>
          <p className="itemPrice">${meal.price}</p>
        </div>
      );
    });

    const { currentMeal, showModal } = this.state;
    return (
      // Se muestra la constante meals que se declara arriba      
      <div>
        { showModal && this.getModal(currentMeal) }
        <div className="itemDiv">{meals}</div>
      </div>
    );
  }
}


// COMPONENTE PRINCIPAL
class Menu extends Component {
  // Flags para mostrar o ocultar los menús
  state = {
    visibleBreakfast: false,
    visibleDinner: false,
  };
  
  // Filtra los elemntos de la data de acuerdo al prop que se le pase (breakfast o dinner)
  // y te deja la data filtrada para manipularla en MenuList
  getMealsByType(type) {
    return meals.filter(meal => {
      return meal.type === type;
    });
  }

  render() {
    // Cambios en los flags de acuerdo al botón
    const _renderBreakfast = () => {
      this.setState({
        visibleBreakfast: !this.state.visibleBreakfast,
        visibleDinner: false
      });
    };

    const _renderDinner = () => {
      this.setState({
        visibleBreakfast: false,
        visibleDinner: !this.state.visibleDinner
      });
    };

    return (
      <div className="menu">
        <h5 className="titleMenu">Elige el tipo de menú:</h5>
        <div className="divButtons">
          <div className='button-breakfast'><Button title="Desayuno" onClick={_renderBreakfast} /></div>
          <Button title="Almuerzo/Cena" onClick={_renderDinner} />
        </div>
        {this.state.visibleBreakfast ? (
          <MenuList
            addOrder={this.props.addOrder}
            meals={this.getMealsByType("breakfast")}
          />
        ) : null}
        {this.state.visibleDinner ? (
          <MenuList
          addOrder={this.props.addOrder}
            meals={this.getMealsByType("dinner")}
          />
        ) : null}
      </div>
    );
  }
}

export default Menu;
