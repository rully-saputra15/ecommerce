export class Transaksi{
    IDUser : number;
    IDBarang : number;
    JenisPembayaran : string;
    TotalHarga : number;
    JumlahBeli : number;

    constructor(IDUser : number, IDBarang : number, JenisPembayaran : string,TotalHarga : number, JumlahBeli : number){
       this.IDUser = IDUser;
       this.IDBarang = IDBarang;
       this.JenisPembayaran = JenisPembayaran;
       this.TotalHarga = TotalHarga;
       this.JumlahBeli = JumlahBeli; 
    }
};