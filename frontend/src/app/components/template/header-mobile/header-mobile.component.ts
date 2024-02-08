import { ChangeDetectionStrategy, Component, HostListener, OnInit, Renderer2, inject, signal } from '@angular/core';
import { PaginationService } from '../../../service/pagination/pagination.service';
import { LoginService } from '../../../service/login/login.service';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('move-menu', [
      state('open', style({
        'right': '0'
      })),
      state('close', style({
        'right': "-100%"
      })),
      transition('close <=> open', animate('1s ease'))
    ])
  ]
})
export class HeaderMobileComponent implements OnInit{
  #paginationService = inject(PaginationService)
  #login = inject(LoginService)

  nav = signal('close')

  ngOnInit(): void {
      this.#paginationService.getCards()
  }

  isLogged(){
    return this.#login.isLog()
  }
  logout(){
    alert('Você foi desconectado')
    this.#login.makeLogout()
  }

  setFirstPage(){
    this.#paginationService.setActualPage(1)
  }
}
