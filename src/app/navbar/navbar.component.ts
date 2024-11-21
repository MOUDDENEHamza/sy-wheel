import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon("github", "../../assets/img/github.svg")
  }

}
