import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list.interface';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  item: List = {
    name: '',
    description: '',
  };

  public productForm = this.formBuilder.group({
    name: '',
    description: '',
  });

  constructor(
    private router: Router,
    private listService: ListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createItem(): void {
    this.listService.newItem(this.item).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }

  readonly customPageActions = [
    {
      index: 0,
      label: 'Criar',
      action: this.createItem.bind(this),
    },
    {
      index: 1,
      label: 'Cancelar',
      action: this.cancel.bind(this),
    },
  ];
}
