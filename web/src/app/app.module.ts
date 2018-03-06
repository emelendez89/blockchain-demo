import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { MatToolbarModule } from '@angular/material';

import { BlockchainModule } from './blockchain/blockchain.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { BlockchainUiModule } from './blockchain-ui/blockchain-ui.module';

import { AppComponent } from './app.component';
import { BlockchainComponent } from './blockchain/blockchain/blockchain.component';

import { environment } from '../environments/environment';
import appRoutes from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    appRoutes,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BlockchainModule,
    PageNotFoundModule,
    BlockchainUiModule,
    MatToolbarModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
