import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {UserService} from "../../authentication/services/user.service";
import {ProfileService} from '../../profile/profile.service';
import {environment} from "../../../env/envirements";
import {MatDialogRef} from '@angular/material/dialog';
import {ProductReviewComponent} from '../product-review/product-review.component';
import {MatDialog} from '../../infrastructure/material/material.module';
import {CreateProductRatingDTO} from '../../shared/dto/ratings/CreateProductRatingDTO.model';
import {CreateCommentDTO} from '../../shared/dto/comments/createCommentDTO.model';
import {DialogBuyProductComponent} from '../../reservation/dialog-buy-product/dialog-buy-product.component';
import {DialogSelectEventComponent} from '../../reservation/dialog-select-event/dialog-select-event.component';
import {ReservationService} from '../../reservation/reservation.service';
import {CreateReservationProductDTO} from '../../shared/dto/reservations/CreateReservationProductDTO.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookingAServiceComponent} from '../../reservation/booking-a-service/booking-a-service.component';
import {CreateReservationServiceDTO} from '../../shared/dto/reservations/CreateReservationServiceDTO.model';
import {UserData} from '../../shared/model/userData.model';

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
  user: UserData;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private profileService: ProfileService,
              private userService: UserService,
              private reservationService: ReservationService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }
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
          this.solution.comments.map(c =>
            c.author.profilePicture = c.author.profilePicture ? environment.apiImagesHost + c.author.profilePicture : 'profile.png');
          console.log(this.solution);
        },
        error: (): void => {
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
        error: () => {
          console.log('Error adding solution to favorites');
        }
      });
    } else {
      this.profileService.removeSolutionFromFavorites(this.solutionId).subscribe({
        next: () => {
          this.solution.favorite = !this.solution.favorite;
        },
        error: () => {
          console.log('Error removing solution from favorites');
        }
      });
    }
  }

  protected showChat: boolean = false;

  chatWithUs(): void {
    this.showChat = !this.showChat;
  }

  protected readonly environment = environment;

  review(): void {
    const dialogRef: MatDialogRef<ProductReviewComponent> = this.dialog.open(ProductReviewComponent, {
      minWidth: '40vw',
      minHeight: '40vh',
      data: this.solution
    });

    dialogRef.afterClosed().subscribe((result: { rating: CreateProductRatingDTO, comment: CreateCommentDTO }): void => {
      if (result == null) {
        return;
      }
      if (result.comment != null) {
        this.productService.commentProduct(result.comment).subscribe({
          next: () => {
            this.loadSolution();
          },
          error: (err: { error?: { message?: string } }) => {
            console.error('Error creating comment');
            if (err.error?.message) {
              this.showErrorToast('Error creating comment: ' + err.error.message);
            }
          }
        });
      }
      if (result.rating != null) {
        this.productService.rateProduct(result.rating).subscribe({
          next: () => {
            this.loadSolution();
          },
          error: (err: { error?: { message?: string } }) => {
            console.error('Error rating product');
            if (err.error?.message) {
              this.showErrorToast('Error rating product: ' + err.error.message);
            }
          }
        });
      }
    });
  }

  selectEventForPurchase(): void {
    if (this.solution.applicableEvents.length === 1) {
      if (!this.solution.service) {
        this.buyProduct(this.solution.applicableEvents[0].id);
      } else {
        this.bookService(this.solution.applicableEvents[0].id);
      }
    } else {
      const dialogRef: MatDialogRef<DialogSelectEventComponent> = this.dialog.open(DialogSelectEventComponent, {
        minWidth: '30vw',
        minHeight: '20vh',
        data: this.solution.applicableEvents
      });

      dialogRef.afterClosed().subscribe((eventId: string | null): void => {
        if (eventId == null) {
          return;
        } else {
          if (!this.solution.service) {
            this.buyProduct(eventId);
          } else {
            this.bookService(eventId);
          }
        }
      });
    }
  }

  private buyProduct(eventId: string) {
    const dialogRef: MatDialogRef<DialogBuyProductComponent> = this.dialog.open(DialogBuyProductComponent, {
      minWidth: '40vw',
      minHeight: '35vh',
      data: {solution: this.solution, eventId: eventId}
    });

    dialogRef.afterClosed().subscribe((buy: boolean | null): void => {
      if (!buy) {
        return;
      } else {
        const reservationRequest: CreateReservationProductDTO = {
          eventId: eventId,
          productId: this.solution.id
        };
        this.reservationService.buyProduct(reservationRequest).subscribe({
          next: (): void => {
            this.loadSolution();
          },
          error: (err: { error?: { message?: string } }): void => {
            console.error('Error buying product', err);
          }
        });
      }
    });
  }

  private bookService(eventId: string) {
    const  dialogRef: MatDialogRef<BookingAServiceComponent> = this.dialog.open(BookingAServiceComponent, {
      minWidth: '60vw',
      minHeight: '50vh',
      data: {solution: this.solution, eventId: eventId}
    });

    dialogRef.afterClosed().subscribe((booking: boolean | null): void => {
      if (!booking){
        return;
      } else{

        const selectedStartTime = dialogRef.componentInstance.selectedStartTime;  // Ovo je vrednost koju ste odabrali u dijalogu
        const selectedEndTime = dialogRef.componentInstance.selectedEndTime;  // Ovo je vrednost koju ste odabrali u dijalogu
        console.log(selectedStartTime)
        console.log(selectedEndTime);

        if (!selectedStartTime) {
          console.error('No time selected!');
          return;
        }


        const reservationRequest: CreateReservationServiceDTO = {
          eventId: eventId,
          productId: this.solution.id,
          from: selectedStartTime,
          to: selectedEndTime,
        };
        this.reservationService.bookService(reservationRequest).subscribe({
          next: (): void => {
            this.loadSolution();
          },
          error: (err: { error?: { message?: string } }): void => {
            console.error('Error booking service', err);
          }
        });
      }
    });
  }

  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
