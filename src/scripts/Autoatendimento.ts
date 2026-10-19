import * as contatos from './contatos.json' with { type: 'json' };

let msg: string = encodeURIComponent("Olá! Vim do site e gostaria de saber mais informações!");

const whatsAppBtn = document.getElementById('whatsapp-btn') && document.getElementById('cot-h-btnWPP') && document.getElementById('whatsapp-btn-sl') as HTMLDivElement;

whatsAppBtn?.addEventListener('click', () => {
    window.open(`https://wa.me/${contatos.numero}?text=${msg}`, '_blank');
});
