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


# ⚠️ Disclaimer ⚠️

Even though this works perfectly fine, I personally don't recommend this as a general solution to use grpc-web with vite, since this is just a workaround.
The approach this repo took was only beneficial to those who are already using the official grpc-web with other bundlers like webpack, and wanting to migrate to vite without heavy-lifting of the migration of grpc-web client code generation library.

There is a bit of a problem that the official code generator plugin (`protoc-gen-grpc-web`) generates files which depends on the runtime library (`google-protobuf`) where it is not being modernized yet, causing `vite build` to emit warnings as below.

```
$ npm run build
> vite-project@0.0.0 build
> tsc && vite build

vite v5.0.0 building for production...
node_modules/google-protobuf/google-protobuf.js (27:206) Use of eval in "node_modules/google-protobuf/google-protobuf.js" is strongly discouraged as it poses security risks and may cause issues with minification.
node_modules/google-protobuf/google-protobuf.js (29:315) Use of eval in "node_modules/google-protobuf/google-protobuf.js" is strongly discouraged as it poses security risks and may cause issues with minification.
node_modules/google-protobuf/google-protobuf.js (48:475) Use of eval in "node_modules/google-protobuf/google-protobuf.js" is strongly discouraged as it poses security risks and may cause issues with minification.
✓ 40 modules transformed.
dist/index.html                   0.46 kB │ gzip:   0.30 kB
dist/assets/index-4sK4E3Wk.css    1.39 kB │ gzip:   0.72 kB
dist/assets/index-hJ30Z7Ne.js   421.36 kB │ gzip: 104.60 kB
✓ built in 2.99s
```

The part that hasn't been modernized yet (like the "Use of eval" problem) is in the [Closure Library](https://github.com/google/closure-library) (which `google-protobuf` is made out of), but the Closure Library is in maintenance mode and the problem will no longer be fixed.

If you want to start a project using grpc-web and vite, there are other third party libraries out there (rather than the official one) that generate ESM-styled js/ts client files then you can import directory from the generated files. That way you don't need to make it a local package like this repo does.

Not endorsing any such libraries in particular, but here are [`connect-web`](https://github.com/a2not/vite-grpc-web/tree/connect-web) and [`protobuf-ts`](https://github.com/a2not/vite-grpc-web/tree/protobuf-ts) version of this demo. You can verify that there is no warning on `vite build`.
