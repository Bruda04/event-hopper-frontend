import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatSort} from  "../../../infrastructure/material/material.module";
import {CategoriesService} from '../categories.service';
import {ApproveSuggestionComponent} from '../approve-suggestion/approve-suggestion.component';
import {EditSuggestionComponent} from '../edit-suggestion/edit-suggestion.component';
import {CategorySuggestionDTO} from '../../model/categorySuggestionDTO.model';
import {SimpleCategoryDTO} from '../../model/simpleCategoryDTO.model';

@Component({
  selector: 'app-admin-suggestions-management',
  templateUrl: './admin-suggestions-management.component.html',
  styleUrl: './admin-suggestions-management.component.css'
})


export class AdminSuggestionsManagementComponent implements OnInit {
  categories: CategorySuggestionDTO[];
  dataSource: MatTableDataSource<CategorySuggestionDTO>

  displayedColumns: string[] = [
    'name',
    'forProduct',
    'actions',
  ];

  @Output() categoryApproved = new EventEmitter<void>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriesService: CategoriesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load();
  }

  edit(element: CategorySuggestionDTO):void {

    this.categoriesService.getApproved().subscribe({
      next: (categories: SimpleCategoryDTO[]) => {
        const dialogRef = this.dialog.open(EditSuggestionComponent, {
          minWidth: '30vw',
          data: {product: element, categories: categories},
        });

        dialogRef.afterClosed().subscribe((result: boolean | null) => {
          if (result) {
            this.categoriesService.reject(element.id, {status: 'REJECTED'}).subscribe({
              next: (_) => {
                this.load();
              },
              error: (_) => {
                console.error("Error rejecting category");
              }
            });
          }
        });
      },
      error: (_) => {
        console.error("Error loading approved categories");
      }
  });
  }

  approve(element: CategorySuggestionDTO): void {
    const dialogRef = this.dialog.open(ApproveSuggestionComponent, {
      minWidth: '30vw',
      data: element.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.categoriesService.approve(element.id, {status: 'APPROVED'}).subscribe({
          next: (_) => {
            this.load();
            this.categoryApproved.emit();
          },
          error: (_) => {
            console.error("Error approving category");
          }
        });
      }
    });
  }

  load(): void {
    this.categoriesService.getSuggestions().subscribe({
      next: (suggestion: CategorySuggestionDTO[]) => {
        this.dataSource = new MatTableDataSource<CategorySuggestionDTO>(suggestion);
        this.dataSource.sort = this.sort;
      },
      error: (_) => {
        console.error("Error loading categories");
      }
    });
  }

}
