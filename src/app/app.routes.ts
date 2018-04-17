import { Routes } from '@angular/router'
import { HomeComponent } from './posts/home.component'
import { PostPageComponent } from './post-page/post-page.component'
import { LoginComponent } from './adm/login/login.component'
import { PostCreateComponent } from './adm/post-create/post-create.component'


/**
 * Rotas do Sistema
 */
export const ROUTES:Routes=[
  {path:'',component:HomeComponent},
  {path:'admin',component:LoginComponent},
  {path:'admin/post/create',component:PostCreateComponent},
  {path:'admin/post/edit/:id',component:PostCreateComponent},
  {path:'post/:id',component:PostPageComponent}
]
