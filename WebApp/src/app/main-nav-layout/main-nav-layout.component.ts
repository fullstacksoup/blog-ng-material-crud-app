import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'main-nav-layout',
  templateUrl: './main-nav-layout.component.html',
  styleUrls: ['./main-nav-layout.component.scss']
})
export class MainNavLayoutComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  public loading: boolean;
  public isAuthenticated: boolean;
  public title: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public isBypass: boolean;
  public mobile: boolean;
  public isMenuInitOpen: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private _snackBar: MatSnackBar) { }

    private sidenav: MatSidenav;

    public isMenuOpen = true;
    public contentMargin = 240;

    get isHandset(): boolean {
      return this.breakpointObserver.isMatched(Breakpoints.Handset);
    }

    ngOnInit() {
      this.isMenuOpen = true;  // Open side menu by default
      this.title = 'Material Layout Demo';
    }

    ngDoCheck() {
        if (this.isHandset) {
          this.isMenuOpen = false;
        } else {
          this.isMenuOpen = true;
        }
    }

}
