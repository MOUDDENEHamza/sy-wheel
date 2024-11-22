import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon("wheel", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/wheel.svg"))
      .addSvgIcon("github", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/github.svg"))
  }

}
