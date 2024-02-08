import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublishComponent } from './pages/publish/publish.component';
import { postNewsGuard } from './guard/post-news.guard';

export const routes: Routes = [
    {
        path: '',
        title: 'página inicial',
        component: HomeComponent,
        children: [
            {
                path: 'pagina/:id',
                title: 'página de notícias',
                component: HomeComponent
            }
        ]
    },
    {
        path: 'noticias/:id',
        title: 'noticias',
        component: NewsComponent
    },
    {
        path: 'entrar',
        title: 'Entrar',
        component: LoginComponent
    },
    {
        path: 'cadastrar',
        title: 'Cadastrar',
        component: RegisterComponent
    },
    {
        path: 'publicar',
        title: 'Publicar',
        component: PublishComponent,
        canActivate: [postNewsGuard]
    },
    {
        path: '**',
        title: 'not found',
        component: Error404Component
    }
];
