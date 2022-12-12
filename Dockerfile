# Specifies a parent image
FROM golang:1.18-bullseye

# install npm and nodejs
RUN apt-get update -y && apt-get install npm -y  && apt-get install sqlite3
RUN npm cache clean -f
RUN npm install node latest



# Creates an app directory to hold your app’s source code
WORKDIR /app
 
# Copies everything from your root directory into /app
COPY . .
 
# Installs Go dependencies
RUN go mod download

# Get in server/frontend
WORKDIR /app/server/frontend

#install node_modules
RUN npm install
RUN npm install react-responsive --save
# Builds your app with optional configuration
WORKDIR /app

RUN go build -o /forum

#
RUN chmod +x /app/run.sh
 
# Tells Docker which network port your container listens on
EXPOSE 8080

# Expose port for frontent
EXPOSE 3000
 
# Specifies the executable command that runs when the container starts
CMD /app/run.sh