import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from "../_tools/alert.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  public ItemMirrorUpLeft     = [{name: 'Vide', image : ''}];
  public ItemMirrorUpRight    = [{name: 'Vide', image : ''}];
  public ItemMirrorLeft       = [{name: 'Vide', image : ''}];
  public ItemMirrorRight      = [{name: 'Vide', image : ''}];
  public ItemMirrorDownLeft   = [{name: 'Vide', image : ''}];
  public ItemMirrorDown1      = [{name: 'Vide', image : ''}];
  public ItemMirrorDown2      = [{name: 'Vide', image : ''}];
  public ItemMirrorDownRight  = [{name: 'Vide', image : ''}];
  public center               = [{name: '', image : ''}];
  public modules = {};

  constructor(private http: HttpClient, private alertService : AlertService) {

  }

  ngOnInit() {
    this.get_Modules();
  }

  public get_Modules(){
    this.http.get('/API/get_modules').subscribe(res => this.modules = res);
  }

  public onElemetDrop(e) {
    let _itemMirror = this.FindZoneMirror(e.nativeEvent.target.parentElement.id);
    _itemMirror.pop();
    _itemMirror.push(e.dragData);
  }

  public remoteElement(e){
    let _itemMirror = this.FindZoneMirror(e.target.parentElement.parentElement.id);
    _itemMirror.pop();
    _itemMirror.push({name :'Vide', image : ''});
  }

  private FindZoneMirror(mirrorZone){
    switch (mirrorZone){
      case 'MirrorUpLeft': return this.ItemMirrorUpLeft;
      case 'MirrorUpRight': return this.ItemMirrorUpRight;
      case 'MirrorRight': return this.ItemMirrorRight;
      case 'center' : this.alertService.error('Vous ne pouvez pas mettre un module ici'); return this.center;
      case 'MirrorLeft': return this.ItemMirrorLeft;
      case 'MirrorDown1': return this.ItemMirrorDown1;
      case 'MirrorDown2': return this.ItemMirrorDown2;
      case 'MirrorDownRight': return this.ItemMirrorDownRight;
      case 'MirrorDownLeft': return this.ItemMirrorDownLeft;
    }
  }

}
