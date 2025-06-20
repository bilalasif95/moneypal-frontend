ARG VERSION=10.23.1
ARG PORT=3000

FROM node:${VERSION}-slim
RUN npm i -g serve
RUN apt-get update && apt-get install -y \
  curl 

WORKDIR /app
COPY  . /app



HEALTHCHECK --interval=5s --timeout=2s --retries=12 \
  CMD curl --silent --fail localhost:${PORT} || exit 1

EXPOSE ${PORT}
CMD ["serve","-s", "dist/", "-l", "3000"]
