import { FormEventHandler, useState } from 'react'
import './App.css'
import { EchoRequest, EchoServiceClientImpl, GrpcWebImpl } from './ts-proto-gen/echo'

const rpc = new GrpcWebImpl("http://localhost:8080", {})
const echoClient = new EchoServiceClientImpl(rpc)

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

        const req = EchoRequest.fromPartial({message: inputMessage})
        const resp = await echoClient.Echo(req)
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
