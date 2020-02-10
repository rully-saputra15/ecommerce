import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeranjangPage } from './keranjang.page';

describe('KeranjangPage', () => {
  let component: KeranjangPage;
  let fixture: ComponentFixture<KeranjangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeranjangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeranjangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
