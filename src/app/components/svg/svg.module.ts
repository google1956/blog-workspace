import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextIconComponent } from './text/text.component';
import { AntdModule } from '../../modules/antd.module';

@NgModule({
    declarations: [
        TextIconComponent,
        // MapIconComponent,
        // CalendarIconComponent,
        // WebsiteIconComponent,
    ],
    imports: [
        AntdModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        // LocationIconComponent,
        TextIconComponent,
        // MapIconComponent,
        // CalendarIconComponent,
        // WebsiteIconComponent,
    ]
})
export class SvgModule { }
