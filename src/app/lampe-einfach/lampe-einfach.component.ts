import { Component } from '@angular/core';

/**
 * Mögliche Minimallösung der Lampe (ohne Zusatzaufgaben)
 */
@Component({
  selector: 'app-lampe-einfach',
  templateUrl: './lampe-einfach.component.html'
})
export class LampeEinfachComponent {

  /**
   * Eigenschaft die angibt ob die Lampe brennt
   */
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
