import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastTasksPage } from './past-tasks.page';

describe('PastTasksPage', () => {
  let component: PastTasksPage;
  let fixture: ComponentFixture<PastTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
