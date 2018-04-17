import { Post } from './post/post.model'
import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/map'
import { apiHost } from '../../app.api'
import { LoginService } from '../adm/login/login.service'
import 'rxjs/add/operator/do'



@Injectable()

export class PostsService {


  constructor(private http:HttpClient,private loginService:LoginService) { }

  //Metodo responsavel por verificar se o usuario esta logado
  usuarioLogado(){
    return this.loginService.usuarioLogado()
  }

  //Listagem de posts,
  posts(pesquisa?:string) : Observable<Post[]> {
    let params : HttpParams = undefined
    if(pesquisa){
      console.log(pesquisa);
      params = new HttpParams().set('q', pesquisa)
    }
    return this.http.get<Post[]>(`${apiHost}/post`,{params:params})
  }

  //pesquisa de post
  postFind(id: String): Observable<Post>{
    return this.http.get<Post>(`${apiHost}/post/${id}`)
  }

  // inserindo um post
  postSave(post:Post){
    let headers = new HttpHeaders();
    if(this.usuarioLogado()){
      headers = headers.set('Authorization',`Bearer ${this.loginService.usuario.token}`)
    }
     return this.http.post<Post>(`${apiHost}/post`, post, {headers:headers})
  }
  // atualizando um post
  postUpdate(post:Post,id:string){
    let headers = new HttpHeaders();
    if(this.usuarioLogado()){
      headers = headers.set('Authorization',`Bearer ${this.loginService.usuario.token}`)
    }
    return this.http.put(`${apiHost}/post/${id}`,post,{headers:headers})
  }

  postDelete(id:string){
    let headers = new HttpHeaders();
    if(this.usuarioLogado()){
      headers = headers.set('Authorization',`Bearer ${this.loginService.usuario.token}`)
      console.log('entrei aqui')
    }
   return  this.http.delete(`${apiHost}/post/${id}`,{headers:headers})
  }
}
