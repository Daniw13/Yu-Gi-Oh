export interface YgoCardSet {
  set_name: string;
  set_code: string;
  set_rarity?: string;
  set_price?: string;
}

export interface YgoCardImage {
  id?: number;
  image_url: string;
  image_url_small?: string;
}

export interface YgoCard {
  id: number;
  name: string;
  type: string;
  frameType?: string;
  desc: string;
  race?: string;
  attribute?: string;
  archetype?: string;
  atk?: number | null;
  def?: number | null;
  level?: number | null;
  card_sets?: YgoCardSet[];
  card_images?: YgoCardImage[];
  image_url?: string;
}

export interface YgoCardResponse {
  data: YgoCard[];
}
