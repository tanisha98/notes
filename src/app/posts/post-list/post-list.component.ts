import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],

})
export class PostListComponent implements OnInit, OnDestroy {
// posts=[
//   {title:'hi 1', content:"content1"},
//   {title:'hi 1', content:"content1"}
// ];

 storedPosts: Post[] = [];
 isLoading = false;
private postSub: Subscription;
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.storedPosts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
