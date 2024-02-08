import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { uppercaseValidator } from '../../validators/uppercase.validator';
import { lowercaseValidator } from '../../validators/lowercase.validator';
import { numberValidator } from '../../validators/number.validator';
import { specialcharValidator } from '../../validators/specialchar.validator';
import { nospaceValidator } from '../../validators/nospace.validator';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import { Register } from '../../../interface/Register.interface';
import { UploadService } from '../../service/upload/upload.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  #fb = inject(FormBuilder)
  #router = inject(Router)
  #login = inject(LoginService)
  #upload = inject(UploadService)

  file = signal<File | null>(null)

  public registerForm = this.#fb.group({
    img: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    user: ['', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(32),
      nospaceValidator()
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8), 
      Validators.maxLength(32), 
      uppercaseValidator(), 
      lowercaseValidator(), 
      numberValidator(),
      specialcharValidator(),
      nospaceValidator()
    ]]
  })

  onselectFile(e: any){
    if(e.target.files){
      const file = e.target.files[0]
      this.file.set(file)
    }
  }

  uploadFile(){
    if(this.registerForm.valid){
      this.#upload.uploadFile(this.file()!).subscribe({
      error: error => console.log(error),
      complete: () => console.log('imagem enviada com sucesso')
      })
    }
  }

  submit(){
    if(this.registerForm.valid){
      this.saveRegister({
        img: `http://localhost:3000/file/${this.file()!.name}`,
        email: this.registerForm.value.email!,
        user: this.registerForm.value.user!,
        password: this.registerForm.value.password!
      })
    }else{
      alert('formulário inválido')
    }
  }
  
  saveRegister(register: Register){
    this.#login.postRegister(register).subscribe({
      next: next => {
        alert('formulário enviado com sucesso')
        this.#router.navigate([''])
      },
      error: error => console.log(error),
      complete: () => console.log("o usuario foi cadastrado"),
    })
  }
}
