import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InvitePeopleComponent} from '../../invitation/invite-people/invite-people.component';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event.service';
import {environment} from '../../../env/envirements';
import {DatePipe} from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SinglePageEventDTO} from '../../shared/dto/events/SinglePageEventDTO.model';
import {UserService} from '../../authentication/services/user.service';
import {ProfileService} from '../../profile/profile.service';
import {GetEventAgendasDTO} from '../../shared/dto/events/GetEventAgendasDTO.model';
import {SimpleAccountDTO} from '../../shared/dto/users/account/SimpleAccountDTO.model';
import {EventStatsDialogComponent} from '../../event-stats-dialog/event-stats-dialog.component';
import {UserData} from '../../shared/model/userData.model';
import * as L from 'leaflet';
import {LocationService} from '../../location/location.service';

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
  user: UserData;
  map!: L.Map;


  datePipe = new DatePipe('en-US');


  constructor(public dialog: MatDialog, private route: ActivatedRoute, private eventService: EventService,
              private userService: UserService, private profileService: ProfileService, private locationService: LocationService, private router: Router) {

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

        this.locationService.getLocation(event.location.id).subscribe(({
          next: location => {
            this.initMap(location.longitude, location.latitude);

          },
          error: ():void => {
            console.log("error finding location");
          }
        }))

        this.loaded = true;
      },
      error: () :void=>{
        console.log('Error finding event');
        this.loaded = true;
        this.notFound = true;
      },
    });



  }

  private initMap(longitude:number, latitude:number): void {
    this.map = L.map('event-map').setView([latitude, longitude],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup('Event location')
      .openPopup();
  }


  openStatsDialog(): void {
    this.dialog.open(EventStatsDialogComponent, {
      data: { eventId : this.id },
      width: '90vh',
      maxHeight: '90vh'
    });

  }

  openBudgetingPage(): void {
    const eventId = this.eventDetails.id;
    this.router.navigate(['/events', eventId, 'budgeting']);
  }


  toggleFavorites(): void {
    if (!this.eventDetails.favorite) {
      this.profileService.addEventToFavorites(this.id).subscribe({
        next: () => {
          this.eventDetails.favorite = true;
        },
        error: () => {
          console.log('Error adding solution to favorites');
        }
      });
    } else {
      this.profileService.removeEventFromFavorites(this.id).subscribe({
        next: () => {
          this.eventDetails.favorite = false;
        },
        error: () => {
          console.log('Error removing event from favorites');
        }
      });
    }
  }



  getGuestList(): void {
    this.eventService.getGuestList(this.id).subscribe({
      next: (guestList: SimpleAccountDTO[]) => {
        const doc = new jsPDF();
        const event = this.eventDetails;
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 20;

// Header bar
        doc.setFillColor(41, 128, 185);
        doc.rect(0, 0, pageWidth, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text('Guest List', pageWidth / 2, 16, { align: 'center' });

        y = 35;

// Event Info Card
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(12, y, pageWidth - 24, 45, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(13);
        doc.text(`Event: ${event.name}`, 16, y + 8);

        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        const descriptionLines = doc.splitTextToSize(event.description, pageWidth - 32);
        doc.text('Description:', 16, y + 16);
        doc.text(descriptionLines, 16, y + 23);

        y += 23 + descriptionLines.length * 6;
        doc.text(`Date & Time: ${new Date(event.time).toLocaleString()}`, 16, y);
        y += 7;
        doc.text(`Location: ${event.location.address}, ${event.location.city}`, 16, y);
        y += 15;

// Attendees Section Header
        doc.setFontSize(14);
        doc.setTextColor(41, 128, 185);
        doc.text('Attendees', 14, y);
        y += 5;

// Draw line under attendees title
        doc.setDrawColor(200);
        doc.line(14, y, pageWidth - 14, y);
        y += 5;

// Constants
        const imgSize = 15;
        const spacing = imgSize + 10;
        const marginBottom = 20;

        const renderGuest = (guest: SimpleAccountDTO, yPos: number, callback: () => void) => {
          const { name, surname, profilePicture } = guest.person;

          // Guest card background
          doc.setFillColor(248, 248, 248);
          doc.roundedRect(12, yPos - 3, pageWidth - 24, spacing, 3, 3, 'F');

          if (profilePicture) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = profilePicture;

            img.onload = () => {
              doc.addImage(img, 'JPEG', 16, yPos, imgSize, imgSize);
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(11);
              doc.text(`${name} ${surname}`, 16 + imgSize + 6, yPos + imgSize * 0.7);
              callback();
            };

            img.onerror = () => {
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(11);
              doc.text(`${name} ${surname}`, 16, yPos + imgSize * 0.7);
              callback();
            };
          } else {
            // No image – draw initials circle
            doc.setFillColor(41, 128, 185);
            doc.circle(22, yPos + imgSize / 2, imgSize / 2, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.text(`${name[0]}${surname[0]}`, 22, yPos + imgSize / 2 + 2.5, { align: 'center' });

            // Name
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.text(`${name} ${surname}`, 16 + imgSize + 6, yPos + imgSize * 0.7);
            callback();
          }
        };

        const renderGuestsSequentially = (index: number) => {
          if (index >= guestList.length) {
            doc.save(`${event.name}_Guest_List.pdf`);
            return;
          }

          if (y + spacing > doc.internal.pageSize.getHeight() - marginBottom) {
            doc.addPage();
            y = 20;
          }

          renderGuest(guestList[index], y, () => {
            y += spacing + 4;
            renderGuestsSequentially(index + 1);
          });
        };

        if (guestList.length === 0) {
          doc.setFontSize(12);
          doc.setTextColor(100);
          doc.text('No guests found.', 14, y);
          doc.save(`${event.name}_Guest_List.pdf`);
        } else {
          renderGuestsSequentially(0);
        }

      },
      error: () => {
        console.error('Failed to fetch guest list');
      }
    });
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

  protected showChat: boolean = false;
  chatWithUs(): void {
    this.showChat = !this.showChat;
  }


  openInviteModal() {
    const dialogRef: MatDialogRef<InvitePeopleComponent> = this.dialog.open(InvitePeopleComponent, {
      minWidth: '70vw',
      maxWidth: '70vw',
      minHeight: '70vh',
      maxHeight: '70vh',
      data: { id: this.id },
    });
  }
}
