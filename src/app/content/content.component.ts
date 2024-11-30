import { Component } from '@angular/core';
import {ContextHolderService} from '../context-holder.service';

@Component({
  selector: 'app-content',
  standalone: false,

  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  selectedMember : Set<string> = new Set<string>();

  constructor(private contextHolderService: ContextHolderService) {
    this.contextHolderService.getContextHolder.subscribe(context => {
      this.selectedMember = context.selectedMember;
    });
  }

}
