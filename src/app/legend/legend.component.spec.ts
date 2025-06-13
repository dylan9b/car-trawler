import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendComponent } from './legend.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isMobileSignal defined', () => {
    expect(component.isMobileSignal).toBeDefined();
  });

  it('should have dateDetailsSignal defined', () => {
    expect(component.dateDetailsSignal).toBeDefined();
  });
});
