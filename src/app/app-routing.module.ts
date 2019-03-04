import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    /*
     * ROUTE AUTHENT
     */
    { path: '', redirectTo: 'personalize', pathMatch: 'full' },
    { path: 'personalize', canActivate: [AuthGuard], component: PersonalizeComponent },
    { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
    { path: 'contacter', canActivate: [AuthGuard], component: ContactComponent },
    { path: 'apropos', canActivate: [AuthGuard], component: AproposComponent },
    /*
     * ROUTE PUBLIC
     */
    { path: 'login', component: LoginComponent },
    { path: 'mirror', loadChildren: 'app/mirror/mirror.module#MirrorModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
