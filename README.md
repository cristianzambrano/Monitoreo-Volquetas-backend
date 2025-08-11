# MonitoreoGPS Backend

## Requirements

- Node.js >= 16
- MySQL
- Clone this repository
- Create a `.env` file with your database and Telegram bot credentials:

```
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
BOT_TOKEN=your_telegram_token
```

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up the MySQL database and required tables.
3. Start the server:
   ```sh
   node app.js
   ```

## API Endpoints

### Volquetas (Trucks)

- **GET /api/volquetas**  
  List all trucks.

- **POST /api/volquetas**  
  Add a new truck.  
  **Body:**  
  ```json
  {
    "placa": "ABC123",
    "dispositivo_id": "dev001",
    "estado": "active"
  }
  ```

- **PUT /api/volquetas/:id**  
  Update a truck.

- **DELETE /api/volquetas/:id**  
  Delete a truck.

---

### Drivers

- **GET /api/choferes**  
  List all drivers.

- **POST /api/choferes**  
  Add a new driver.  
  **Body:**  
  ```json
  {
    "nombre": "John",
    "cedula": "1234567890",
    "telefono": "0999999999"
  }
  ```

- **PUT /api/choferes/:id**  
  Update a driver.

- **DELETE /api/choferes/:id**  
  Delete a driver.

---

### Mines

- **GET /api/minas**  
  List all mines with location and polygon.

---

### Active Routes

- **GET /api/rutas-activas**  
  List all active routes.

- **POST /api/rutas-activas**  
  Add an active route.  
  **Body:**  
  ```json
  {
    "id_volqueta": 1,
    "id_chofer": 2,
    "nombre": "Route 1",
    "fecha_inicio": "2024-06-01 08:00:00",
    "fecha_fin": "2024-06-01 18:00:00",
    "origen_lat": -2.123,
    "origen_lon": -79.123,
    "destino_lat": -2.456,
    "destino_lon": -79.456,
    "trayecto": "-79.123 -2.123, -79.456 -2.456",
    "duracion": 120,
    "distancia": 10.5
  }
  ```

- **PUT /api/rutas-activas/:id**  
  Update an active route.

- **DELETE /api/rutas-activas/:id**  
  Delete an active route.

---

### Telegram Bot Subscribers

- **GET /api/suscriptores**  
  List all subscribers.

- **POST /api/suscriptores**  
  Add or update a subscriber.  
  **Body:**  
  ```json
  {
    "chat_id": 123456,
    "nombre": "User",
    "username": "user",
    "tipo_chat": "private"
  }
  ```

- **PATCH /api/suscriptores/deactivate/:chat_id**  
  Deactivate a subscriber.

- **PATCH /api/suscriptores/activate/:chat_id**  
  Activate a subscriber.

- **POST /api/suscriptores/alertas**  
  Send a message to all active subscribers.  
  **Body:**  
  ```json
  {
    "mensaje": "Alert text"
  }
  ```

---

### Telegram Webhook

- **POST /api/webhook**  
  Endpoint to receive messages from the Telegram bot.

---

## How to Consume the Endpoints

You can use tools like [Postman](https://www.postman.com/) or `curl`:

```sh
curl -X GET http://localhost:3000/api/volquetas
```

For endpoints requiring a body, use `-d`:

```sh
curl -X POST http://localhost:3000/api/volquetas -H "Content-Type: application/json" -d '{"placa":"ABC123","dispositivo_id":"dev001","estado":"active"}'
```

---

## Notes

- The server runs on port `3000` by default.
- Make sure your database is configured and running.