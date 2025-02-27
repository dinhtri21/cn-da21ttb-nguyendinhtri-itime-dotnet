# 🏗️ Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy toàn bộ source code vào container
COPY . ./

# Restore dependencies
RUN dotnet restore WatchStore.API/WatchStore.API.csproj

# Build ứng dụng
RUN dotnet publish WatchStore.API/WatchStore.API.csproj -c Release -o /out

# 🚀 Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy file đã build từ build stage
COPY --from=build /out ./

# 🔐 Tạo thư mục lưu Data Protection Keys và gán quyền
RUN mkdir -p /root/.aspnet/DataProtection-Keys
VOLUME ["/root/.aspnet/DataProtection-Keys"]

# ⚡ Đặt biến môi trường để ứng dụng lắng nghe đúng cổng 5288
ENV ASPNETCORE_URLS=http://+:5288

# Expose đúng cổng
EXPOSE 5288

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "WatchStore.API.dll"]
