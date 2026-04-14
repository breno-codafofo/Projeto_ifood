const form = document.querySelector('#Caixa-de-login')

form.addEventListener('submit', async (event) => {
    event.preventDefault() // faz a página não recarregar

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)

    console.log('📤 Enviando dados:', dados)

    try {
        const resposta = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        console.log('📥 Status da resposta:', resposta.status)
        console.log('📥 Headers:', resposta.headers)

        const resultado = await resposta.json()
        console.log('📥 Dados recebidos:', resultado)

        if (resposta.ok) {
            alert(`Sucesso! Usuário cadastrado!`)
            form.reset()
        }
        else alert(`Erro: ${resultado.message || 'Erro ao cadastrar'}`)

    }   
    catch (erro) {
        console.error('❌ Falha na requisição:', erro)
        console.error('Stack:', erro.stack)
        alert('Houve um erro ao conectar com o servidor :(\n' + erro.message)
    }
})