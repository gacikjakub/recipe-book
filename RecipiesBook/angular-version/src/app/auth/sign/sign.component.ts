import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit, OnDestroy {
  action = '';
  error = '';
  private actionSubscription: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.actionSubscription = this.route.data.subscribe(data => this.action = data.action);
  }

  ngOnDestroy(): void {
    this.actionSubscription.unsubscribe();
  }

  onSign(form: NgForm) {
    const {email = '', password = ''} = {...form.value};
    this.authService[this.action](email, password)
      .then(response => this.router.navigate(['/']))
      .catch(error => this.error = error);
  }
}
