export class Barang{
    IDBarang : number;
    foto : string;
    NamaBarang : string;
    StokBarang : number;
    Harga : number;
    Deskripsi : string;
    Kategori : string;
    Satuan : string;
    Merk : string;
    // tslint:disable-next-line: max-line-length
    constructor(IDBarang : number, foto : string, NamaBarang : string, StokBarang : number, Harga :number,Deskrpsi : string, Kategori : string,satuan : string,merk : string){
        this.IDBarang = IDBarang;
        this.foto = foto;
        this.NamaBarang = NamaBarang;
        this.StokBarang = StokBarang;
        this.Harga = Harga;
        this.Deskripsi = Deskrpsi;
        this.Kategori = Kategori;
        this.Satuan = satuan;
        this.Merk = merk;
    }
    getNamaBarang(){
        return this.NamaBarang;
    }
    getHarga(){
        return this.Harga;
    }
    getFoto(){
        return this.foto;
    }
}