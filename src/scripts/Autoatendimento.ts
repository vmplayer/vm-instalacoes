import * as contatos from './contatos.json' with { type: 'json' };

export class Autoatendimento {
    private msg: string;
    private btnID = ['whatsapp-btn', 'cot-h-btnWPP', 'whatsapp-btn-sl'];
    private allCtt = document.getElementsByClassName('contact-btn');

    constructor (msg: string) {
        this.msg = msg;
        this.init();
    }

    private init() {
        this.btnID.forEach(id => {
            const btn = document.getElementById(id) as HTMLDivElement | null;

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