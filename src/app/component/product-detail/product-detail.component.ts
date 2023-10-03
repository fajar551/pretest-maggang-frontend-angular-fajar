import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { produk } from '../product-view/productmodal';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  productdata: any | produk[];
  showadd: boolean = true;
  showremove: boolean = false;

  constructor(private api: ApiService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    let productid = this.activatedroute.snapshot.paramMap.get('productid');
    console.log("product id is",productid)
    productid && this.api.getProdukById(productid).subscribe((res) => {
      this.productdata = res;
      console.log(res)
    })
  }

  tambahKeranjang(productdata: produk) {
    this.showadd = false;
    this.showremove = true;
    this.api.tambahKeranjang(productdata)
  }

  hapusKeranjang(productdata: produk) {
    this.showadd = true;
    this.showremove = false;
    // this.api.hapusProdukDiKeranjang(productdata)
  }
}
