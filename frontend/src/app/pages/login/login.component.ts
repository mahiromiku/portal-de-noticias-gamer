import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { Register } from '../../../interface/Register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{
  #fb = inject(FormBuilder)
  #login = inject(LoginService)
  #router = inject(Router)
  register: Register[] | null = null

  ngOnInit(): void {
      this.loginList()
  }

  public loginForm = this.#fb.group({
    user: [''],
    password: ['']
  })

  public submit(){
    this.register?.forEach(account => {
      if(account.user == this.loginForm.value.user && account.password == this.loginForm.value.password){
        this.#login.setUser(account.user, account.img)
        alert('Login efetuado com sucesso!')
        this.#router.navigate([''])
        this.#login.makeLogin()
      }
    })
    if(this.#login.isLog() == false){
      alert('Seu usuário ou senha está incorreto')
    }
  }

  public loginList(){
    this.#login.getRegisterList().subscribe({
      next: register => {
        this.register = register
      },
      error: error => console.log(error),
      complete: () => console.log("dados do usuário verificado")
    })
  }
}
