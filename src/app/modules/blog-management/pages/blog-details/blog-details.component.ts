import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BlogService } from '../../../../services/blog.service';
import { Blog } from '../../../../models/blog.model';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  blogId: string = ''
  // blog!: Blog

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
  ) {
    this.blogId = this.route.snapshot.params['id'];
  }

  validateForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    thumbnail_url: [''],
    type: [''],
    category: [''],
    tags: [],
  });

  ngOnInit(): void {
    console.log(this.blogId)
    this.onLoad()
  }

  isLoadingData = false
  isNoData = false
  onLoad() {
    if (this.blogId) {
      this.isLoadingData = true
      forkJoin([
        this.blogService.getBlogById(this.blogId),
        this.blogService.getBlogDetails(this.blogId),
      ]).subscribe({
        next: (res) => {
          console.log('onload', res)
          const blog = res[0].data.blog || undefined
          this.setValueBlogForm(blog)
          const blogDetails = res[1].data.blog_details || undefined
          this.setValueBlogDetails(blogDetails)
          this.isLoadingData = false
        }, error: (err) => {
          console.log(err)
          this.isLoadingData = false
          this.isNoData = true
        }
      })
    }
  }

  setValueBlogForm(blog: Blog) {
    this.validateForm.patchValue({
      title: blog.title,
      description: blog.description,
      thumbnail_url: blog.thumbnail_url,
      type: blog.type,
      category: blog.category,
      tags: blog.tags,
    })
  }

  setValueBlogDetails(value: any) {
    if (value.about.length > 0) {
      value.about.map((ele: any, index: number) => {
        let aboutItem = this.aboutFormGroups.at(index) as FormGroup
        if (aboutItem) {
          aboutItem.patchValue({
            type: ele.type,
            data: ele.data,
          })
        } else {
          this.addFormControlAbout(ele.type, ele)
        }
      })
    }
    this.validateAbout.patchValue({
      about: value.about,
    })
  }

  async save() {
    if (this.validateForm.valid && this.validateAbout.valid) {
      forkJoin([
        this.blogService.updateBlog(this.blogId, this.validateForm.value),
        this.blogService.updateBlogDetails(this.blogId, this.validateAbout.value),
      ]).subscribe({
        next: (res) => {
          const blog = res[0].data.blog || undefined
          this.setValueBlogForm(blog)
          const blogDetails = res[1].data.blog_details || undefined
          this.setValueBlogDetails(blogDetails)
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      Object.values(this.validateAbout.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    if (this.validateForm.valid) {
      console.log('create here')
      let payload = this.validateForm.value
      this.blogService.createBlog(payload).subscribe({
        next: (res) => {
          const blog = res.data.blog || undefined
          if (blog) {
            this.router.navigate([`/admin/blog/${blog._id}`])
          }
        }, error: (err) => {

        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  //UPLOAD thumnail
  url: string = ''
  format: any
  async onUploadBanner(e: any) {
    // const public_url = await this.mediaService.uploadBanner(e, MediaType.IMAGE)
    // if (public_url) {
    //   const resultStatus = await this.onUpdateEventDetails({ bannerUrl: public_url })
    //   if (resultStatus) {
    //     this.url = public_url;
    //   }
    // }
  }

  previewUrl: string[] = [];
  async onUploadAboutItemFile(e: any, index: number, type: any) {
    // const public_url = await this.mediaService.uploadBanner(e, type)
    // if (public_url) {
    //   let aboutArray = this.validateAbout.get('about') as FormArray;
    //   let aboutItem = aboutArray.at(index) as FormGroup
    //   aboutItem.patchValue({
    //     data: public_url
    //   })
    //   this.handleSubmitAbout()
    // }
  }

  //ABOUT
  validateAbout: FormGroup = this.fb.group({
    about: this.fb.array([])
  })

  async onUpdateEventDetails(data: any) {
    // try {
    //   await this.eventDetailApi.updateEventDetail(this.detailsId, data).toPromise();
    //   this.utilService.showSuccess(this.i18nService.getString('updateSuccessful'));
    //   return true;
    // } catch (err) {
    //   this.utilService.showError(this.i18nService.getString('updateFailed'));
    //   return false;
    // }
  }

  async handleSubmitAbout() {
    if (this.validateAbout.valid) {
      const resultStatus = await this.onUpdateEventDetails(this.validateAbout.value)
      // if (resultStatus) {
      //   // this.eventDetails.about = this.validateAbout.value.about
      // }
    } else {
      let about = this.aboutFormGroups
      Object.values(about.controls).map(control => {
        if (control.invalid) {
          let aboutItem = control as FormGroup
          aboutItem.get('data')?.markAsDirty()
          aboutItem.get('data')?.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

  get aboutFormGroups() {
    return this.validateAbout.get('about') as FormArray
  }

  addFormControlAbout(type: string, itemData?: { type: string, data: string, data_en: string }) {
    let aboutArray = this.validateAbout.get('about') as FormArray;
    let length = aboutArray.length
    //create new item in about field
    let newAboutDetail: FormGroup = this.fb.group({
      type: type,
      data: ['', [Validators.required]],
    });
    if (itemData) {
      newAboutDetail.patchValue({
        type: itemData.type,
        data: itemData.data,
      })
    }
    aboutArray.insert(length, newAboutDetail)
  }

  removeFormControlAbout(index: number) {
    let aboutArray = this.validateAbout.get('about') as FormArray;
    // this.modal.confirm({
    //   nzTitle: this.i18nService.getString('confirm'),
    //   nzContent: 'Bạn có chắc chắn muốn xóa không?',
    //   nzOnOk: () => {
    //     aboutArray.removeAt(index);
    //     this.handleSubmitAbout()
    //   },
    // })
  }


  //CDK

  drop(event: CdkDragDrop<string[]>) {
    let aboutArray = this.aboutFormGroups
    const from = event.previousIndex;
    const to = event.currentIndex;
    this.moveItemInFormArray(aboutArray, from, to);
    console.log('agendaItem', this.aboutFormGroups.value)
  }

  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const from = this.clamp(fromIndex, formArray.length - 1);
    const to = this.clamp(toIndex, formArray.length - 1);

    if (from === to) {
      return;
    }

    const previous = formArray.at(from);
    const current = formArray.at(to);
    formArray.setControl(to, previous);
    formArray.setControl(from, current);
  }

  /** Clamps a number between zero and a maximum. */
  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }
  // Check index positon of agenda is changed. Return true if changed
  isChangeIndexAgendaItem(agendaIndex: number): boolean {
    // const agenda = this.agendas.at(agendaIndex)
    // const currentAgendaItems = agenda.agendaItems.reduce((result: string[], item: any) => {
    //   return [...result, item._id as string]
    // }, [])

    // const agendaForm = (this.validateAgendas.get('agendas') as FormArray).at(agendaIndex)
    // const agendaItemsInForm = agendaForm.value.agendaItems.reduce((result: string[], item: any) => {
    //   return [...result, item._id as string]
    // }, [])


    // if (agenda._id === agendaForm.value._id &&
    //   !this.isArrayEqual(currentAgendaItems, agendaItemsInForm)) {
    //   return true
    // }
    return false
  }
  isArrayEqual(arr1: string[], arr2: string[]): boolean {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
  }

  // Check value of agenda item is changed
  isValueAgendaItemChanged(i: number, j: number): boolean {
    // const agendaForm = (this.validateAgendas.get('agendas') as FormArray).at(i)
    // const agendaItemForm = (agendaForm.get('agendaItems') as FormArray).at(j)
    // const agendaItem = this.listOfAllAgendaItem.find(item => item._id === agendaItemForm.value._id)
    // if (!agendaItem) return false;
    // if (JSON.stringify(agendaItemForm.value) !== JSON.stringify(agendaItem)) return true
    return true;
  }
}
