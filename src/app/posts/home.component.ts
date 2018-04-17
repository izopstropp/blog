import { Component, OnInit } from '@angular/core'
import { Post } from './post/post.model'
import { PostsService } from './posts.service'
import { NotificationService } from '../share/message/notification.service'
import { trigger,state,style,transition,animate} from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {Observable} from 'rxjs/observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'


@Component({
  selector: 'bbl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('toggleSearch',[
      state('hidden',style({
        opacity:0,
        "max-height":"0px"
      })),
      state('visible',style({
        opacity:1,
        "max-height":"70px",
        "margin-top":"20px"
      })),
      transition('* => *',animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  posts : Post[]
  usuarioLogado : any

  searchBarState = 'hidden' // atributo para controle do evento
  searchForm:FormGroup
  searchControl:FormControl

  constructor(
    private postsService:PostsService,
    private notificationService:NotificationService,
    private formBuilder : FormBuilder
  ) {

  }

  ngOnInit() {

    //atribuindo ao atributo se existe
    this.usuarioLogado = this.postsService.usuarioLogado()

    // criando a referencia do campo em uma atributo que vai ser utilizado para realizar as pesquisas
    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl : this.searchControl
    })

    // no onchange do campo de pesquisa
    this.searchControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .do((message) => console.log(`teste=${message}`))
    .switchMap((search)=> //switchMap utilizado para evitar que seja realizado dois ou mais subscriber.. o switch realizar a requisição e logo em seguida o subscribe
      this.postsService
        .posts(search)
      )
    .subscribe((response)=> {
      this.posts = this.simplificarDescricao(response)
    })

       // iniciando o sistema chamando a função de listagem
    this.listarPosts();
  }
  // Metodo para simplicar o conteudo com as primeiras 100 palavras
   simplificarDescricao(response){
     response.posts =  response.posts.map((item)=> {
        item.descricao = item.descricao.substr(0,100) + "..."
        return item}
      )
     return response.posts;
   }

  //metodo para deletar post
  excluirPost(post:Post){
    if(window.confirm('Desja realmente excluir o post?')){
      this.postsService.postDelete(post.id).subscribe(response => {
        this.listarPosts(); //chemando metodo para listar os post
        this.notificationService.notify('Post excluido com sucesso')
      })
    }
  }
  //listagem de posts
  listarPosts(){
    this.postsService.posts().subscribe(response =>{
        this.posts= this.simplificarDescricao(response)
        console.log("list" +response)
      });
  }

  togglePesquisa(){
    this.searchBarState = (this.searchBarState == "visible") ? "hidden" : "visible";
  }
}
