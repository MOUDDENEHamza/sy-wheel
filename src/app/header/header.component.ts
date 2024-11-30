import {Component} from '@angular/core';
import {ContextHolderService} from '../context-holder.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  expanded: boolean = false;

  constructor(private contextHolderService: ContextHolderService) {
    this.contextHolderService.getExpanded.subscribe(expanded => this.expanded = expanded);
  }

}
