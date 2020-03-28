export class Barang{
    IDBarang : number;
    foto : string;
    NamaBarang : string;
    StokBarang : number;
    Harga : number;
    Deskripsi : string;
    Kategori : string;

    constructor(IDBarang : number, foto : string, NamaBarang : string, StokBarang : number, Harga :number,Deskrpsi : string, Kategori : string){
        this.IDBarang = IDBarang;
        this.foto = foto;
        this.NamaBarang = NamaBarang;
        this.StokBarang = StokBarang;
        this.Harga = Harga;
        this.Deskripsi = Deskrpsi;
        this.Kategori = Kategori;
    }
}