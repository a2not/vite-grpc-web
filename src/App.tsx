import { FormEventHandler, useState } from 'react'
import './App.css'
import { EchoServiceClient } from 'grpc-web-client-gen/EchoServiceClientPb';
import { EchoRequest } from 'grpc-web-client-gen/echo_pb';

const echoClient = new EchoServiceClient('http://localhost:8080')

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

        const req = new EchoRequest()
        req.setMessage(inputMessage);
        const resp = await echoClient.echo(req, null)
        setOutputMessage(resp.getMessage())
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
