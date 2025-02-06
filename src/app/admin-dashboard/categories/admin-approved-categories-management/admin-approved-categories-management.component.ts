import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MatSort} from  "../../../infrastructure/material/material.module";
import {CategoriesService} from '../categories.service';
import {MatDialogRef} from '@angular/material/dialog';
import {EditCategoryComponent} from '../edit-category/edit-category.component';
import {CreateCategoryComponent} from '../create-category/create-category.component';

import {CategoryDTO} from '../../../shared/dto/categories/categoryDTO.model';
import {UpdateCategoryDTO} from '../../../shared/dto/categories/UpdateCategoryDTO.model';
import {CreateCategoryDTO} from '../../../shared/dto/categories/createCategoryDTO.model';
import {DeleteCategoryComponent} from '../delete-category/delete-category.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-approved-categories-management',
  templateUrl: './admin-approved-categories-management.component.html',
  styleUrl: './admin-approved-categories-management.component.css'
})
export class AdminApprovedCategoriesManagementComponent implements OnInit {
  categories: CategoryDTO[];
  dataSource: MatTableDataSource<CategoryDTO>
  displayedColumns: string[] = [
    'name',
    'description',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriesService: CategoriesService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.load();
  }

  remove(category: CategoryDTO): void {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      minWidth: '30vw',
      data: category.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.categoriesService.remove(category.id).subscribe({
          next: (_) => {
            this.load();
          },
          error: (err) => {
            console.error("Error removing category");
            if (err.error?.message) {
              this.showErrorToast("Error removing category: " + err.error.message);
            }
          }
        });
      }
    });

  }

  edit(element: CategoryDTO):void {
    const dialogRef: MatDialogRef<EditCategoryComponent> = this.dialog.open(EditCategoryComponent, {
      minWidth: '30vw',
      minHeight: '40vh',
      data: element
    });

    dialogRef.afterClosed().subscribe((category: UpdateCategoryDTO | null) => {
      if (category) {
        this.categoriesService.update(element.id, category).subscribe({
          next: (_) => {
            this.load();
          },
          error: (err) => {
            console.error("Error updating category");
            if (err.error?.message) {
              this.showErrorToast("Error updating category: " + err.error.message);
            }
          }
        });
      }
    });
  }

  create(): void {
    const dialogRef: MatDialogRef<CreateCategoryComponent> = this.dialog.open(CreateCategoryComponent, {
      minWidth: '30vw',
      minHeight: '40vh'
    });

    dialogRef.afterClosed().subscribe((newCategory: CreateCategoryDTO | null) => {
      if (newCategory) {
        this.categoriesService.add(newCategory).subscribe({
          next: (_) => {
            this.load();
          },
          error: (err) => {
            console.error("Error creating category");
            if (err.error?.message) {
              this.showErrorToast("Error creating category: " + err.error.message);
            }
          }
        });
      }
    });
  }

  load(): void {
    this.categoriesService.getApproved().subscribe({
      next: (categories: CategoryDTO[]) => {
        this.dataSource = new MatTableDataSource<CategoryDTO>(categories);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error("Error loading categories");
        if (err.error?.message) {
          this.showErrorToast("Error loading categories: " + err.error.message);
        }
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
