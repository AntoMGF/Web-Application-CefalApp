import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SettingscomponentComponent } from './settingscomponent/settingscomponent.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user',
    component: UserComponentComponent,
    canActivate: [AuthenticationService],
    children: [{
      path: '',
      redirectTo: 'profile',
      pathMatch: 'full'
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'settings',
      component: SettingscomponentComponent
    }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }