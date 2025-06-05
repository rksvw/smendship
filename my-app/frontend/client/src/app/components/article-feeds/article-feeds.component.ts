import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faHeart , faComment, faShare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-feeds',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './article-feeds.component.html',
  styleUrl: './article-feeds.component.scss'
})
export class ArticleFeedsComponent {
  protected faDots = faEllipsisVertical;
  protected faHt = faHeart
  protected faMsg = faComment
  protected faShr = faShare
}
