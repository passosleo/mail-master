FROM node:19.0.0

# Set timezone
ENV TZ="Brazil/East"

WORKDIR /app
COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 4000

# Start the API
CMD ["npm", "start"]
