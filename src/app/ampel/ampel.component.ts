import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { LampeComponent } from '../lampe/lampe.component';

@Component({
  selector: 'app-ampel',
  templateUrl: './ampel.component.html',
  styleUrls: ['./ampel.component.scss']
})
export class AmpelComponent {

  /**
   * Status der Ampel
   */
  private status = 0;

  /**
   * Handel für den Automode-Interval, für eine spätere Deaktivierung
   */
  private automodeIntervalHandle: number;

  /**
   * Automatischer Modus, wenn aktiviert werden Tick's automatisch ausgelöst,
   * Lampen selbstständig repariert und die dazugehörigen Schaltflächen gewechselt.
   *
   * Interval wird beim Aktivieren des Automode gesetzt und das Handle (vom Typ number) in einer
   * Instanzvariable gespeichert, beim Deaktivieren des Automodes wird dieser Interval wieder deaktiviert.
   * Dieser Schritt ist notwendig, da das Attribute während des Betriebs der Ampel geändert werden könnte.
   */
  private _automode = false;
  @Input()
  set automode(v: boolean) {
    this._automode = v;
    if (this._automode) {

      // Automode aktivieren
      this.automodeIntervalHandle = window.setInterval(() => this.tick(), 1000); // jede Sekunde ein Tick auslösen
    } else {

      // Automode deaktivieren (Interval Timer löschen)
      window.clearInterval(this.automodeIntervalHandle);
    }
  }
  get automode(): boolean {
    return this._automode;
  }


  /**
   * Status der einzelnen Lampen
   */
  lampeRotEin = false;
  lampeOrangeEin = false;
  lampeGruenEin = false;

  /**
   * Gibt an ob eine Lampe defekt ist
   */
  lampeDefekt = false;

  /**
   * Instanzen der Lampen-Components laden
   */
  @ViewChildren(LampeComponent) lampenComponents: QueryList<LampeComponent>;

  /**
   * Schaltet die Ampel einen Status weiter
   */
  tick(): void {
    this.status++; // Status um 1 erhöhen
    if (this.status > 4) { // Wenn der Status über 4 kommt...
      this.status = 1; // ... wieder auf 1 zurücksetzen
    }

    // Lampen anhand des Status ein- oder ausschalten
    switch (this.status) {
      case 0: // Ampel aus
        this.lampeRotEin = false;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = false;
        break;

      case 1: // rot
        this.lampeRotEin = true;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = false;
        break;

      case 2: // grün kommt
        this.lampeRotEin = true;
        this.lampeOrangeEin = true;
        this.lampeGruenEin = false;
        break;

      case 3: // grün
        this.lampeRotEin = false;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = true;
        break;

      case 4: // rot kommt
        this.lampeRotEin = false;
        this.lampeOrangeEin = true;
        this.lampeGruenEin = false;
        break;
    }
  }

  /**
   * Wir ausgeführt wenn ein "gingDefekt"-Event einer Lampe gefeuert wurde
   */
  lampeMeldetDefekt(): void {
    this.lampeDefekt = true;

    // bei Automode die Lampen automatisch reparieren
    if (this.automode) {
      this.repariereAlleLampen();
    }
  }

  /**
   * Alle Lampen werden repariert
   */
  repariereAlleLampen(): void {

    // Alle Instanzen der LampeComponent sind in this.lampenComponents. Dank @ViewChildren hat Angular diese
    // bereits geladen. Da es sich im mehr als eine Component handelt wurde uns eine QueryList zurückgegeben.
    // Die QueryList beinhaltet ein Array in dem sich die Referenzen auf unsere Components befinden.
    // Der Methode "forEach" kann eine Funktion übergeben werden (in unserem Fall in Form eine Lambda Expression),
    // diese Methode wird in unserem 3x aufgerufen und jedes Mal eine weitere der 3 Components übergeben.
    this.lampenComponents.forEach(lampeComponent => {
      lampeComponent.reparieren();
    });
    this.lampeDefekt = false; // Alle Lampen sind repariert, das "defekt"-Flag kann wieder entfernt werden
  }

}
