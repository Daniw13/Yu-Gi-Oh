import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { YgoCard } from '../../models/yugioh';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.css',
})
export class CardDetailComponent {
  @Input() card: YgoCard | null = null;

  get printVariants(): Array<{
    set_name: string;
    set_rarity?: string;
    image_url: string;
  }> {
    if (!this.card) {
      return [];
    }

    const sets = this.card.card_sets ?? [];
    const images = this.card.card_images ?? [];

    if (!sets.length) {
      return images.length
        ? images.map((image, index) => ({
            set_name: index === 0 ? 'Presentación principal' : `Presentación ${index + 1}`,
            image_url: image.image_url ?? this.cardImage,
          }))
        : [{ set_name: 'Presentación principal', image_url: this.cardImage }];
    }

    return sets.map((set, index) => ({
      set_name: set.set_name,
      set_rarity: set.set_rarity ?? 'Rare',
      image_url: images[index]?.image_url ?? images[0]?.image_url ?? this.cardImage,
    }));
  }

  get cardImage(): string {
    return (
      this.card?.card_images?.[0]?.image_url ??
      this.card?.image_url ??
      'https://images.ygoprodeck.com/images/cards/89631139.jpg'
    );
  }

  get cardImages(): YgoCard['card_images'] {
    return this.card?.card_images?.length ? this.card.card_images : [{ image_url: this.cardImage }];
  }

  get printedSets(): YgoCard['card_sets'] {
    return this.card?.card_sets?.length ? this.card.card_sets : [];
  }
}
