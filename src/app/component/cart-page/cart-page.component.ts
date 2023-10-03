import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { produk } from '../product-view/productmodal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
  showproduct: any = [];
  public totalamount: number = 0;
  public taxamount: number = 0;
  public finalamount: number = 0;
  public addressform = false;
  public sentamount: number = 0;
  myform: FormGroup | any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.produk().subscribe(res => {
      this.showproduct = res;
      this.totalamount = this.api.hitungHarga();
      console.log("total amt is", this.totalamount)
      // calculation with tax 15 percent
      this.taxamount =  10000;
      console.log(this.taxamount, "is tax amount")

      this.finalamount = this.taxamount + this.totalamount;
      //Sending final amount to order component
      this.sentamount = this.finalamount
      this.api.jumlahHargaAkhir(this.sentamount);
    })

    //form
    this.myform = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      // bayar: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required), // Sesuaikan dengan nama properti yang digunakan dalam model Anda

    })
  }

  hapusDiKeranjang(item: produk) {
    this.api.hapusProdukDiKeranjang(item)
  }

  kosong() {
    this.api.hapusSemuaProdukDiKeranjang();
  }

  batal() {
    this.addressform = false;
    this.myform.reset();
    localStorage.removeItem('ecomdata')
  }

  onsubmit() {
    this.myform.value;
    console.log(this.myform.value)
    localStorage.setItem('ecomdata', JSON.stringify(this.myform.value.name));
  }

  pembayaranOnline(){
    localStorage.setItem('ecomdata', JSON.stringify(this.myform.value.name));
  }
}

