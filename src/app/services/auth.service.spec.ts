import { TestBed, inject } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "@services/auth.service";
import {TokenService} from "@services/token.service";
import { ResponseLogin } from '@models/auth.model';

describe('Prueba de Auth service', () => {
  describe('AuthService',() =>{
    let authService: AuthService;
    let httpTestingController: HttpTestingController;
    let tokenServiceSpy: jasmine.SpyObj<TokenService>;

    beforeEach(() => {
      const spy = jasmine.createSpyObj('TokenService',['saveToken']);

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers:[
          AuthService,
          { provide: TokenService, useValue: spy }
        ],
      });

      // Obtén la instancia del servicio y del controlador de pruebas HTTP
      authService = TestBed.inject(AuthService);
      httpTestingController = TestBed.inject(HttpTestingController);
      tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    });

    afterEach(() => {
      // Verifica que no haya solicitudes pendientes después de cada prueba
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(authService).toBeTruthy();
    });

    it('should log in a user and save token', () => {
      const dummyResponse  = {
        "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZXJuYW4iLCJpYXQiOjE3MDY1NDgxNDcsImV4cCI6MTcwNjU4NDE0N30.WfHjXATitg1e8tgNgGlnTt9yI6bgsa1IoDJeYBp2DbE",
        "user": {
          "userId": 1,
          "userName": "hernan",
          "status": "A",
          "name": "Hernan Inga"
        }
      };
      const dummyUsername = 'testUser';
      const dummyPassword = 'testPassword';

      // Llama al método login
      authService.login(dummyUsername, dummyPassword).subscribe(response => {
        // expect(response).toEqual(dummyResponse);
        expect(tokenServiceSpy.saveToken).toHaveBeenCalledWith(dummyResponse.jwt);
      });

      // Espera la solicitud HTTP y responde con datos de prueba
      const req = httpTestingController.expectOne(`${authService.apiUrl}/api/usuarios/authenticate`);
      expect(req.request.method).toEqual('POST');
      req.flush(dummyResponse);
    });

  });
});
