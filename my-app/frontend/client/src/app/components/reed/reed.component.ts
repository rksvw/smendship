import { Component } from '@angular/core';
import { CreateArticleComponent } from "../create-article/create-article.component";
import { ArticleFeedsComponent } from "../article-feeds/article-feeds.component";

@Component({
  selector: 'app-reed',
  standalone: true,
  imports: [CreateArticleComponent, ArticleFeedsComponent],
  templateUrl: './reed.component.html',
  styleUrl: './reed.component.scss'
})
export class ReedComponent {

}
