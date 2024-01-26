import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: string = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    //@todo
    this.route.queryParamMap.subscribe(params=> {
      const userName = params.get('userName');
      if(userName){
        this.form.controls.userName.setValue(userName);
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { userName, password } = this.form.getRawValue();
      this.authService.login(userName, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.status = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
