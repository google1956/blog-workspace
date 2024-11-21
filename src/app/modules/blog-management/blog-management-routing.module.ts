import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogManagementComponent } from '../blog-management/blog-management.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';

const routes: Routes = [
    {
        path: '',
        component: BlogManagementComponent,
        children: [
            { path: '', component: BlogListComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogManagementRoutingModule { }
