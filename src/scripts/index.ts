import { Autoatendimento } from "./Autoatendimento";

// Sistema de Atendimento Inteligente

const msg = new Autoatendimento("Olá!");

document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;

    if (!form.querySelector('#auto-submit-btn')) return;

    e.preventDefault();

    const autoNome = form.querySelector<HTMLInputElement>('#auto-nome');
    const autoCidade = form.querySelector<HTMLInputElement>('#auto-cidade');
    const autoServico = form.querySelector<HTMLSelectElement>('#auto-servico');
    const autoDetalhes = form.querySelector<HTMLTextAreaElement>('#auto-detalhes');

    if (!autoNome || !autoCidade || !autoServico || !autoDetalhes) return;

    msg.altMsg(`*Nome:* ${autoNome.value}.\n\n*Cidade:* ${autoCidade.value}.\n\n*Solução:* ${autoServico.value}.\n\n${autoDetalhes.value}`);
    msg.sendMessage();
});



// Sistema de copiar o número de celular para a área de transferência do usuário

async function copiarTexto(): Promise<void> {
    const copyBtn = document.getElementById('copy-btn') as HTMLSpanElement | null;

    if (!copyBtn) return;

    try {
        await navigator.clipboard.writeText("+5551997445796");

        copyBtn.textContent = "check";

        setTimeout(() => {
            if (copyBtn) {
                copyBtn.textContent = "content_copy";
            }
        }, 2000);

    } catch (err) {
        copyBtn.textContent = "error";
        
        console.error("Erro ao acessar a área de transferência:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('copy-btn');
    if (btn) {
        btn.addEventListener('click', copiarTexto);
    }
});
