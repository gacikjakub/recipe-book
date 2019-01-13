import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authenticationSubscription: Subscription;

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticationSubscription = this.authService.authenticationChange
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  ngOnDestroy(): void {
    this.authenticationSubscription.unsubscribe();
  }

  saveData() {
    this.dataStorage.saveData();
  }

  fetchData() {
    this.dataStorage.fetchData();
  }

  logout() {
    this.authService.logout();
  }

}
