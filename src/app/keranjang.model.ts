export class Keranjang{
    IDBarang : number;
    NamaBarang : string;
    Harga : number;
    JumlahBarang : number;
    
    constructor(IDBarang : number, NamaBarang : string , Harga : number , JumlahBarang : number){
        this.IDBarang = IDBarang;
        this.NamaBarang = NamaBarang;
        this.Harga = Harga;
        this.JumlahBarang = JumlahBarang;
    }
}