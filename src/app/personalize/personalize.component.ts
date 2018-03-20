import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../_tools/alert/alert.service';
import 'rxjs/add/operator/map';
import { SERIAL_NUMBER } from '../../assets/config';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  public ItemMirror_TopLeft            = [{name: 'Vide', image : '', views_position : 'top_left' }];
  public ItemMirror_TopRight           = [{name: 'Vide', image : '', views_position : 'top_right' }];
  public ItemMirror_Left               = [{name: 'Vide', image : '', views_position : 'left' }];
  public ItemMirror_Right              = [{name: 'Vide', image : '', views_position : 'right' }];
  public ItemMirror_BottomLeft         = [{name: 'Vide', image : '', views_position : 'bottom_left' }];
  public ItemMirror_BottomCenterLeft   = [{name: 'Vide', image : '', views_position : 'bottom_right' }];
  public ItemMirror_BottomCenterRight  = [{name: 'Vide', image : '', views_position : 'bottom_center_left' }];
  public ItemMirror_BottomRight        = [{name: 'Vide', image : '', views_position : 'bottom_center_right' }];
  public modules = {};
  public views   = {};
  public html = '';


  constructor(private http: HttpClient, private alertService: AlertService,
              private modal: MatDialog) {
  }

  ngOnInit() {
    this.get_Modules();
    this.get_Views();
  }

  public get_Modules() {
    this.http.get('/API/get_modules').subscribe(res => {
      this.modules = res;
      console.log(this.modules);
      return this.modules = res;
    });
  }

  public get_Views() {
        const options = { params: {
            'serial_number': SERIAL_NUMBER
          }
        };
        this.http.get('/API/get_views_mirror', options).subscribe(res => {
          this.views = res;
          PersonalizeComponent.changeValue(this.ItemMirror_TopLeft, this.views[0]);
          PersonalizeComponent.changeValue(this.ItemMirror_TopRight, this.views[1]);
          PersonalizeComponent.changeValue(this.ItemMirror_Left, this.views[2]);
          PersonalizeComponent.changeValue(this.ItemMirror_Right, this.views[3]);
          PersonalizeComponent.changeValue(this.ItemMirror_BottomLeft, this.views[4]);
          PersonalizeComponent.changeValue(this.ItemMirror_BottomRight, this.views[5]);
          PersonalizeComponent.changeValue(this.ItemMirror_BottomCenterLeft, this.views[6]);
          PersonalizeComponent.changeValue(this.ItemMirror_BottomCenterRight, this.views[7]);
        });
  }

  public onElementDrop(e) {
    let _itemMirror = this.FindZoneMirror(e.nativeEvent.target.parentElement.id);
    e.dragData.views_position = e.nativeEvent.target.parentElement.id;
    const views_position = e.nativeEvent.target.parentElement.id;
    const options = {
      params: {
        'views_position': views_position,
        'serial_number': SERIAL_NUMBER,
        'module_id' : e.dragData.id
      }
    };
    this.http.post('/API/change_position', options).subscribe(res => PersonalizeComponent.changeValue(_itemMirror, e.dragData));
    this.alertService.success('Modification reussi');
  }

  public remoteElement(e){
    const _itemMirror = this.FindZoneMirror(e.target.parentElement.parentElement.id);
    this.alertService.success('Modification reussi');
    const options = {
      params: {
        'views_position': e.target.parentElement.parentElement.id,
        'serial_number': SERIAL_NUMBER
      }
    };
    this.http.delete('/API/remove_position', options).subscribe(res => { PersonalizeComponent.changeValue(_itemMirror, null); });
  }

  private static changeValue(_itemMirror, value){
    if (value === null ){
      value = {name : 'Vide', image : '', views_position : _itemMirror.views_position };
    }
    _itemMirror.pop();
    _itemMirror.push(value);
  }

  private FindZoneMirror(mirrorPosition){
    switch (mirrorPosition){
      case 'top_left': return this.ItemMirror_TopLeft;
      case 'top_right': return this.ItemMirror_TopRight;
      case 'right': return this.ItemMirror_Right;
      case 'left': return this.ItemMirror_Left;
      case 'bottom_center_left': return this.ItemMirror_BottomCenterLeft;
      case 'bottom_center_right': return this.ItemMirror_BottomCenterRight;
      case 'bottom_right': return this.ItemMirror_BottomRight;
      case 'Bottom_left': return this.ItemMirror_BottomLeft;
    }
  }

}
