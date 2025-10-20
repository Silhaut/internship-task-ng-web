import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../_services/users';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '../../_dto/user.dto';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzTagModule,
    NzCardModule,
    NzDescriptionsModule,
  ],
  templateUrl: './user-view.html',
  styleUrl: './user-view.scss'
})
export class UserView implements OnInit {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);

  userId!: string;
  user!: UserDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUser()
    })
  }

  loadUser() {
    this.usersService.getUser(this.userId).subscribe(result => {
      this.user = result;
    });
  }
}
