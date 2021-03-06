/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { SharedModule } from '../../shared.module';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let titleDe: DebugElement;
  let titleEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [ ClarityModule ]
    })
    .compileComponents();

    SharedModule.configureIcons();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleDe = fixture.debugElement.query(By.css('.title'));
    titleEl = titleDe.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain('GitHub');
  });
});
