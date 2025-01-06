import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { ResourceServerService } from '../services/resource-server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiServerService } from '../services/api-server.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  message = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    private resourceServer: ResourceServerService,
    private apiService: ApiServerService) {}

  onClickWelcomeAjax1() {
    console.trace('onClickResourceServerAjax1');
    const url = environment.apiUrl1 + "/api/message/welcome";
    this.resourceServer.getText(url).subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }
  onClickWelcomeAjax2() {
    console.trace('onClickResourceServerAjax2');
    const url = environment.apiUrl2 + "/api/message/welcome";
    this.resourceServer.getText(url).subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }

  onClickWelcomeProxy1() {
    console.trace('onClickServerProxy1');
    this.apiService.getText("api/message/welcome1").subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }

  onClickWelcomeProxy2() {
    console.trace('onClickServerProxy2');
    this.apiService.getText("api/message/welcome2").subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }

}
