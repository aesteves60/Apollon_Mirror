import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { AlertService } from '../shared/alert/alert.service';
import { ModalComponent } from '../component/modal/modal.component';
import { ModuleService } from '../modules/module.service';
import { SocketService } from '../core/socket.service';
import { Event } from '../core/event';

@Component({
    selector: 'app-personalize', templateUrl: './personalize.component.html', styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

    public ItemMirror_TopLeft = [{ name: 'Vide', image: '', views_position: 'top_left' }];
    public ItemMirror_TopRight = [{ name: 'Vide', image: '', views_position: 'top_right' }];
    public ItemMirror_Left = [{ name: 'Vide', image: '', views_position: 'left' }];
    public ItemMirror_Right = [{ name: 'Vide', image: '', views_position: 'right' }];
    public ItemMirror_BottomLeft = [{ name: 'Vide', image: '', views_position: 'bottom_left' }];
    public ItemMirror_BottomCenterLeft = [{ name: 'Vide', image: '', views_position: 'bottom_center_left' }];
    public ItemMirror_BottomCenterRight = [{ name: 'Vide', image: '', views_position: 'bottom_center_right' }];
    public ItemMirror_BottomRight = [{ name: 'Vide', image: '', views_position: 'bottom_right' }];
    modules = {};
    private HTTP_MIDDLRWARE = 'http://' + document.location.hostname + ':8082';

    constructor(private http: HttpClient,
        private alertService: AlertService,
        private moduleService: ModuleService,
        public dialog: MatDialog,
        private socketService: SocketService) { }

    ngOnInit() {
        this.get_Modules();
        this.get_Views();
        // this.socketService.initSocket ();
    }

    openDialog(module): void {
        this.dialog.open(ModalComponent, {
            width: '300px', data: { name: module.name }
        });
    }

    public get_Modules() {
        this.moduleService.getModules().subscribe((res) => this.modules = res);
    }

    public get_Views() {
        this.moduleService.getViews().subscribe((res) => {
            this.ChangeValue(this.ItemMirror_TopLeft, res[0], 1);
            this.ChangeValue(this.ItemMirror_TopRight, res[1], 1);
            this.ChangeValue(this.ItemMirror_Left, res[2], 1);
            this.ChangeValue(this.ItemMirror_Right, res[3], 1);
            this.ChangeValue(this.ItemMirror_BottomLeft, res[4], 1);
            this.ChangeValue(this.ItemMirror_BottomRight, res[5], 1);
            this.ChangeValue(this.ItemMirror_BottomCenterLeft, res[6], 1);
            this.ChangeValue(this.ItemMirror_BottomCenterRight, res[7], 1);
        });
    }

    public onElementDrop(e) {
        const _itemMirror = this.FindZoneMirror(e.nativeEvent.target.id || e.nativeEvent.target.parentElement.parentElement.id);
        this.moduleService.ChangePosition(_itemMirror[0].views_position, e.dragData.id).subscribe((res) => {
            e.dragData.views_position = res;  // egal à _itemMirror[0].views_position
            this.ChangeValue(_itemMirror, e.dragData);
            return this.alertService.success('Modification réussie.');
        });
    }

    public remoteElement(e) {
        const itemMirror = this.FindZoneMirror(e.target.parentElement.parentElement.parentElement.id);
        this.moduleService.RemoteElement(itemMirror[0].views_position).subscribe((res) => {
            this.ChangeValue(itemMirror, null);
            this.alertService.success('Modification réussie.');
        });
    }

    private ChangeValue(itemMirror, value, init = 0) {
        if (value === null) {
            value = { name: 'Vide', image: '', views_position: itemMirror[0].views_position };
        }
        itemMirror.pop();
        itemMirror.push(value);

        if (init === 0) {
            this.http.get(this.HTTP_MIDDLRWARE + '/' + Event.MIRROR_CHANGE).subscribe(res => res);
        }
    }

    private FindZoneMirror(mirrorPosition) {
        switch (mirrorPosition) {
            case 'top_left':
                return this.ItemMirror_TopLeft;
            case 'top_right':
                return this.ItemMirror_TopRight;
            case 'right':
                return this.ItemMirror_Right;
            case 'left':
                return this.ItemMirror_Left;
            case 'bottom_center_left':
                return this.ItemMirror_BottomCenterLeft;
            case 'bottom_center_right':
                return this.ItemMirror_BottomCenterRight;
            case 'bottom_right':
                return this.ItemMirror_BottomRight;
            case 'bottom_left':
                return this.ItemMirror_BottomLeft;
        }
    }
}
