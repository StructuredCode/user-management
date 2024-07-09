import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let submitButton: DebugElement;
  const validAuthFormObj = { clientId: 'testId', clientSecret: 'testSecret' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButton = fixture.debugElement.nativeElement.querySelector("button[type='submit']");
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

  it('should call onSubmit when form is valid and submitted', () => {
    spyOn(component, 'onAuthSubmit');

    component.authForm.setValue(validAuthFormObj);
    submitButton.nativeElement.click();

    expect(component.onAuthSubmit()).toHaveBeenCalled();
  });
});
