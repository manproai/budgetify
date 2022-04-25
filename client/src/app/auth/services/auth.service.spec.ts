import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpService', ['post']);
    service = new AuthService(httpClientSpy);
  });

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSesstion should be called on success', (done: DoneFn) => {
    spyOn(service as any, 'setSesstion');
    const expectEdResult = {
      idToken: 'idToken',
      expiresIn: 10000,
    };

    httpClientSpy.post.and.returnValue(of(expectEdResult));
    service.login('admin1@gmail.com', '12345678').subscribe(() => {
      expect((service as any).setSesstion).toHaveBeenCalledOnceWith(
        expectEdResult
      );
      done();
    });
  });

  it('Error', (done: DoneFn) => {
    spyOn(service as any, 'setSesstion');

    httpClientSpy.post.and.returnValue(throwError(() => '401'));
    service.login('wrong@gmail.com', '689464361').subscribe({
      error: (err) => {
        expect((service as any).setSesstion).not.toHaveBeenCalled();
        expect(err).toBe('401');
        done();
      },
    });
  });
});
