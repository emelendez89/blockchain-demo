import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { BlockchainComponent } from './blockchain/blockchain.component'

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [ BlockchainComponent ],
  exports: [
    BlockchainComponent
  ]
})
export class BlockchainModule { }
