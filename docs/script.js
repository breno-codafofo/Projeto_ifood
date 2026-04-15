const form = document.querySelector('#Caixa-de-login')

form.addEventListener('submit', async (event) => {
    event.preventDefault() // faz a página não recarregar

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)


    try {
        const resposta = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        const resultado = await resposta.json()

        if (resposta.ok) {
            alert(`Sucesso! Usuário cadastrado!`)
            form.reset()
        }
        else alert(`Erro: ${resultado.message || 'Erro ao cadastrar'}`)

    }   
    catch (erro) {
        alert('Houve um erro ao conectar com o servidor :(\n' + erro.message)
    }
})