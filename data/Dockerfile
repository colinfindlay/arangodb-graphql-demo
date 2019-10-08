FROM arangodb/arangodb:3.5.0

ENV ARANGO_NO_AUTH=1

COPY dumps/avobank /docker-entrypoint-initdb.d/dumps/avobank
COPY dumps/avobank-graph /docker-entrypoint-initdb.d/dumps/avobank-graph
