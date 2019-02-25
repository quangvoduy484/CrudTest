import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Major, MajorService } from '../../services/major.service';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent implements OnInit {
  modalRef: BsModalRef;
  majors: Major[] = [];
  major: Major = {} as Major;

  // viết thường là phương thức sau đó viết hoa 

  // viết hoa là đối tượng
  //binding reference 
  @ViewChild('Modal') modal: ModalDirective;
  constructor(private majorService: MajorService) { }

  ngOnInit() {
   this.loadData();
  }

  loadData() {
    this.majorService.getAll().subscribe(result => {
      this.majors = result.majors;
    });
  }
  save() {
  
    if(this.major.id === undefined && this.major.id === 0)
    {
        this.majorService.add(this.major).subscribe(result => {
        this.modal.hide();
        this.loadData();
     
      });
    }
    else{
          this.majorService.update(this.major).subscribe(result => {
          this.modal.hide();
          this.loadData();

        });
    }
  }

  show(event = null, id: Number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
       this.majorService.get(id).subscribe(data => {
        this.major = data.major;
        this.modal.show();
      });
    }
    else {
      this.major = {} as Major;
      this.modal.show();
    }


    this.modal.show();

  }

  delete(event, id)
  {
    if( event)
    {
      event.preventDefault();
      this.majorService.delete(id).subscribe(data => {
          if(data.errorCode === 0)
          {
                const de = this.majors.find(x => x.id === id)
                if(de)
                {
                  const index = this.majors.indexOf(de);
                  this.majors.splice(index, 1);
                }
          }

      });
    }
  }

}
