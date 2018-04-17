import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PostsService } from '../../posts/posts.service'
import { Router,ActivatedRoute } from '@angular/router'
import { Post } from '../../posts/post/post.model'
import { NotificationService } from '../../share/message/notification.service'

@Component({
  selector: 'bbl-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post:Post
  pegarUsuario:any

  constructor(private formBuilder : FormBuilder,
              private postsService : PostsService,
              private router : Router,
              private ar :ActivatedRoute,
              private notificationService : NotificationService
              ) {
                //Verificando se existi algum id passado pela rotar, se existir significa que é uma edição
                if(this.ar.snapshot.params['id']){
                  //chamando o metodo responsavel por buscar o id do post
                  this.buscarDados(this.ar.snapshot.params['id'])
                }
              }

  postForm : FormGroup

  ngOnInit() {
      //criando instancia do formulario reativo
      this.postForm = this.formBuilder.group({
        titulo: this.formBuilder.control('',[Validators.required,Validators.minLength(7)]),
        descricao: this.formBuilder.control('',[Validators.required,Validators.minLength(7)]),
        situacao: this.formBuilder.control('',[Validators.required,Validators.minLength(7)])
      })
  }

  // metodo responsavel por setar os valores no formulario
  valoresPostForm(titulo?,descricao?,situacao?){
    this.postForm.reset(
      {'titulo':titulo?titulo:'','descricao':descricao?descricao:'','situacao':situacao?situacao:''}
      );

  }

  salvarPost(dados:Post){
    dados.user_id = '1';

    //se existi parametro significa que é edição
    if(this.ar.snapshot.params['id']){
      this.postsService.postUpdate(dados,this.ar.snapshot.params['id']).subscribe(post=>{
        this.notificationService.notify('Post Atualizado');
        this.valoresPostForm() // limpeza de formulario
      })
    }else{
      this.postsService.postSave(dados).subscribe(post=>{
        this.notificationService.notify('Post Publicado')
        this.valoresPostForm()
      })
    }

  }

  //tratamento do dado retornado pela api
  tratarDados(response){
    return JSON.parse(JSON.stringify(response.post));
  }

  //metodo para buscar Post
  buscarDados(id:String){
     this.postsService.postFind(id)
       .subscribe(response => {
          this.post = this.tratarDados(response)
          //apos retornar o post, chamar o metodo reponsavel por carregar os campos na tela
          this.carregarPost()
        })
  }

  //metodo responsavel por carregar
  carregarPost(){
    //preenchimento do campo
    this.valoresPostForm(this.post.titulo,this.post.descricao,this.post.situacao)
  }
}
