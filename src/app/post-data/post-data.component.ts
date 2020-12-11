import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  constructor(private data: PostService, private route: ActivatedRoute) { }
 post: BlogPost;
 commentName: string;
 commentText: string;
private querySub: any;

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data.getPostbyId(params['id']).subscribe(data => { this.post = data,
        this.post.views++,
        this.data.updatePostById(this.post._id, this.post).subscribe();
       });
    });
  }
  ngOnDestroy() {
    if (this.querySub) {this.querySub.unsubscribe(); }

  }
  submitComment(): void {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });
    this.data.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = ""
      this.commentText = "";
    })
  }
}
