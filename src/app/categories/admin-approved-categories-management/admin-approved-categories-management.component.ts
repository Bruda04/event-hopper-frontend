import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../model/category.model';
import {MatDialog, MatSort} from '../../infrastructure/material/material.module';
import {CategoriesService} from '../categories.service';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../../services/edit-service/edit-service.component';
import {CreateServiceComponent} from '../../services/create-service/create-service.component';

@Component({
  selector: 'app-admin-approved-categories-management',
  templateUrl: './admin-approved-categories-management.component.html',
  styleUrl: './admin-approved-categories-management.component.css'
})
export class AdminApprovedCategoriesManagementComponent implements OnInit, AfterViewInit {
  categories: Category[];
  dataSource: MatTableDataSource<Category>

  displayedColumns: string[] = [
    'name',
    'description',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriesService: CategoriesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getApproved();
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  remove(category: Category): void {
    this.categoriesService.remove(category);
    this.categories = this.categoriesService.getApproved();
    this.dataSource.data = this.categories;
  }

  edit(element: Category):void {

  }

  create(): void {

  }

}
