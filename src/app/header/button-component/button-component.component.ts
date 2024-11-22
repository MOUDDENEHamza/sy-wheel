import { Component } from '@angular/core';

@Component({
  selector: 'app-button-component',
  standalone: false,
  templateUrl: './button-component.component.html',
  styleUrl: './button-component.component.css'
})
export class ButtonComponentComponent {

  clickedList : boolean[] = [false, false, false];

  click(index: number) {
    for (let i = 0; i < this.clickedList.length; i++) {
      this.clickedList[i] = (i === index) ? !this.clickedList[i] : false;
    }
  }

}
