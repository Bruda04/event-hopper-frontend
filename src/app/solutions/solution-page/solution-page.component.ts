import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {UserService} from "../../authentication/services/user.service";
import {ProfileService} from '../../profile/profile.service';
import {environment} from "../../../env/envirements";

@Component({
  selector: 'app-solution-page',
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.css'
})
export class SolutionPageComponent implements OnInit {
  solutionId: string;
  solution: SolutionDetailsDTO;
  notFound: boolean = false;
  eventTypes: string;
  user: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private profileService: ProfileService,
              private userService: UserService
  ) { }

  ngOnInit(): void {
    this.solutionId = this.route.snapshot.paramMap.get('id');
    this.loadSolution();
    this.user = this.userService.getUserData();
  }

  loadSolution(): void {
    this.productService.getSolutionDetails(this.solutionId).subscribe(
      {
        next: (solution: SolutionDetailsDTO): void => {
          this.solution = solution;
          this.solution.isFavorite = false;
          this.eventTypes = solution.eventTypes.map(eventType => eventType.name).join(', ');
        },
        error: () : void=> {
          this.notFound = true;
        }
      }
    );
  }

  goToProvider() {
    this.router.navigate(['/providers/', this.solution.provider.id]);
  }

  toggleFavorites(): void {
    if (!this.solution.isFavorite) {
      this.profileService.addSolutionToFavorites(this.user.id, this.solutionId).subscribe({
        next: () => {
          this.solution.isFavorite = !this.solution.isFavorite;
        },
        error: (err) => {
          console.log('Error adding solution to favorites');
        }
      });
    } else {
      this.profileService.removeSolutionFromFavorites(this.user.id, this.solutionId).subscribe({
        next: () => {
          this.solution.isFavorite = !this.solution.isFavorite;
        },
        error: (err) => {
          console.log('Error removing solution from favorites');
        }
      });
  }
  }

  // TODO: Implement this method
  chatWithUs(): void {

  }

    protected readonly environment = environment;
}
