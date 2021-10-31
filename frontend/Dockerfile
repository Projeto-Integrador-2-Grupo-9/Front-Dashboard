# Imagem de Origem
FROM node:14
# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /frontend/
COPY package.json /frontend/package.json
RUN yarn 
EXPOSE 3000
CMD ["yarn", "start"]