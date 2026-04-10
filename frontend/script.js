const form = document.querySelector('#formRegister')

form.addEventListener('submit', async (event) => {
    event.preventDefault() // faz a página não recarregar

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)

    try {
        const resposta = await fetch('url-da-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        const resultado = await resposta.json()

        if (resposta.ok)alert(`Sucesso: ${resultado.message}`) 
        else alert(`Erro: ${resultado.error}`)

    }   
    catch (erro) {
        console.log(`Falha na requisição: ${erro}`)
        alert('Houve um erro ao conectar com o servidor :(')
    }
})