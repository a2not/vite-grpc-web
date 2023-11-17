FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install curl unzip -y

# Install protoc
# https://grpc.io/docs/protoc-installation/
RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip
RUN unzip protoc-3.15.8-linux-x86_64.zip

RUN mv ./bin/protoc /usr/local/bin/.
RUN chmod +x /usr/local/bin/protoc

# Install protoc-gen-grpc-web
RUN curl -LO https://github.com/grpc/grpc-web/releases/download/1.4.2/protoc-gen-grpc-web-1.4.2-linux-x86_64

RUN mv protoc-gen-grpc-web-1.4.2-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
RUN chmod +x /usr/local/bin/protoc-gen-grpc-web

# Prepare input/output directories
RUN mkdir proto
RUN mkdir gen

# Run the generation command
# https://github.com/grpc/grpc-web#typescript-support
CMD protoc -I=./proto echo.proto \
    --js_out=import_style=commonjs,binary:./gen \
    --grpc-web_out=import_style=typescript,mode=grpcweb:./gen
