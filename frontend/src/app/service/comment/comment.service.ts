import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  #comments = signal<{user:string, img: string, message: string}[]>([])
  getComments(){
    return this.#comments()
  }
  setComments(user:string, img: string, message:string){
    this.#comments.update(arrayAtual => [...arrayAtual, {user, img, message}])
  }
  deleteComments(message: string, user: string){
    this.#comments.update(arrayAtual => {
      const commentToDelete = arrayAtual.filter(commentary => commentary.message == message && commentary.user == user)[0]
      arrayAtual.splice(arrayAtual.indexOf(commentToDelete), 1)
      return arrayAtual
    })
  }
}
