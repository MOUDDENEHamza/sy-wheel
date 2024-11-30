import { Component } from '@angular/core';
import {ContextHolderService} from '../../context-holder.service';

@Component({
  selector: 'app-draw-component',
  standalone: false,

  templateUrl: './draw-component.component.html',
  styleUrl: './draw-component.component.css'
})
export class DrawComponentComponent {

  memberList : any[] = [
    {name: 'Thierry', role: 'Boss', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/boss.png'},
    {name: 'Céline', role: 'Developer', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Claire M', role: 'Developer', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Frédéric', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Pierre-Olivier', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Hamza', role: 'Developer', avatar: 'assets/img/avatar-hamza.jpg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Mehdi L', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Yassine', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Othmane', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Jaques', role: 'Developer', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/laptop.svg'},
    {name: 'Nada', role: 'QA', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/police.svg'},
    {name: 'Fatima', role: 'QA', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/police.svg'},
    {name: 'Abdouraman', role: 'QA', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/police.svg'},
    {name: 'Mehdi H', role: 'QA', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/police.svg'},
    {name: 'Ahmed', role: 'QA', avatar: 'assets/img/avatar-male.svg', roleIcon: 'assets/img/police.svg'},
    {name: 'Claire P', role: 'Product owner', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/po.png'},
    {name: 'Pauline', role: 'Product owner', avatar: 'assets/img/avatar-pauline.png', roleIcon: 'assets/img/po.png'},
    {name: 'Kai-Lin', role: 'Product owner', avatar: 'assets/img/avatar-female.svg', roleIcon: 'assets/img/po.png'}
  ]

  selectedMember : string = "";

  constructor(private contextHolderService: ContextHolderService) {
    this.contextHolderService.getSelectedMember.subscribe(selectedMember => {
      this.selectedMember = selectedMember;
    });
  }

  getMember() : any {
    if (this.selectedMember)
      return this.memberList.find(member => member.name === this.selectedMember);

    return {};
  }

}
