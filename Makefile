# Makefile
include .env
# Build and start containers
startall: 
	@docker-compose --env-file ./.env up --build

# Stop and remove containers, networks, volumes, and images
reset:
	@docker-compose down -v --rmi all
	@docker-compose rm -f
	@echo "Reset complete."
