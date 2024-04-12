import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HideDirective } from './hide.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
		HideDirective
  ]
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
	@ViewChild('drawer') matDrawer: ElementRef<MatDrawer>;

	constructor() {
		this.matDrawer = inject(ElementRef);
	}
  // ERROR: We need to hide under the Handset breakpoint

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 599.98px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
			tap((result) => {
				if (result)
					this.matDrawer.nativeElement.toggle();
			})
    );
}
