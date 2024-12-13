import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';

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

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.solutionId = this.route.snapshot.paramMap.get('id');
    this.loadSolution();
  }

  loadSolution(): void {
    this.productService.getSolution(this.solutionId).subscribe({
        next: (solution: SolutionDetailsDTO): void => {
          this.solution = solution;
          this.eventTypes = solution.eventTypes.map(eventType => eventType.name).join(', ')
        },
        error: (error): void => {
          console.error(error);
          this.notFound = true;
        }
      }
    );
  }

  goToProvider() {
    this.router.navigate(['/providers/', this.solution.provider.id]);
  }
}
