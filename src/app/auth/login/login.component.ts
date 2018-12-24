import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = null;
  errorMessageSubscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.errorMessageSubscription = this.auth.getErrorMessageListener().subscribe(
      (message: string) => {
        this.errorMessage = message;
      }
    );
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {

      return false;
    }
    this.auth.login(f.value.email, f.value.password);
  }
  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }

}
