import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { Blog } from '../../../../models/blog.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {

  pagination = {
    page: 1,
    limit: 10
  }

  blogList: Blog[] = []
  total = 0
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {
    this.route.queryParams.subscribe(params => {
      this.pagination.page = Number(params['page']);
      if (!this.pagination.page) this.pagination.page = 1
      this.onLoadBlogList()
    });
  }

  ngOnInit(): void {
    // this.onLoadBlogList()
  }

  isLoadingBlogList = false
  onLoadBlogList() {
    this.isLoadingBlogList = true
    this.blogService.getBlogListByAdmin(this.pagination.page, this.pagination.limit).subscribe({
      next: (res) => {
        console.log('list', res)
        this.blogList = res.data.blogs || []
        this.total = res.data.total || 0
        this.isLoadingBlogList = false
      }, error: (err) => {
        console.log('err', err)
        this.isLoadingBlogList = false
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.router.navigate(['/admin'], {
      queryParamsHandling: 'merge',
      queryParams: {
        page: params.pageIndex,
      },
    })
  }

  create() {
    return this.router.navigate(['/admin/blog/create'])
  }

  open(blogId: string) {
    return this.router.navigate([`/admin/blog/${blogId}`])
  }
}
