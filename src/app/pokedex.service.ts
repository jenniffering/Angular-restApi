import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/topromise';

@Injectable()
export class PokedexService {
  //Colocamos los links de donde se obtendran los datos
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  /**
   * Inject the HTTP service.
   */
  constructor(private http: Http) { }

  /**
   * Method that fetches data from
   * the Pokémon API.
   */
  getPokemon(offset: number, limit: number) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      /**
       * The `get()` method returns
       * an Observable but we convert
       * it into a Promise.
       */
      .toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        /**
         * Massage the data a bit to
         * create objects with the correct
         * structure.
         */
        const id: number = idx + offset + 1;

        return {
          name: item.name,
          sprite: `${this.baseSpriteUrl}${id}.png`,
          id
        };
      }));
  }
}