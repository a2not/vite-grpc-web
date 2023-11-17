.PHONY: protogen
protogen: ./proto/
	docker build --tag protogen:latest .
	docker run -v $(CURDIR)/proto:/proto:ro -v $(CURDIR)/src/grpc-web-client-gen:/gen protogen:latest
