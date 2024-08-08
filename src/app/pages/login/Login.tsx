import { useState } from "react"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleClick = () => {
        console.log(email)
        console.log(senha)
    }


    return (
        <div>
            <form >
                <label >
                    <span>E-mail</span>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label >
                    <span>Senha</span>
                    <input type="senha" onChange={(e) => setSenha(e.target.value)}/>
                </label>
                <button type="button" onClick={handleClick}>Entrar</button>
            </form>
        </div>
    )
}