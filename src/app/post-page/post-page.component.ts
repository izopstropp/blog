import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post/post.model'
import { ActivatedRoute } from '@angular/router'
import { PostsService } from '../posts/posts.service'

@Component({
  selector: 'bbl-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post:Post

  constructor(private postsService: PostsService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.postsService.postFind(this.router.snapshot.params['id']).subscribe(response => this.post = this.tratarDados(response)
    )
  }
  tratarDados(response){
    return JSON.parse(JSON.stringify(response.post));
  }
}
