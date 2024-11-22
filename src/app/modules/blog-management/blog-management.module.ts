import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogManagementComponent } from './blog-management.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { RouterOutlet } from '@angular/router';
import { BlogManagementRoutingModule } from './blog-management-routing.module';
import { AntdModule } from '../antd.module';

@NgModule({
  declarations: [
    BlogManagementComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AntdModule,
    BlogManagementRoutingModule,
  ]
})
export class BlogManagementModule { }
