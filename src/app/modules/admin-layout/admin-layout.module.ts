import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AntdModule } from '../antd.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BlogManagementModule } from '../blog-management/blog-management.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AdminRoutingModule,
    AntdModule,
    // NzIconModule, NzLayoutModule, NzMenuModule,

    BlogManagementModule
  ]
})
export class AdminLayoutModule { }
