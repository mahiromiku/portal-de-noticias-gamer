import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  #route = inject(ActivatedRoute)
  id = signal<string | null>('')

  getId(){
    const id = this.#route.snapshot.children[0].paramMap.get('id')
    this.id.set(id)
  }

  ngOnInit(): void {
    if (this.#route.snapshot && this.#route.snapshot.children && this.#route.snapshot.children.length > 0) {
      const childSnapshot = this.#route.snapshot.children[0];
      if (childSnapshot && childSnapshot.paramMap.has('id')) {
        this.getId();
      }
    }
  }
}
