import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListComponent } from './car-list.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default sort direction as ASC', () => {
    expect(component.sortDirectionSignal()).toBe('ASC');
  });

  it('should toggle sort direction and update query params when sortByPrice is called', () => {
    const router: Router = (component as unknown as { _router: Router })
      ._router;
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();
    const initialDirection = component.sortDirectionSignal();

    component.sortByPrice();

    expect(component.sortDirectionSignal()).toBe(
      initialDirection === 'ASC' ? 'DESC' : 'ASC',
    );
    expect(navigateSpy).toHaveBeenCalledWith(
      [],
      jasmine.objectContaining({
        relativeTo: jasmine.anything(),
        queryParams: jasmine.objectContaining({
          sortPrice: component.sortDirectionSignal(),
        }),
        queryParamsHandling: 'merge',
      }),
    );
  });
});
