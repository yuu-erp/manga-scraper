# Sử dụng Node image nhẹ
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file dependency trước để tận dụng cache
COPY package*.json ./

# Cài đặt dependencies (nếu dùng yarn)
RUN yarn install --frozen-lockfile

# Copy toàn bộ mã nguồn vào container
COPY . .

# Biên dịch TypeScript
RUN yarn build

# Thiết lập biến môi trường
ENV NODE_ENV=production

# Chạy ứng dụng
CMD ["node", "dist/index.js"]
