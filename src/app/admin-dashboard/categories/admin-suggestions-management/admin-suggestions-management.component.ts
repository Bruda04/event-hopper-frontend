import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../model/category.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatSort} from  "../../../infrastructure/material/material.module";
import {CategoriesService} from '../categories.service';
import {ApproveSuggestionComponent} from '../approve-suggestion/approve-suggestion.component';
import {EditSuggestionComponent} from '../edit-suggestion/edit-suggestion.component';
import {CategorySuggestion} from '../model/categorySuggestion.model';

@Component({
  selector: 'app-admin-suggestions-management',
  templateUrl: './admin-suggestions-management.component.html',
  styleUrl: './admin-suggestions-management.component.css'
})
export class AdminSuggestionsManagementComponent implements OnInit, AfterViewInit {
  categories: CategorySuggestion[];
  dataSource: MatTableDataSource<CategorySuggestion>

  displayedColumns: string[] = [
    'name',
    'forProduct',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriesService: CategoriesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getSuggestions();
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  edit(element: CategorySuggestion):void {
    const dialogRef = this.dialog.open(EditSuggestionComponent, {
      minWidth: '30vw',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.categoriesService.reject(element);
        this.dataSource.data = this.categoriesService.getSuggestions();
      }
    });
  }

  approve(element: CategorySuggestion): void {
    const dialogRef = this.dialog.open(ApproveSuggestionComponent, {
      minWidth: '30vw',
      data: element.name,
    });

    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.categoriesService.approve(element);
        this.dataSource.data = this.categoriesService.getSuggestions();
      }
    });
  }

}
