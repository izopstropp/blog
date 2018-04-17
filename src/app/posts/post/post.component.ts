import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { Post } from './post.model'
import { trigger,state,style,transition,animate } from '@angular/animations'
import { PostsService } from '../posts.service'

@Component({
  selector: 'bbl-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations:[
    trigger('gerenciamentoPost',[
      state('hidden',style({
        opacity:0,

      })),
      state('visible',style({
        opacity:1,
        "margin-top":"40px"

      })),
      transition('hidden => visible',animate('500ms 0s')),
      transition('visible => hidden',animate('500ms 0s'))
    ])
  ]
})
export class PostComponent implements OnInit {

  @Input() post:Post; // parametro para receber do component parent
  @Input() usuarioLogado:Post; // parametro para receber do component parent
  @Output() excluirPost = new EventEmitter() //criando evento de excluir para o parent

  gerenciamentoPostState = 'hidden'; // atributo responsavel pelo controle da animação do gerenciamento do post

  constructor(private postsService:PostsService) { }

  ngOnInit() {
  }

  // metodo para utilizado no template para ativar ou desativar a animação
  gerenciamentoPost(){
    this.gerenciamentoPostState = (this.gerenciamentoPostState == "visible") ? "hidden" : "visible";
  }

  emitExcluiPostEvent(){
    this.excluirPost.emit(this.post)
  }

}
