import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { produk } from './productmodal';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit{
  data:any|produk[]
  public cartitems:number=0;

  constructor(private api:ApiService){}

ngOnInit(): void {
  this.api.produk().subscribe(res=>{
    this.cartitems = res.length;
    this.tampilProduk();
    localStorage.removeItem("ecomdata");
  });



}

tampilProduk(){
  this.api.getProduk().subscribe(res=>{
  this.data = res;
  console.log(res)
  })
}

tambahKeranjang(item:produk){
 this.api.tambahKeranjang(item);
}

hapusKeranjang(item:produk){
 this.api.hapusProdukDiKeranjang(item);
}


}
