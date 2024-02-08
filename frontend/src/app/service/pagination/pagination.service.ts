import { Injectable, inject, signal } from '@angular/core';
import { Cards } from '../../../interface/Cards.interface';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  #api = inject(ApiService)
  cards = signal<Cards[] | null>(null)
  actualPage = signal(1)
  
  getCards(){
    this.#api.getCards().subscribe({
      next: cards => {
        this.cards.set(cards)
      },
      error: error => console.log(error),
      complete: () => console.log("êxito na requisição da lista de card")
    })
  }

  getPageNumberList(){
    if (!this.cards()) {
      return [];
    }
    const pagesLength = Math.ceil(this.cards()!.length/6)
    const pagesAvailable = []
    for(let i = 1; i <= pagesLength!; i++){
      pagesAvailable.push(i)
    }
    return pagesAvailable
  }

  paginationForCards(id: number): {page: number, cards: Cards[]}{
    const descPagination = []
    let init = 0
    let finish = 6
    for(let page of this.getPageNumberList()){
      descPagination.push({
        page,
        cards: this.cards()!.slice(init, finish)
      })
      init += 6
      finish += 6
    }
    return descPagination[id - 1]
  }

  setActualPage(id: number){
    this.actualPage.set(id)
  }
}
