import {Component, HostListener, OnInit} from '@angular/core';
import { BudgetService } from '../budget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../authentication/services/user.service';
import { BudgetManagementDTO } from '../../shared/dto/budget/BudgetManagementDTO.model';
import { UpdateBudgetItemDTO } from '../../shared/dto/budget/UpdateBudgetItemDTO.model';
import { BudgetItemManagementDTO } from '../../shared/dto/budget/BudgetItemManagementDTO.model';
import { SimpleCategoryDTO } from '../../shared/dto/categories/simpleCategoryDTO.model';
import {FormControl, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  BudgetingPurchasedProductsComponent
} from '../budgeting-purchased-products/budgeting-purchased-products.component';
import {distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent implements OnInit {

  eventId: string;
  spentAmount: number;
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
        this.spentAmount = this.budget.budgetItems.reduce((acc: number, item: BudgetItemManagementDTO): number => acc + item.amount, 0)-this.budget.leftAmount;
        this.setLeftAmount();
        this.budgetingForm.valueChanges.subscribe(() => {this.setLeftAmount()});
        console.log(this.budget);
      },
      error: (error: { error?: { message?: string } }): void => {
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
      const fg =  new FormGroup({
        id: new FormControl(item.id),
        category: new FormControl(item.category, { nonNullable: true }),
        amount: new FormControl(item.amount, [Validators.required, Validators.min(item.minAmount)])
      })
      fg.get("amount").valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((value: number): void => {
        if (value < item.minAmount) {
          fg.get("amount").setErrors({ minAmount: item.minAmount });
        } else {
          fg.get("amount").setErrors(null);
        }
      });

      this.itemsFormArray.push(fg);
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
      const fg = new FormGroup({
        id: new FormControl(null),
        category: new FormControl(cat, { nonNullable: true }),
        amount: new FormControl<number>(0, [Validators.required, Validators.min(newItem.minAmount)])
      })
      fg.get("amount").valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((value: number): void => {
        if (value < newItem.minAmount) {
          fg.get("amount").setErrors({ minAmount: newItem.minAmount });
        } else {
          fg.get("amount").setErrors(null);
        }
      });

      this.itemsFormArray.push(fg);
      this.budgetingForm.get('category').reset();
    }
  }

  save(): void {
    if (this.itemsFormArray.invalid) {
      console.error('Invalid form');
      return;
    }

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
      error: (error: { error?: { message?: string } }): void => {
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
    const dialogRef: MatDialogRef<BudgetingPurchasedProductsComponent> = this.dialog.open(BudgetingPurchasedProductsComponent, {
      minWidth: '40vw',
      minHeight: '40vh',
      data: {
        category: this.budget.budgetItems[i].category.name,
        event: this.budget.event.name,
        products: this.budget.budgetItems[i].purchasedProducts
      }
    });
  }


  setLeftAmount(): void {
    const formItems: number[]= this.budgetingForm.value.items.map((item: { id: string, category: SimpleCategoryDTO, amount: number }): number => item.amount);
    this.budget.leftAmount = formItems.reduce((acc: number, item: number): number => acc + item, 0) - this.spentAmount;
  }
}
