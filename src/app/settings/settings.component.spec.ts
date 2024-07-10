import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  const validAuthFormObj = { clientId: 'testId', clientSecret: 'testSecret' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid when empty', () => {
    expect(component.authForm.valid).toBeFalsy();
  });

  it('should have the clientId field required', () => {
    const control = component.authForm.get('clientId');
    control!.setValue('');
    expect(control!.hasError('required')).toBeTruthy();
  });

  it('should have the clientSecret field required', () => {
    const control = component.authForm.get('clientSecret');
    control!.setValue('');
    expect(control!.hasError('required')).toBeTruthy();
  });

  it('should have the form valid when fields are filled correctly', () => {
    component.authForm.setValue(validAuthFormObj);
    expect(component.authForm.valid).toBeTruthy();
  });

  it('should call onAuthSubmit when form is valid and submit clicked', fakeAsync(() => {
    spyOn(component, 'onAuthSubmit');

    component.authForm.setValue(validAuthFormObj);
    fixture.detectChanges();

    let submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    tick();

    expect(component.onAuthSubmit).toHaveBeenCalled();
  }));
});
