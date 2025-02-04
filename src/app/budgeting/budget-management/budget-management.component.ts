import {Component, HostListener, OnInit} from '@angular/core';
import { BudgetService } from '../budget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { BudgetManagementDTO } from '../../shared/dto/budget/BudgetManagementDTO.model';
import { UpdateBudgetItemDTO } from '../../shared/dto/budget/UpdateBudgetItemDTO.model';
import { BudgetItemManagementDTO } from '../../shared/dto/budget/BudgetItemManagementDTO.model';
import { SimpleCategoryDTO } from '../../shared/dto/categories/simpleCategoryDTO.model';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent implements OnInit {

  eventId: string;
  budget: BudgetManagementDTO;
  budgetingForm = new FormGroup({
    category: new FormControl<SimpleCategoryDTO[]>(null, [Validators.required]),
    items: new FormArray([]) // Holds category-amount pairs
  });

  constructor(private budgetService: BudgetService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private dialog: MatDialog) {

  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' && target.getAttribute('type') === 'number') {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    if (this.userService.getUserData().role !== 'EVENT_ORGANIZER') {
      this.router.navigate(['/']);
    }

    this.loadBudget();
  }

  private loadBudget(): void {
    this.budgetService.getManagement(this.eventId).subscribe({
      next: (budget: BudgetManagementDTO): void => {
        this.budget = budget;
        this.populateBudgetForm();
      },
      error: (error: any): void => {
        console.error(error);
      }
    });
  }

  get itemsFormArray(): FormArray {
    return this.budgetingForm.get('items') as FormArray;
  }

  private populateBudgetForm(): void {
    this.itemsFormArray.clear();

    this.budget.budgetItems.forEach((item: BudgetItemManagementDTO): void => {
      this.itemsFormArray.push(
        new FormGroup({
          id: new FormControl(item.id),
          category: new FormControl(item.category, { nonNullable: true }),
          amount: new FormControl(item.amount, [Validators.required, Validators.min(item.minAmount)])
        })
      );
    });
  }

  add(): void {
    const selectedCategories: SimpleCategoryDTO[] = this.budgetingForm.value.category || [];

    for (const cat of selectedCategories) {
      const newItem: BudgetItemManagementDTO = {
        id: null,
        category: cat,
        amount: 0,
        minAmount: 0,
        deletable: true,
        purchasedProducts: []
      };

      this.budget.budgetItems.push(newItem);
      this.itemsFormArray.push(
        new FormGroup({
          id: new FormControl(null),
          category: new FormControl(cat, { nonNullable: true }),
          amount: new FormControl<number>(0, [Validators.required, Validators.min(0)])
        })
      );
      this.budgetingForm.get('category').reset();
    }
  }

  save(): void {
    const updatedBudget: UpdateBudgetItemDTO[] = this.budgetingForm.value.items.map(
      (item: { id: string, category: SimpleCategoryDTO, amount: number }): UpdateBudgetItemDTO => ({
        id: item.id,
        categoryId: item.category.id,
        amount: item.amount
      })
    );

    this.budgetService.updateBudget(this.eventId, updatedBudget).subscribe({
      next: (budget: BudgetManagementDTO): void => {
        this.budget = budget;
        this.populateBudgetForm();
      },
      error: (error: any): void => {
        console.error(error);
      }
    });
  }

  getAvailableCategories(): SimpleCategoryDTO[] {
    if (!this.budget || !this.budget.event || !this.budget.event.eventType) {
      return [];
    }

    const selectedCategoryIds = new Set(this.budget.budgetItems.map(item  => item.category.id));

    return this.budget.event.eventType.suggestedCategories.filter(
      category  => !selectedCategoryIds.has(category.id)
    );
  }

  delete(i: number): void {
    this.budget.budgetItems.splice(i, 1);
    this.itemsFormArray.removeAt(i);
  }

  viewProducts(i: number): void {

  }
}
