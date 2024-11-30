import { Component } from '@angular/core';
import {ContextHolderService} from '../../context-holder.service';

@Component({
  selector: 'app-button-component',
  standalone: false,
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css']
})
export class ButtonComponentComponent {

  buttons = [
    { name: 'All', id: 'all-button' },
    { name: 'Purple team', id: 'purple-button' },
    { name: 'Workflow team', id: 'workflow-button' }
  ];

  clickedButton: string = "";

  expanded: boolean = true;

  constructor(private contextHolderService: ContextHolderService) {
    this.contextHolderService.getContextHolder.subscribe(context => {
      this.clickedButton = context.clickedButton;
    });
  }

  click(buttonName: string): void {
    this.clickedButton = this.clickedButton === buttonName ? "" : buttonName;
    this.contextHolderService.setClickedButton('button-component', this.clickedButton);
  }

  toggleArrow() {
    this.expanded = !this.expanded;
    this.contextHolderService.setExpanded(this.expanded);
  }

}
