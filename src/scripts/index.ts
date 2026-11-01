import { Autoatendimento } from "./Autoatendimento";

let msg: Autoatendimento = new Autoatendimento ("Olá!");

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
