import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api/api.service';
import { Cards } from '../../../interface/Cards.interface';
import { Router } from '@angular/router';
import { UploadService } from '../../service/upload/upload.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, CommonModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublishComponent{

  //exibir no formulário uma preview da imagem a ser enviada
  url = signal('')
  onselectFile(e: any){
    if(e.target.files){
      const file = e.target.files[0]
      this.file.set(file)
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event: any) => {
        this.url.set(event.target.result)
      }
    }
  }

  /////////////////////////////////////////////////////
  
  #fb = inject(FormBuilder)
  #api = inject(ApiService)
  #upload = inject(UploadService)  
  #router = inject(Router)
  file = signal<File | null>(null)

  publishForm = this.#fb.group({
    title: ['', Validators.required],
    subtitle: ['', Validators.required],
    img: ['', Validators.required],
    content: ['', Validators.required]
  })

  public submit(){
    if(this.publishForm.valid){
      const card: Cards = {
        title: this.publishForm.value.title!,
        subtitle: this.publishForm.value.subtitle!,
        img: `${environment.apiPictureUrl}/file/${this.file()!.name}`,
        content: this.publishForm.value.content!
      } 
      this.publishNews(card)
      alert('Noticia publicada com sucesso!')
      this.#router.navigate([''], {onSameUrlNavigation: 'reload'})
    }else{
      alert('É preciso preencher todos os campos')
    }
  }

  public publishNews(card: Cards){
    this.#api.postCard(card).subscribe({
      error: error => console.log(error),
      complete: () => console.log('noticia publicada com sucesso')
    })
  }

  public uploadFile(){
    if(this.publishForm.valid){
      this.#upload.uploadFile(this.file()!).subscribe({
        error: error => console.log(error),
        complete: () => console.log('imagem enviada com sucesso')
      })
    }
  }
}
