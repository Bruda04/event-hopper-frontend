import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../../profile/profile.service';

@Component({
  selector: 'app-congradulation',
  templateUrl: './congradulation.component.html',
  styleUrl: './congradulation.component.css'
})
export class CongradulationComponent {

  constructor(
    private dialogRef: MatDialogRef<CongradulationComponent>,
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onOk(): void { // Funkcija za odjavu
    // Implementacija logout logike

    this.userService.clearToken();
    this.router.navigate(['/login']); // Preusmeravanje na login stranicu
    this.dialogRef.close(); // Zatvaranje modala
    this.cdr.detectChanges(); // Ručno osvežavanje prikaza
  }
}
