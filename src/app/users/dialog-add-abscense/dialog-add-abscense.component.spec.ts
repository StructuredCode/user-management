import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAbsenceComponent } from './dialog-add-absence.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddAbscenseComponent', () => {
  let component: DialogAddAbsenceComponent;
  let fixture: ComponentFixture<DialogAddAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddAbsenceComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
