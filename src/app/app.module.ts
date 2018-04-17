import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './posts/home.component';
import { ROUTES } from './app.routes';
import { FooterComponent } from './footer/footer.component';
import { PostComponent } from './posts/post/post.component';
import { PostPageComponent } from './post-page/post-page.component';
import {LoginComponent} from './adm/login/login.component'
import {PostCreateComponent} from './adm/post-create/post-create.component'

import { SharedModule } from './share/share.module'
import {NotificationService} from './share/message/notification.service'

import {LoginService} from './adm/login/login.service'
import { PostsService } from './posts/posts.service';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  // componentes necessarios para aplicação em geral
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PostComponent,
    PostPageComponent,
    LoginComponent,
    PostCreateComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [PostsService,LoginService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
