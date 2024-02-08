import { ChangeDetectionStrategy, Component, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../service/login/login.service';
import { PaginationService } from '../../../service/pagination/pagination.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  #paginationService = inject(PaginationService)
  #login = inject(LoginService)

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
