import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SolutionDetailsDTO} from '../../shared/dto/solutions/solutionDetailsDTO.model';
import {CreateProductRatingDTO} from '../../shared/dto/ratings/CreateProductRatingDTO.model';
import {CreateCommentDTO} from '../../shared/dto/comments/createCommentDTO.model';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent implements OnInit {
  reviewForm = new FormGroup({
    rating: new FormControl<number | null>(null, [Validators.min(1), Validators.max(5), Validators.pattern(/^\d+$/)]),
    comment: new FormControl<string | null>(null, [Validators.maxLength(255)]),
  });

  constructor(public dialogRef: MatDialogRef<ProductReviewComponent>, @Inject(MAT_DIALOG_DATA) protected solution: SolutionDetailsDTO) {}

  save():void {
    if(this.reviewForm.valid) {
      const rating: CreateProductRatingDTO = {
        productId: this.solution.id,
        value: this.reviewForm.value.rating,
      };

      const comment: CreateCommentDTO = {
        productId: this.solution.id,
        content: this.reviewForm.value.comment?.trim(),
      }
      const review = {
        rating: rating.value ? rating: null,
        comment: comment.content?.length ? comment: null,
      };
      this.dialogRef.close(review);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    if (!this.solution.pendingRating) {
      this.reviewForm.controls['rating'].disable()
    }
    if (!this.solution.pendingComment) {
      this.reviewForm.controls['comment'].disable();
      }
  }
}
