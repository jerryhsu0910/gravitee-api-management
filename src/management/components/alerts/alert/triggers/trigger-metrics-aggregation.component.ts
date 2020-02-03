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

import _ = require('lodash');
import {Rule} from '../../../../../entities/alerts/rule.metrics';
import {AggregationCondition} from '../../../../../entities/alert';

const AlertTriggerMetricsAggregationComponent: ng.IComponentOptions = {
  bindings: {
    alert: '<'
  },
  require: {
    parent: '^alertComponent'
  },
  template: require('./trigger-metrics-aggregation.html'),
  controller: function() {
    'ngInject';

    this.$onInit = () => {
      this.metrics = Rule.findByScopeAndType(this.alert.reference_type, this.alert.type).metrics;
      this.operators = AggregationCondition.OPERATORS;
      this.functions = AggregationCondition.FUNCTIONS;

      // New alert, initialize it with the condition model
      if (this.alert.id === undefined) {
        this.alert.conditions = [{
          'function': 'avg',
          'property': this.metrics[0].key,
          'operator': 'GT',
          'type': 'AGGREGATION'
        }];

        this.alert.dampening = {
          'mode': 'strict_count',
          'trueEvaluations': 1,
          'totalEvaluations': 1
        };
      }
    };
  }
};

export default AlertTriggerMetricsAggregationComponent;
