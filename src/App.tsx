import { FormEventHandler, useState } from 'react'
import './App.css'
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { EchoService } from "./connect-web-gen/echo_connect";

const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:8080",
});

const echoClient = createPromiseClient(EchoService, transport);

function App() {
    return (
        <div className="App">
            <h1>grpc-web (cjs) in Vite</h1>
            <div className="card">
                <EchoServiceForm />
            </div>
        </div>
    )
}

export default App

function EchoServiceForm() {
    const [outputMessage, setOutputMessage] = useState("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const inputMessage = form.get("inputMessage")?.toString() || "";

        const resp = await echoClient.echo({
            message: inputMessage,
        });
        setOutputMessage(resp.message)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Echo input: <input type="text" name="inputMessage" defaultValue=""/>
                </label>
                <hr />
                <button type="submit">Submit form</button>
            </form>
            <p>Echo output: {outputMessage}</p>
        </>
    )
}
