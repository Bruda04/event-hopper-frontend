import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {environment} from '../../../env/envirements';
import {DatePipe} from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SinglePageEventDTO} from '../../shared/dto/events/SinglePageEventDTO.model';
import {UserService} from '../../authentication/services/user.service';
import {ProfileService} from '../../profile/profile.service';
import {GetEventAgendasDTO} from '../../shared/dto/events/GetEventAgendasDTO.model';

@Component({
  selector: 'app-event-single-page',
  templateUrl: './event-single-page.component.html',
  styleUrl: './event-single-page.component.css'
})
export class EventSinglePageComponent {
  id: string;
  eventDetails: SinglePageEventDTO;
  location: string;
  image: string;
  time: string;
  notFound: boolean = false;
  loaded: boolean = false;
  user: any;


  datePipe = new DatePipe('en-US');


  constructor(public dialog: MatDialog, private route: ActivatedRoute, private eventService: EventService,
              private userService: UserService, private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.user = this.userService.getUserData();

    this.id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(this.id).subscribe({
      next: (event) => {
        this.image = environment.apiImagesHost + event.picture;
        this.time = this.datePipe.transform(event.time, 'dd.MM.yyyy');
        this.eventDetails = event
        this.location = event.location.address + ", " + event.location.city;

        this.loaded = true;
      },
      error: () :void=>{
        console.log('Error finding event');
        this.loaded = true;
        this.notFound = true;
      },
    });

  }



  toggleFavorites(): void {
    if (!this.eventDetails.favorite) {
      this.profileService.addEventToFavorites(this.id).subscribe({
        next: () => {
          this.eventDetails.favorite = true;
        },
        error: (err) => {
          console.log('Error adding solution to favorites');
        }
      });
    } else {
      this.profileService.removeEventFromFavorites(this.id).subscribe({
        next: () => {
          this.eventDetails.favorite = false;
        },
        error: (err) => {
          console.log('Error removing event from favorites');
        }
      });
    }
  }



  exportToPDF() {
    this.eventService.getAgendaForEvent(this.id).subscribe({
      next: (agendas: GetEventAgendasDTO) => {
        const pdf: jsPDF = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

        // Title Section
        const title = this.eventDetails.name; // Event Name
        pdf.setFontSize(24);
        pdf.setTextColor(0, 51, 102); // Dark blue color for title
        pdf.setFont("helvetica", "bold");
        pdf.text(title, 105, 20, { align: "center" });

        // Event Description Section
        const description = this.eventDetails.description;
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0); // Black text for description
        pdf.setFont("helvetica", "normal");
        pdf.text(description, 15, 40, { maxWidth: 180 });

        // Line Separator
        pdf.setDrawColor(0, 51, 102); // Dark blue line
        pdf.line(15, 60, 195, 60); // Draw line after description

        // Event Location and Time Section
        pdf.setFontSize(14);
        pdf.setTextColor(7, 59, 76); // Slightly lighter blue for sub-headings
        pdf.text('Location:', 15, 70);
        pdf.setFontSize(12);
        pdf.text(this.location, 15, 80);

        pdf.setFontSize(14);
        pdf.setTextColor(7, 59, 76);
        pdf.text('Time:', 15, 90);
        pdf.setFontSize(12);
        pdf.text(this.time, 15, 100);

        // Privacy Section
        pdf.setFontSize(14);
        pdf.setTextColor(7, 59, 76);
        pdf.text('Privacy:', 15, 110);
        pdf.setFontSize(12);
        pdf.text(this.eventDetails.privacy === 'PUBLIC' ? 'Public' :
          this.eventDetails.privacy === 'PRIVATE' ? 'Private' : 'Unknown', 15, 120);

        // Optional: Include an image (event picture)
        if (this.image) {
          const img = this.image; // Replace with actual image URL or base64 string
          pdf.addImage(img, 'JPEG', 15, 130, 180, 100); // Image within the document
        }

        // Agenda Table
        const sortedAgendas = agendas.agendas.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

        console.log(sortedAgendas);

        const tableData = sortedAgendas.map((agenda) => [
          `${new Date(agenda.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(agenda.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, // Time
          agenda.name, // Name
          agenda.description, // Description
          agenda.locationName, // Location
        ]);

        autoTable(pdf, {
          head: [['Time', 'Activity Name', 'Description', 'Location']], // Table header
          body: tableData,
          startY: 240, // Starting position of the table (adjusted for image)
          theme: 'grid', // Optional: 'striped', 'grid', or 'plain'
          styles: { fontSize: 10, halign: 'left' },
        });

        // Footer
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150); // Light gray for footer text
        pdf.text('Generated by EventHopper', 105, 285, { align: "center" });

        // Save the PDF
        pdf.save(`${this.eventDetails.name}.pdf`);
      },
      error: (err) => {
        console.log('Error fetching agenda', err);
      },
    });
  }









  openInviteModal() {
    const dialogRef: MatDialogRef<InvitePeopleComponent> = this.dialog.open(InvitePeopleComponent, {
      minWidth: '70vw',
      maxWidth: '70vw',
      minHeight: '70vh',
      maxHeight: '70vh',
    });

  }
}
