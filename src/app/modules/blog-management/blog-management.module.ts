import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogManagementComponent } from './blog-management.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { RouterOutlet } from '@angular/router';
import { BlogManagementRoutingModule } from './blog-management-routing.module';
import { AntdModule } from '../antd.module';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgModule } from '../../components/svg/svg.module';
import { CdkDrag, CdkDragPreview, CdkDropList, CdkDragHandle } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BlogManagementComponent,
    BlogListComponent,
    BlogDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    AntdModule,
    BlogManagementRoutingModule,
    SvgModule,
    CdkDropList, CdkDrag, CdkDragPreview, CdkDragHandle
  ]
})
export class BlogManagementModule { }
