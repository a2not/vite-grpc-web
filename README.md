This repo is for demonstration purpose only, regarding the ongoing discussions like [grpc-web #1242](https://github.com/grpc/grpc-web/issues/1242) and [vite #8926](https://github.com/vitejs/vite/discussions/8926)

# vite-grpc-web

grpc-web can be used with vite. here's how.

```
npm install
npm run dev
```

yarn link (`"grpc-web-client-gen": "link:./src/grpc-web-client-gen/"` in package.json) works fine as well.

Copied file dependencies with yarn (`"grpc-web-client-gen": "file:./src/grpc-web-client-gen/"` in package.json) works too, but need to run `yarn install` every time generated files changed so I don't recommend.

The only thing to note is that if you use linked dependencies like this repo does (or yarn link mentioned above), you need [resolve.preserveSymlinks](https://vitejs.dev/config/shared-options.html#resolve-preservesymlinks) to be `true`.

