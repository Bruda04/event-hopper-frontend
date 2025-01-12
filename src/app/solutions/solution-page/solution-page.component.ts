import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {UserService} from "../../authentication/services/user.service";
import {ProfileService} from '../../profile/profile.service';
import {environment} from "../../../env/envirements";
import {MatDialogRef} from '@angular/material/dialog';
import {EditPriceComponent} from '../edit-price/edit-price.component';
import {UpdatePriceDTO} from '../../shared/dto/prices/updatePriceDTO.model';
import {ProductReviewComponent} from '../product-review/product-review.component';
import {MatDialog} from '../../infrastructure/material/material.module';
import {CreateProductRatingDTO} from '../../shared/dto/ratings/CreateProductRatingDTO.model';
import {CreateCommentDTO} from '../../shared/dto/comments/createCommentDTO.model';

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
              private userService: UserService,
              public dialog: MatDialog
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
          console.log(this.solution);
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
    if (!this.solution.favorite) {
      this.profileService.addSolutionToFavorites(this.solutionId).subscribe({
        next: () => {
          this.solution.favorite = !this.solution.favorite;
        },
        error: (err) => {
          console.log('Error adding solution to favorites');
        }
      });
    } else {
      this.profileService.removeSolutionFromFavorites(this.solutionId).subscribe({
        next: () => {
          this.solution.favorite = !this.solution.favorite;
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

  review(): void {
    const dialogRef: MatDialogRef<ProductReviewComponent> = this.dialog.open(ProductReviewComponent, {
      minWidth: '40vw',
      minHeight: '40vh',
      data: this.solution
    });

    dialogRef.afterClosed().subscribe((result: {rating: CreateProductRatingDTO, comment: CreateCommentDTO}): void => {
      if (result.comment != null) {
        this.productService.commentProduct(result.comment).subscribe({
          next: () => {
            this.loadSolution();
          },
          error: () => {
            console.error('Error creating comment');
          }
        });
      }
      if (result.rating != null) {
        this.productService.rateProduct(result.rating).subscribe({
          next: () => {
            this.loadSolution();
          },
          error: () => {
            console.error('Error rating product');
          }
        });
      }
    });
  }
}
