import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotifikasiPage } from './notifikasi.page';

describe('NotifikasiPage', () => {
  let component: NotifikasiPage;
  let fixture: ComponentFixture<NotifikasiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifikasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifikasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
