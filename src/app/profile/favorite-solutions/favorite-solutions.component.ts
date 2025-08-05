import {Component, Input} from '@angular/core';
import {SimpleProductDTO} from '../../shared/dto/solutions/simpleProductDTO';

@Component({
  selector: 'app-favorite-solutions',
  templateUrl: './favorite-solutions.component.html',
  styleUrl: './favorite-solutions.component.css'
})
export class FavoriteSolutionsComponent {
  @Input() favoriteSolutions: any[] = [];
}
