import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blogs: any[] = [];
  pageIndex = 1;
  pageSize = 6;
  totalBlogs = 0;

  constructor(
    private readonly blogService: BlogService,
  ) {
    // this.blogs = [
    //   {
    //     id: 1,
    //     title: 'Blog Title 1',
    //     image: 'https://via.placeholder.com/150',
    //     description: 'This is a short description of Blog 1.',
    //   },
    //   {
    //     id: 2,
    //     title: 'Blog Title 2',
    //     image: 'https://via.placeholder.com/150',
    //     description: 'This is a short description of Blog 2.',
    //   },
    //   {
    //     id: 3,
    //     title: 'Blog Title 1',
    //     image: 'https://via.placeholder.com/150',
    //     description: 'This is a short description of Blog 1.',
    //   },
    //   {
    //     id: 4,
    //     title: 'Blog Title 2',
    //     image: 'https://via.placeholder.com/150',
    //     description: 'This is a short description of Blog 2.',
    //   },
    // ];
  }

  ngOnInit(): void {
    this.onLoadBlogs();
  }

  onLoadBlogs(): void {
    // Mock data for blogs
    this.blogService.getBlogView(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        if (res.data.blogs.length > 0) {
          this.blogs.push(...res.data.blogs)
        }
        console.log(this.blogs)
        this.totalBlogs = res.data.total || 0
      }
      , error: (err) => {
        console.log('onload blogs are error')
      }
    })
    this.totalBlogs = this.blogs.length;
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.onLoadBlogs();
  }
}
