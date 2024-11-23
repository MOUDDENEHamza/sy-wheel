import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { ButtonComponentComponent } from './header/button-component/button-component.component';
import { TeamComponentComponent } from './header/team-component/team-component.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {provideHttpClient} from '@angular/common/http';
import { ContentComponent } from './content/content.component';
import { WheelComponentComponent } from './content/wheel-component/wheel-component.component';
import { DrawComponentComponent } from './content/draw-component/draw-component.component';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import { DeskAnimationComponent } from './animation/desk-animation/desk-animation.component';
import { CoffeeAnimationComponent } from './animation/coffee-animation/coffee-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ButtonComponentComponent,
    TeamComponentComponent,
    ContentComponent,
    WheelComponentComponent,
    DrawComponentComponent,
    DeskAnimationComponent,
    CoffeeAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatIconAnchor,
    MatButton,
    MatCheckbox,
    MatCard,
    MatCardContent,
    MatCardImage
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
