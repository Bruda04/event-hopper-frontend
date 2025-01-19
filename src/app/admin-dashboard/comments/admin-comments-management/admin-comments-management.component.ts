import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SimpleCommentDTO} from '../../../shared/dto/comments/simpleCommentDTO.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {CommentsService} from '../comments.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-comments-management',
  templateUrl: './admin-comments-management.component.html',
  styleUrl: './admin-comments-management.component.css'
})
export class AdminCommentsManagementComponent implements OnInit {

  dataSource: MatTableDataSource<SimpleCommentDTO>;
  displayedColumns: string[] = [
    'author',
    'commentContent',
    'actions',
  ]

  @Output() commentsChange:EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commentsService: CommentsService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.load();
  }

  approve(element: SimpleCommentDTO) {

  }

  delete(element: SimpleCommentDTO) {

  }

  load(): void {
    this.commentsService.getPendingComments().subscribe({
      next: (comments : SimpleCommentDTO[]) => {
        this.dataSource = new MatTableDataSource<SimpleCommentDTO>(comments)
        this.dataSource.sort = this.sort;
      },
      error:(_) => {
        console.error("Error getting comments list", _);
      }
    })
  }



}
