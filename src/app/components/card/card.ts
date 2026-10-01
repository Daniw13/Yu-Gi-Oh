import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YgoCard } from '../../models/yugioh';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input() card!: YgoCard;
  @Output() cardSelected = new EventEmitter<YgoCard>();

  selectCard(): void {
    this.cardSelected.emit(this.card);
  }
}
