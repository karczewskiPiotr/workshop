
FROM postgres:16
COPY init.sql /docker-entrypoint-initdb.d/10-init.sql
EXPOSE 5432
ENV POSTGRES_PASSWORD=development
