import * as contatos from './data/contatos.json' with { type: 'json' };
import { Modal } from './Modal';

export class Autoatendimento {
    private msg: string;
    private btnID = ['whatsapp-btn', 'cot-h-btnWPP', 'whatsapp-btn-sl', 'whatsapp-btn-cot'];
    public btnAutoID = ['pre-atend-btn', 'pre-atend-btn-sl', 'pre-atend-btn-cot']

    constructor(msg: string) {
        this.msg = msg;
        this.init();
    }

    private init() {
        this.btnID.forEach(id => {
            const btn = document.getElementById(id) as HTMLElement | null;
            if (btn) {
                btn.addEventListener('click', () => {
                    this.sendMessage();
                });
            }
        });

        this.btnAutoID.forEach(id => {
            const btn = document.getElementById(id) as HTMLElement | null;
            if (btn) {
                btn.addEventListener('click', () => {
                    const containerModal = document.createElement('div');
                    const mi = new Modal(containerModal);

                    mi.mkModal();
                    document.body.appendChild(containerModal);
                });
            }
        });
    }

    public altMsg(newMsg: string): void {
        this.msg = newMsg;
    }

    public sendMessage(): void {
        window.open(`https://wa.me/${contatos.numero}?text=${encodeURIComponent(this.msg)}`, '_blank');
    }
}
