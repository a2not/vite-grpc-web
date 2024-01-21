import { FormEventHandler, useState } from 'react'
import './App.css'
import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import { EchoServiceClient } from './protobuf-ts-gen/echo.client'
import { EchoRequest } from './protobuf-ts-gen/echo'

const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8080"
})
const echoClient = new EchoServiceClient(transport)

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

        const req = EchoRequest.create({message: inputMessage});
        const { response } = await echoClient.echo(req)
        setOutputMessage(response.message)
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
