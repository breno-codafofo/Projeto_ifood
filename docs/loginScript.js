const form = document.querySelector('#Caixa-de-login')

form.addEventListener('submit', async (event) => {
    event.preventDefault() // faz a página não recarregar

    const formData = new FormData(form)
    const dados = Object.fromEntries(formData)

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        const resultado = await resposta.json()

        if (resposta.ok) {
            alert(`Bem-vindo, ${resultado.user.name}!`)
            // Salvar token no localStorage
            localStorage.setItem('token', resultado.token)
            localStorage.setItem('user', JSON.stringify(resultado.user))
            // Redirecionar para página inicial
            window.location.href = 'index.html'
            form.reset()
        }
        else alert(`Erro: ${resultado.message || 'Erro ao fazer login'}`)

    }   
    catch (erro) {
        alert('Houve um erro ao conectar com o servidor :(\n' + erro.message)
    }
})
