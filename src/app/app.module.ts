import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AppRoutingModule} from './/app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { UserComponentComponent } from './user-component/user-component.component';
import { SettingscomponentComponent } from './settingscomponent/settingscomponent.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalerrorComponent } from './modalerror/modalerror.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponentComponent,
    SettingscomponentComponent,
    ProfileComponent,
    ModalerrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgHttpLoaderModule
  ],
  entryComponents: [
    ModalerrorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
