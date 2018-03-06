import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockchainUiComponent } from './blockchain-ui/blockchain-ui.component';
import { BlockUiComponent } from './block-ui/block-ui.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlockchainUiComponent, BlockUiComponent]
})
export class BlockchainUiModule { }
