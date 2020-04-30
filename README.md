![logo](./src/imagenes/logo.png)

Burger Queen es una aplicación diseñada para simplificar y optimizar el proceso de comunicación entre mesoneros (garzones) y cocina. Así como también recepción y despacho de pedidos.

# Definición del Producto 🍔

Esta aplicación está enfocada en simplificar la comunicación entre el salón y la cocina. Los mesoneros tomarán la orden en su tablet, con nombre del usuario y número de mesa. Al tomar la orden, la envían a cocina. 

 La vista de los chefs se sincroniza en tiempo real, y aparecen las ordenes de tomadas por lo meseros en la columna de "Por preparar", las órdenes más antiguas primero para darles más prioridad. Al estar la orden preparada, le dan click a esta y confirman que está cocinada, cambiará su estado a lista, y se pasará a la columna "Para retirar".

 En la vista de mesero se actualizará en tiempo real las órdenes listas para ser retiradas, cambiando de color y pasando a arriba de la columna, para sea más notorio. Al retirar los platos de comida, y entregárlos a la mesa correspondiente, el mesero puede clickear sobre la orden y confirmar como entregada para que se elimine de la cola de espera. 

# Objetivos del Usuario 🙋🏼

### Historia de Usuario 1:
- El garzón podrá colocar nombre del cliente y número de mesa
- Podrá tomar la orden del comensal, editarla, ver el total de la orden y una vez lista, enviar a cocina.

### Historia de Usuario 2: 
- Cocina puede ver las órdenes pendientes por preparar. 
- Puede marcar las órdenes listas una vez cocinadas, para que los meseros vengan a retirarlas.

### Historia de Usuario 3: 
- El mesero puede ver las órdenes listas en cocina, para ser retiradas y entregadas a la mesa.
- Una vez entregado al cliente, puede marcar como lista. 


# Desarrollo del Producto 👩‍💻

Este proyecto fue desarrollado basado en historias de usuario, para la planificación utilizamos la herramienta de Projects de GitHub

Se realizó prototipo de alta fidelidad el cual podrá ser visualizado en el siguiente link: [Prototipo](https://barbara230946.invisionapp.com/overview/Burger-Queen-ck72ll1tj03wp01b9xcezh80a/screens?v=a%2FNSeGhdPDzSuDOv7hSrHA%3D%3D&linkshare=urlcopied).

# Futuras Iteraciones  🚧 
- Se colocará un timer a las órdenes para tomar en cuenta el tiempo desde que se toma la orden hasta que la comida llega el cliente, para métricas internas del restaurante.

# DEPLOY 🚀

Puedes entrar al deploy del producto en el siguiente [link](https://burger-queen-f6c33.firebaseapp.com/)

Importante: Está diseñado y programado para tablets, en sentido "landscape" (horizontal).