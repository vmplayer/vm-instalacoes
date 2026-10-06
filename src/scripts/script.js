import contatos from './contatos.json' with { type: 'json' }

const whatsappBtn = document.getElementById('whatsapp-btn')
let msg = "Olá!"

whatsappBtn.addEventListener('click', () => {
    window.open(`https://wa.me/${contatos.numero}?text=${msg}`, '_blank')
})

// Sistema para dizer a página do site

const index = window.url

function guia() {

}
