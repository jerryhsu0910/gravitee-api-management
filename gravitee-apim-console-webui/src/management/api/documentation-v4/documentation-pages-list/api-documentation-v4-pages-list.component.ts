/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Page } from '../../../../entities/management-api-v2/documentation/page';

@Component({
  selector: 'api-documentation-v4-pages-list',
  template: require('./api-documentation-v4-pages-list.component.html'),
  styles: [require('./api-documentation-v4-pages-list.component.scss')],
})
export class ApiDocumentationV4PagesListComponent implements OnChanges {
  @Input()
  pages: Page[];

  @Output()
  onAddPage = new EventEmitter<void>();

  @Output()
  onEditPage = new EventEmitter<Page>();

  @Output()
  onDeletePage = new EventEmitter<Page>();

  @Output()
  onGoToFolder = new EventEmitter<string>();

  public displayedColumns = ['name', 'status', 'visibility', 'lastUpdated', 'order', 'actions'];
  public dataSource: MatTableDataSource<Page>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pages) {
      this.dataSource = new MatTableDataSource<Page>(this.pages);
    }
  }
}