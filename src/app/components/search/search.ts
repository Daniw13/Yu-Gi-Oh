import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { YgoCard } from '../../models/yugioh';
import { YugiohService } from '../../services/yugioh.service';
import { CardComponent } from '../card/card';
import { CardDetailComponent } from '../card-detail/card-detail';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, CardDetailComponent],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  query = '';
  cards: YgoCard[] = [];
  selectedCard: YgoCard | null = null;
  loading = false;
  errorMessage = '';

  private readonly searchInput$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly yugiohService: YugiohService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.searchInput$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading = true;
          this.errorMessage = '';
          return this.yugiohService.searchCards(term);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (cards) => {
          this.cards = cards;
          this.selectedCard = null;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'No se pudo consultar la API de YGOPRODeck.';
          this.cards = [];
          this.selectedCard = null;
          this.loading = false;
        },
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(): void {
    this.searchInput$.next(this.query.trim());
  }

  onInputChange(value: string): void {
    this.query = value;
    this.searchInput$.next(value.trim());
  }

  onSelectCard(card: YgoCard): void {
    this.selectedCard = card;
  }

  @HostListener('document:keydown.escape')
  closeCardDetail(): void {
    this.selectedCard = null;
  }
}
