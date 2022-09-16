import { CaisseModel } from './caisse.model';
export class SousCaisseModel {
    public id: number | null;
    public name: string | null;
    public soldeInit: number | null;
    public total: number | null;
    public soldeFin: number | null;
    public diff: number | null;
    public caisse: CaisseModel | null;
    public createdAt: Date;
    public lastUpdatedAt: Date;

    constructor(){
        this.id = null;
        this.name = null;
        this.soldeInit = null;
        this.total = null;
        this.soldeFin = null;
        this.diff = null;
        this.caisse = null;
        this.createdAt = new Date();
        this.lastUpdatedAt = new Date();
    }
}