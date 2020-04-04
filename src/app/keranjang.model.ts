export class Keranjang{
    IDTransaksi : number;
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
    getHarga(){
        return this.Harga;
    }
    getJumlahBarang(){
        return this.JumlahBarang;
    }
    addJumlahBarang(){
        this.JumlahBarang = this.JumlahBarang + 1;
    }
    minusJumlahBarang(){
        this.JumlahBarang = this.JumlahBarang - 1;
    }
    setIDTransaksi(id : number){
        this.IDTransaksi = id;
    }
}