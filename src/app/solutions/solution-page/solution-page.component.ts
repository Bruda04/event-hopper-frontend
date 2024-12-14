import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {UserService} from "../../authentication/services/user.service";

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

  // TODO: Implement this method
  toggleFavorites(): void {
  }

  // TODO: Implement this method
  chatWithUs(): void {

  }
}
