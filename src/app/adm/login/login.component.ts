import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { LoginService } from './login.service'
import { Usuario } from './login.model'
import { Router }  from '@angular/router'
import { SharedModule } from '../../share/share.module'
import { NotificationService} from '../../share/message/notification.service'

//import {CommonModule} from '@angular/common' //possui as diretivas basicas...não foi importado na raiz pq ja possui dentro do modulo browse module


@Component({
  selector: 'bbl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributo utilizado como diretiva no formulario
  loginForm : FormGroup

  constructor(private formBuilder: FormBuilder,
              private loginService:LoginService,
              private router:Router,
              private notificationService:NotificationService
            ) { }

  //criando uma instancia do formulario reativo para ser utilizado dentro do html
  ngOnInit() {
    //
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('',[Validators.required,Validators.minLength(5)]),
      senha: this.formBuilder.control('',[Validators.required,Validators.minLength(5)])
    })

  }

  /**
   * Enviando para a função do serviço de login, os parametros email e senha para ser validado
   * @param dados
   */
  logar(){
    this.loginService.login(this.loginForm.value.email,this.loginForm.value.senha)
                            .subscribe(() => {
                              this.router.navigate([''])
                              this.notificationService.notify('Usuario autenticado')
                            },
                            (response)=>this.notificationService.notify(response.error.message)
                            )



  }
}
