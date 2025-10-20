import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionsService } from '../../_services/professions';
import { ProfessionDto } from '../../_dto/profession.dto';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UpdateProfessionDialog } from '../../_components/update-profession-dialog/update-profession-dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzTagModule,
    NzCardModule,
    NzDescriptionsModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './profession-view.html',
  styleUrl: './profession-view.scss'
})
export class ProfessionView implements OnInit {
  private professionsService = inject(ProfessionsService);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  professionId!: string;
  profession!: ProfessionDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.professionId = params['id'];
      this.loadUser()
    })
  }

  loadUser() {
    this.professionsService.getProfession(this.professionId).subscribe(result => {
      this.profession = result;
    });
  }

  updateProfession() {
    const dialogRef = this.modal.create({
      nzTitle: 'Обновление профессии',
      nzContent: UpdateProfessionDialog,
      nzWidth: 700,
      nzData: {
        profession: this.profession
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        this.professionsService.update(this.professionId, dto)
          .subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Профессия успешно обновлена`)
                this.loadUser()
              }
            },
            error: (err) => {
              this.message.error(`Проищошла ошибка при обновлении профессии:`, err.message)
            }
          })
      }
    })
  }
}
