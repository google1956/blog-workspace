import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogManagementComponent } from '../blog-management/blog-management.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { BlogManagementModule } from '../blog-management/blog-management.module';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '/admin/blog' },
            { path: 'blog', loadChildren: () => BlogManagementModule }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
