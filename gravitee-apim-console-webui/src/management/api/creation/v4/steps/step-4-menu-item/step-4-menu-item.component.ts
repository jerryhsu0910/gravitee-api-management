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
import { Component, Inject, OnInit } from '@angular/core';

import { MENU_ITEM_PAYLOAD } from '../../components/api-creation-stepper-menu/api-creation-stepper-menu.component';
import { ApiCreationPayload } from '../../models/ApiCreationPayload';
import { PlanFormType } from '../../../../../../services-ngx/constants.service';

interface MenuItemVM {
  name: string;
  type: PlanFormType;
}

@Component({
  selector: 'step-4-menu-item',
  template: require('./step-4-menu-item.component.html'),
  styles: [require('./step-4-menu-item.component.scss')],
})
export class Step4MenuItemComponent implements OnInit {
  public menuItems: MenuItemVM[];

  constructor(@Inject(MENU_ITEM_PAYLOAD) private readonly menuItemPayload: ApiCreationPayload) {}

  ngOnInit(): void {
    this.menuItems = this.menuItemPayload?.plans?.map((plan) => ({
      name: plan.name,
      type: plan.mode === 'PUSH' ? 'PUSH' : plan.security.type,
    }));
  }
}
