FROM oven/bun:latest

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./

# Set environment variables
ENV NODE_ENV=production

# Start the bot
CMD ["bun", "start"]
