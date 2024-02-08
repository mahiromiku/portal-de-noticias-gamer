import { Component, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderMobileComponent } from './components/template/header-mobile/header-mobile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HeaderMobileComponent],
  template: `
  @if(screenWidth <= 750){
    <app-header-mobile/>
  }@else{
    <app-header/>
  }
    <router-outlet></router-outlet>
  <app-footer/>
  `
})
export class AppComponent implements OnInit{
  #renderer = inject(Renderer2)

  screenWidth!: number

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth
    }
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth
    }
  }
}
