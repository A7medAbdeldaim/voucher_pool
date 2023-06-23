# Use node 16 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install the dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files to the working directory
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN yarn build

# Expose the port on which the application will listen
EXPOSE 4000

# Start the application
CMD ["yarn", "start:prod"]