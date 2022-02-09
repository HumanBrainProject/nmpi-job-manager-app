# Developing and deploying the app with Docker

## Development

To build and run the app locally:

$ docker-compose -f deployment/docker-compose.dev.yml up -d --build

and to stop it:

$ docker-compose -f deployment/docker-compose.dev.yml stop


## Production

To build the image for deployment in production:

$ docker-compose -f deployment/docker-compose.prod.yml build

To push the image to the EBRAINS registry:

$ docker push docker-registry.ebrains.eu/neuromorphic/nmpi_job_manager

On the VM, to run the app, create this docker-compose.yml file:

```
version: '3.3'

services:

  nmpi-job-manager-app:
    image: docker-registry.ebrains.eu/neuromorphic/nmpi_job_manager:prod
    container_name: nmpi-job-manager-app
    volumes:
      - "/etc/letsencrypt:/etc/letsencrypt"
    ports:
      - '443:443'
```

then run:

$ sudo docker-compose up -d

(this supposes the SSL certificates from LetsEncrypt are already installed on the VM).
