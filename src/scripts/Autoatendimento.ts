import * as contatos from './data/contatos.json' with { type: 'json' };

export class Autoatendimento {
    private msg: string;
    private btnID = ['whatsapp-btn', 'cot-h-btnWPP', 'whatsapp-btn-sl', 'whatsapp-btn-cot'];

    constructor(msg: string) {
        this.msg = msg;
        this.init();
    }

    private init() {
        this.btnID.forEach(id => {
            const btn = document.getElementById(id) as HTMLElement | null;
            if (btn) {
                btn.addEventListener('click', () => {
                    window.open(`https://wa.me/${contatos.numero}?text=${encodeURIComponent(this.msg)}`, '_blank');
                });
            }
        });
    }

    altMsg(newMsg: string): void {
        this.msg = newMsg;
    }
}