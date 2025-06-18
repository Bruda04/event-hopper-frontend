import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../event/event.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  PieController,
  ArcElement,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import {GraphDataDTO} from '../shared/dto/events/GraphDataDTO';

// Register Chart.js components and plugins
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  ChartDataLabels
);

@Component({
  selector: 'app-event-stats-dialog',
  templateUrl: './event-stats-dialog.component.html',
  styleUrls: ['./event-stats-dialog.component.css'],
})
export class EventStatsDialogComponent implements OnInit {
  stats: GraphDataDTO;
  loading = true;
  errorOccured = false;

  @ViewChild('chartsContainer') chartsContainer!: ElementRef;
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EventStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.getEventStats(this.data.eventId).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
        setTimeout(() => this.renderCharts(), 0);
      },
      error: () => {
        this.loading = false;
        this.errorOccured= true;
      },
    });
  }

  renderCharts(): void {
    // Line Chart (Ratings Over Time)
    new Chart(this.lineChartRef.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.stats.ratings.map((r: any) =>
          new Date(r.timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: 'Average Rating',
            data: this.stats.ratings.map((r: any) => r.averageRating),
            borderColor: '#3f51b5',
            fill: false,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { font: { size: 12 } },
          },
        },
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: { ticks: { font: { size: 12 } } },
        },
      },
    });

    // Pie Chart (Invitations)
    new Chart(this.pieChartRef.nativeElement.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Accepted', 'Pending', 'Declined'],
        datasets: [
          {
            data: [
              this.stats.numAcceptedInvitations,
              this.stats.numPendingInvitations,
              this.stats.numDeclinesInvitations,
            ],
            backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels?.[ctx.dataIndex] || '';
              return `${label}: ${value}`;
            },
            color: '#fff',
            font: { size: 12 },
            anchor: 'end',
            align: 'start',
            offset: 10,
          },
          legend: {
            labels: { font: { size: 12 } },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    // Bar Chart (Attendance)
    new Chart(this.barChartRef.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Max Attendance', 'Accepted'],
        datasets: [
          {
            label: 'People',
            data: [this.stats.maxAttendance, this.stats.numAcceptedInvitations],
            backgroundColor: ['#2196f3', '#4caf50'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { font: { size: 12 } },
          },
        },
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: { ticks: { font: { size: 12 } } },
        },
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  downloadPDF(): void {
    const title = 'Event Statistics';
    const lineCanvas = this.lineChartRef.nativeElement;
    const pieCanvas = this.pieChartRef?.nativeElement;
    const barCanvas = this.barChartRef.nativeElement;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 20;

    // Add title
    pdf.setFontSize(18);
    pdf.text(title, pageWidth / 2, y, { align: 'center' });
    y += 10;

    const addChartToPDF = (canvas: HTMLCanvasElement, next: () => void) => {
      const imgData = canvas.toDataURL('image/png');
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = (pageWidth - 20) * 0.6;
      const imgHeight = imgWidth / aspectRatio;

      if (y + imgHeight > 280) {
        pdf.addPage();
        y = 20;
      }

      const x = (pageWidth - imgWidth) / 2;  // centers horizontally
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      y += imgHeight + 10;

      next();
    };

    addChartToPDF(lineCanvas, () => {
      if (pieCanvas) {
        addChartToPDF(pieCanvas, () => {
          addChartToPDF(barCanvas, () => {
            pdf.save('event-stats.pdf');
          });
        });
      } else {
        addChartToPDF(barCanvas, () => {
          pdf.save('event-stats.pdf');
        });
      }
    });
  }

}
