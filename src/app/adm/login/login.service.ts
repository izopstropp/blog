import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import { apiHost } from '../../../app.api'
import {Usuario} from './login.model'
import 'rxjs/add/operator/do'
import { NotificationService} from '../../share/message/notification.service'


@Injectable()

export class LoginService{

  usuario:Usuario;


  constructor(private http: HttpClient,private notificationService:NotificationService ){
  }

  usuarioLogado(){
    return this.usuario !== undefined
  }
  // metodo responsavel para fazer a requisição e retornar o token caso o email e senha seja valido
  login(email:string,password:string) : Observable<any>{
    return this.http.post<Usuario>(`${apiHost}/auth/login`,{email:email,password:password})
                                  .do(usuario=>this.usuario = usuario)

  }
}
