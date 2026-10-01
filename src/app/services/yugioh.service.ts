import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { YgoCard, YgoCardResponse } from '../models/yugioh';

@Injectable({
  providedIn: 'root',
})
export class YugiohService {
  private readonly baseUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(private readonly http: HttpClient) {}

  searchCards(name: string): Observable<YgoCard[]> {
    const query = name.trim();

    if (!query) {
      return of([]);
    }

    return this.http
      .get<YgoCardResponse>(this.baseUrl, {
        params: { fname: query },
      })
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([])),
      );
  }

  getCardsByArchetype(archetype: string): Observable<YgoCard[]> {
    const query = archetype.trim();

    if (!query) {
      return of([]);
    }

    return this.http
      .get<YgoCardResponse>(this.baseUrl, {
        params: { archetype: query },
      })
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([])),
      );
  }

  getBlueEyesCards(): Observable<YgoCard[]> {
    return this.getCardsByArchetype('Blue-Eyes');
  }
}
