import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {MatTableDataSource} from '@angular/material/table';
import {PriceManagementDTO} from '../../shared/dto/prices/PriceManagementDTO.model';
import {MatDialog, MatPaginator, MatSort} from '../../infrastructure/material/material.module';
import {ProductService} from '../product.service';
import {MatDialogRef} from '@angular/material/dialog';
import {EditServiceComponent} from '../edit-service/edit-service.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {EditPriceComponent} from '../edit-price/edit-price.component';
import {UpdatePriceDTO} from '../../shared/dto/prices/updatePriceDTO.model';


@Component({
  selector: 'app-price-list-management',
  templateUrl: './price-list-management.component.html',
  styleUrl: './price-list-management.component.css'
})
export class PriceListManagementComponent implements OnInit {
  prices: PriceManagementDTO[];
  dataSource: MatTableDataSource<PriceManagementDTO>;

  displayedColumns: string[] = [
    'product',
    'basePrice',
    'discount',
    'finalPrice',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPrices();
  }


  loadPrices(): void {
    this.productService.getPricesForManagement().subscribe(
      {
        next: (response: PriceManagementDTO[]) => {
          this.prices = response;
          this.dataSource = new MatTableDataSource(this.prices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.error('Error loading prices');
        }
      }
    );
  }

  edit(element: PriceManagementDTO):void {
    const dialogRef: MatDialogRef<EditPriceComponent> = this.dialog.open(EditPriceComponent, {
      minWidth: '20vw',
      minHeight: '40vh',
      data: element
    });

    dialogRef.afterClosed().subscribe((price: UpdatePriceDTO | null) => {
      if (price && (price.basePrice != element.basePrice || price.discount != element.discount)) {
        this.productService.updatePrice(element.productId, price).subscribe(
          {
            next: () => {
              this.loadPrices();
            },
            error: () => {
              console.error('Error updating price');
            }
          }
        );
      }
    });
  }

  exportToPDF(): void {
    let pdf: jsPDF = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

    const title = "Price List";

    pdf.setFontSize(24);
    pdf.setTextColor(7, 59, 76)
    pdf.setFont("helvetica", "bold");
    pdf.text(title, 105, 15, { align: "center" });


    const columns: string[] = ['No.', 'Product Name', 'Base Price', 'Discount', 'Final Price'];

    const sortedPrices:PriceManagementDTO[] = this.prices.sort((a: PriceManagementDTO, b: PriceManagementDTO): number =>
      a.productName.localeCompare(b.productName)
    );

    const rows:string[][] = sortedPrices.map((price: PriceManagementDTO, index: number):string[] => [
      `${index + 1}.`,
      price.productName,
      `${price.basePrice} €`,
      `${price.discount}%`,
      `${price.finalPrice} €`
    ]);

    autoTable(
      pdf,
      {
      head: [columns],
      body: rows,
      startY: 30,
      headStyles: {
        fillColor: [229, 249, 255],
        textColor: [7, 59, 76],
        fontSize: 12,
        halign: 'left'
      },
      styles: {
        fontSize: 10,
        halign: 'left',
        textColor: [7, 59, 76],
      }
      }
    );

    pdf.save('price-list.pdf');
  }
}
