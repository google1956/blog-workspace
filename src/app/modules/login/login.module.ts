import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from '../antd.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AntdModule,
        RouterModule,
        ReactiveFormsModule,
        LoginRoutingModule,
    ]
})
export class LoginModule { }
