# Getting Started with Keycloak

## Running Keycloak in docker

Keycloak is used for authentication and can be started using Docker Compose.
The provided docker-compose.yml file includes a Keycloak service and a PostgreSQL database for Keycloak.

To run Keycloak along with the backend:

* Run the Docker Compose file:
  ```docker-compose -f docker-compose.yml up```

This will start Keycloak on port 8084.
It is recommended to start Keycloak before the backend to ensure that the authentication service is available.
