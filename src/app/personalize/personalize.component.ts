import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { AlertService } from '../shared/alert/alert.service';
import { ModalComponent } from '../component/modal/modal.component';
import { ModuleService } from '../modules/module.service';
import { SocketService } from '../core/socket.service';
import { Module } from '../modules/module';

@Component({
    selector: 'app-personalize',
    templateUrl: './personalize.component.html',
    styleUrls: ['./personalize.component.css'
]
})
export class PersonalizeComponent implements OnInit {

    public ItemMirror_TopLeft: Module[] = [{id: 0, name: 'Vide', image: '', views_position: 'top_left' }];
    public ItemMirror_TopRight: Module[] = [{id: 1, name: 'Vide', image: '', views_position: 'top_right' }];
    public ItemMirror_Left: Module[] = [{id: 2, name: 'Vide', image: '', views_position: 'left' }];
    public ItemMirror_Right: Module[] = [{id: 3, name: 'Vide', image: '', views_position: 'right' }];
    public ItemMirror_BottomLeft: Module[] = [{id: 4, name: 'Vide', image: '', views_position: 'bottom_left' }];
    public ItemMirror_BottomCenterLeft: Module[] = [{id: 5, name: 'Vide', image: '', views_position: 'bottom_center_left' }];
    public ItemMirror_BottomCenterRight: Module[] = [{id: 6, name: 'Vide', image: '', views_position: 'bottom_center_right' }];
    public ItemMirror_BottomRight: Module[] = [{id: 7, name: 'Vide', image: '', views_position: 'bottom_right' }];
    modules = {};
    private HTTP_MIDDLRWARE = 'http://' + document.location.hostname + ':8082';

    constructor(private http: HttpClient,
        private alertService: AlertService,
        private moduleService: ModuleService,
        public dialog: MatDialog,
        private socketService: SocketService) { }

    async ngOnInit(): Promise<void> {
        this.modules = await this.moduleService.getModules().toPromise();
        this.get_Views();
        // this.socketService.initSocket ();
    }

    openDialog(module: Module): void {
        this.dialog.open(ModalComponent, {
            width: '300px', data: { name: module.name }
        });
    }

    public get_Views(): void {
        this.moduleService.getViews().subscribe((res) => {
            this.changeValue(this.ItemMirror_TopLeft, res[0], 1);
            this.changeValue(this.ItemMirror_TopRight, res[1], 1);
            this.changeValue(this.ItemMirror_Left, res[2], 1);
            this.changeValue(this.ItemMirror_Right, res[3], 1);
            this.changeValue(this.ItemMirror_BottomLeft, res[4], 1);
            this.changeValue(this.ItemMirror_BottomRight, res[5], 1);
            this.changeValue(this.ItemMirror_BottomCenterLeft, res[6], 1);
            this.changeValue(this.ItemMirror_BottomCenterRight, res[7], 1);
        });
    }

    public onElementDrop(event): void {
        const itemMirror = this.findZoneMirror(event.nativeEvent.target.id || event.nativeEvent.target.parentElement.parentElement.id);
        this.moduleService.changePosition(itemMirror[0].views_position, event.dragData.id).subscribe((res) => {
            event.dragData.views_position = res;  // egal à _itemMirror[0].views_position
            this.changeValue(itemMirror, event.dragData);
            return this.alertService.success('Modification réussie.');
        });
    }

    public remoteElement(event): void {
        const itemMirror = this.findZoneMirror(event.target.parentElement.parentElement.parentElement.id);
        this.moduleService.remoteElement(itemMirror[0].views_position).subscribe((res) => {
            this.changeValue(itemMirror, null);
            this.alertService.success('Modification réussie.');
        });
    }

    private changeValue(itemMirror: Module[], value: Module, init = 0): void {
        if (value === null) {
            value = { id: itemMirror[0].id, name: 'Vide', image: '', views_position: itemMirror[0].views_position };
        }
        itemMirror.pop();
        itemMirror.push(value);

        if (init === 0) {
            // this.http.get(this.HTTP_MIDDLRWARE + '/' + Event.MIRROR_CHANGE).subscribe(res => res);
        }
    }

    private findZoneMirror(mirrorPosition: string): Module[] {
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
