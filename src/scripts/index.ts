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

// Sistema de menu hambúrguer

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-icon') as HTMLSpanElement | null;
    const navBar = document.querySelector('nav') as HTMLElement | null;

    if (!menuBtn || !navBar) return;

    menuBtn.setAttribute('role', 'button');
    menuBtn.setAttribute('tabindex', '0');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.textContent = 'close';

    const toggleMenu = () => {
        const isHidden = navBar.toggleAttribute('hidden');

        menuBtn.textContent = isHidden ? 'menu' : 'close';
        menuBtn.setAttribute('aria-expanded', String(!isHidden));
    };

    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });
});

// Sistema para deixar o Clamp dinâmico.

function ajustarClampCards(): void {
    const cards = document.querySelectorAll<HTMLElement>('div.card');

    cards.forEach((card) => {
        const cardBody = card.querySelector<HTMLElement>('div.card-body');
        const paragrafo = cardBody?.querySelector<HTMLElement>(':scope > p');
        const titulo = cardBody?.querySelector<HTMLElement>('h1, h2, h3, h4');

        if (!cardBody || !paragrafo) return;

        paragrafo.style.maxHeight = '';

        let alturaOutrosElementos = 0;
        Array.from(cardBody.children).forEach((filho) => {
            if (filho !== paragrafo && filho instanceof HTMLElement) {
                filho.style.position = 'relative';
                filho.style.zIndex = '2';
                const estilo = getComputedStyle(filho);
                const margemVertical =
                    (parseFloat(estilo.marginTop) || 0) + (parseFloat(estilo.marginBottom) || 0);
                alturaOutrosElementos += filho.offsetHeight + margemVertical;
            }
        });

        const estiloBody = getComputedStyle(cardBody);
        const gapBody = parseFloat(estiloBody.rowGap) || parseFloat(estiloBody.gap) || 0;
        const qtdFilhos = cardBody.children.length;
        const espacoGaps = gapBody * Math.max(0, qtdFilhos - 1);

        const estiloP = getComputedStyle(paragrafo);
        const fontSizeP = parseFloat(estiloP.fontSize) || 14;
        const lineHeightP =
            estiloP.lineHeight === 'normal'
                ? fontSizeP * 1.2
                : parseFloat(estiloP.lineHeight) || fontSizeP * 1.2;

        const alturaDisponivel = cardBody.clientHeight - alturaOutrosElementos - espacoGaps - 8;

        if (alturaDisponivel > 0) {
            const linhasQueCabem = Math.max(1, Math.floor(alturaDisponivel / lineHeightP));
            paragrafo.style.maxHeight = `${linhasQueCabem * lineHeightP}px`;
        }

        if (titulo) {
            const estiloTitulo = getComputedStyle(titulo);
            const fontSize = parseFloat(estiloTitulo.fontSize) || 18;
            const lineHeight =
                estiloTitulo.lineHeight === 'normal'
                    ? fontSize * 1.2
                    : parseFloat(estiloTitulo.lineHeight) || fontSize * 1.2;

            const quebrou = titulo.offsetHeight > lineHeight * 1.3;
            const clamp = quebrou ? 3 : 6;

            paragrafo.style.webkitLineClamp = String(clamp);
            paragrafo.style.setProperty('line-clamp', String(clamp));
        }
    });
}

window.addEventListener('resize', ajustarClampCards);
window.addEventListener('load', ajustarClampCards);