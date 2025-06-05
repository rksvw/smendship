import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ReedComponent } from '../reed/reed.component';
import { ToolsComponent } from '../tools/tools.component';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NavigationComponent,
    ReedComponent,
    ToolsComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {

}
