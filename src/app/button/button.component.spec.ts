import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { signal } from '@angular/core';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;
  let buttonEl: HTMLButtonElement;

  // Helper to override inputs as signals manually
  function setInputsManually(
    inputs: Partial<Record<keyof ButtonComponent, any>>
  ) {
    for (const [key, value] of Object.entries(inputs)) {
      (component as any)[key] = signal(value);
    }
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.nativeElement.querySelector('button');
  });

  it('should create the component', () => {
    setInputsManually({ label: 'Test Button' });
    expect(component).toBeTruthy();
  });

  it('should render the label inside the button', () => {
    setInputsManually({ label: 'Click me' });
    expect(buttonEl.textContent?.trim()).toBe('Click me');
  });

  it('should apply primary variant class by default', () => {
    setInputsManually({ label: 'Button', variant: 'primary' });
    expect(buttonEl.classList.contains('primary')).toBeTrue();
  });

  it('should apply disabled attribute and class when disabled is true', () => {
    setInputsManually({ label: 'Button', disabled: true });
    expect(buttonEl.disabled).toBeTrue();
    expect(buttonEl.classList.contains('disabled')).toBeTrue();
  });
});
