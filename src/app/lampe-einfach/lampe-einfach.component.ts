import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lampe-einfach',
  templateUrl: './lampe-einfach.component.html',
  styleUrls: ['./lampe-einfach.component.scss']
})
export class LampeEinfachComponent {

  /**
   * Eigenschaft die angibt ob die Lampe brennt
   */
  @Input() // @Input ermöglicht, dass der Wert von der übergeordneten Component gesetzt werden kann (Property Binding)
  lampeBrennt = false;

  /**
   * Eigenschaft die angibt welche Farbe der Kreis gerade hat
   */
  kreisFarbe = 'black';

  /**
   * Methode die aufgerufen wird, wenn der Lichtschalter gedrückt wird
   */
  lichtschalterGedrueckt(): void {
    this.lampeBrennt = !this.lampeBrennt; // Status wird "umgedreht", false wird zu true und umgekehrt

    if (this.lampeBrennt) { // Wenn die Lampe brennt... (this.lampeBrennt == true)
      this.kreisFarbe = 'yellow'; // ... dann soll der Kreis gelb sein
    } else {
      this.kreisFarbe = 'black'; // ... sonst soll der Kreis schwarz sein
    }
  }

}
