import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Cards } from '../../../interface/Cards.interface';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Error404Component } from '../../pages/error-404/error-404.component';
import { PaginationService } from '../../service/pagination/pagination.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgOptimizedImage, HttpClientModule, CommonModule, LoadingComponent, RouterLink, Error404Component],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit{
  #paginationService = inject(PaginationService)
  #api = inject(ApiService)
  #router = inject(Router)

  @Input() id = signal<string | null>('')

  ngOnInit(): void {
    if(this.id()){
      this.#paginationService.setActualPage(Number(this.id()))
    }
    if(this.pageExist()){
      this.#paginationService.setActualPage(1)
      this.#router.navigate([''])
    }
    this.#paginationService.getCards()
  }

  pageExist(){
    return this.#paginationService.getPageNumberList().indexOf(Number(this.id())) === -1
  }

  getCardsForEachPagination(){
    return this.#paginationService.paginationForCards(this.#paginationService.actualPage()).cards
  }

  getPageNumberList(){
    return this.#paginationService.getPageNumberList()
  }

  setActualPage(page: number){
    this.#paginationService.setActualPage(page)
  }
}
