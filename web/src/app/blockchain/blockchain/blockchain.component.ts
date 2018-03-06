import { Component, OnInit } from '@angular/core';
import Blockchain from '../../../lib/blockchain';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {

  constructor() {
    const a =  new Blockchain();
    console.log(a);
  }

  ngOnInit() {
  }
}
