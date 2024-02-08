import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Cards } from '../../../interface/Cards.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { CommentService } from '../../service/comment/comment.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [HttpClientModule, NgOptimizedImage, LoadingComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent{
  #fb = inject(FormBuilder)
  #api = inject(ApiService)
  #login = inject(LoginService)
  #route = inject(ActivatedRoute)
  #commentService = inject(CommentService)

  card = signal<Cards | null >(null)
  id: string | null = this.#route.snapshot.paramMap.get('id')

  sendMessage = this.#fb.group({
    message: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getCardById(Number(this.id))
  }

  viewDeleteButton(user: string): boolean{
    if(this.#login.isLog()){
      return this.#login.user()!.name == user 
    }else{
      return false
    }
  }

  delete(message: string, user: string){
    this.deleteOneMessage(message, user)
  }
  
  submit(){
    if(this.sendMessage.valid == true && this.#login.isLog() == true){
      const name = this.#login.user()!.name
      const img = this.#login.user()!.img
      const message = this.sendMessage.value.message!
      this.#commentService.setComments(name, img, message)
      this.updateCard()
    }
    if(this.sendMessage.valid == false){
      alert('É preciso preencher todos os campos')
    }
    if(this.#login.isLog() == false){
      alert('É preciso estar logado para enviar algum comentário')
    }
  }
  
  getCardById(id: number){
      this.#api.getCardById(id).subscribe({
      next: card => this.card.set(card),
      error: error => console.log(error),
      complete: () => console.log("êxito na requisição da lista de card")
    })
  }

  updateCard(){
    if (!this.card()) {
      console.error('Card não encontrado!');
      return;
    }

    this.card()!.comments = this.#commentService.getComments();

    this.#api.patchCard(Number(this.id), this.card()!).subscribe({
      next: () => console.log('êxito na atualização do card'),
      error: error => console.log(error),
      complete: () => console.log("êxito na atualização do card")
    })
  }

  deleteOneMessage(message: string, user: string){
    if (!this.card()) {
      console.error('Card não encontrado!');
      return;
    }
    
    this.#commentService.deleteComments(message, user)

    this.card()!.comments = this.#commentService.getComments();

    this.#api.patchCard(Number(this.id), this.card()!).subscribe({
      next: () => console.log('êxito na atualização do card'),
      error: error => console.log(error),
      complete: () => console.log("êxito na atualização do card")
    })
  }
}
