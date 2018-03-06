import { RouterModule, Routes } from '@angular/router';

import { BlockchainComponent } from './blockchain/blockchain/blockchain.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'blockchain', component: BlockchainComponent},
  { path: '', redirectTo: '/blockchain', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export default RouterModule.forRoot(
  appRoutes,
  { enableTracing: false } // <-- debugging purposes only
)
