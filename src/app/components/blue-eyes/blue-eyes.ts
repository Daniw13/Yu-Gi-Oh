import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { YgoCard } from '../../models/yugioh';
import { YugiohService } from '../../services/yugioh.service';
import { CardComponent } from '../card/card';
import { CardDetailComponent } from '../card-detail/card-detail';

@Component({
  selector: 'app-blue-eyes',
  standalone: true,
  imports: [CommonModule, CardComponent, CardDetailComponent],
  templateUrl: './blue-eyes.html',
  styleUrl: './blue-eyes.css',
})
export class BlueEyesComponent implements OnInit {
  cards: YgoCard[] = [];
  selectedCard: YgoCard | null = null;
  loading = false;

  constructor(
    private readonly yugiohService: YugiohService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCards();
    }
  }

  loadCards(): void {
    this.loading = true;

    this.yugiohService.getBlueEyesCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.selectedCard = null;
      },
      error: () => {
        this.cards = [];
        this.selectedCard = null;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSelectCard(card: YgoCard): void {
    this.selectedCard = card;
  }

  @HostListener('document:keydown.escape')
  closeCardDetail(): void {
    this.selectedCard = null;
  }
}
