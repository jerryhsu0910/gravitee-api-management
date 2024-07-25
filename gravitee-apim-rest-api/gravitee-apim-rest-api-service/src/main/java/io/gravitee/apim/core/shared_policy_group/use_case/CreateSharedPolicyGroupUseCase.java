/*
 * Copyright © 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.apim.core.shared_policy_group.use_case;

import io.gravitee.apim.core.DomainService;
import io.gravitee.apim.core.audit.domain_service.AuditDomainService;
import io.gravitee.apim.core.audit.model.AuditInfo;
import io.gravitee.apim.core.audit.model.AuditProperties;
import io.gravitee.apim.core.audit.model.EnvironmentAuditLogEntity;
import io.gravitee.apim.core.shared_policy_group.crud_service.SharedPolicyGroupCrudService;
import io.gravitee.apim.core.shared_policy_group.model.CreateSharedPolicyGroup;
import io.gravitee.apim.core.shared_policy_group.model.SharedPolicyGroup;
import io.gravitee.apim.core.shared_policy_group.model.SharedPolicyGroupAuditEvent;
import io.gravitee.common.utils.TimeProvider;
import io.gravitee.rest.api.service.common.UuidString;
import io.gravitee.rest.api.service.exceptions.InvalidDataException;
import java.util.Map;
import lombok.Builder;

@DomainService
public class CreateSharedPolicyGroupUseCase {

    private final SharedPolicyGroupCrudService sharedPolicyGroupCrudService;
    private final AuditDomainService auditService;

    public CreateSharedPolicyGroupUseCase(
        SharedPolicyGroupCrudService sharedPolicyGroupCrudService,
        AuditDomainService auditDomainService
    ) {
        this.sharedPolicyGroupCrudService = sharedPolicyGroupCrudService;
        this.auditService = auditDomainService;
    }

    public Output execute(Input input) {
        validateCreateSharedPolicyGroup(input.sharedPolicyGroupToCreate());

        var cratedsharedPolicyGroup =
            this.sharedPolicyGroupCrudService.create(
                    SharedPolicyGroup
                        .from(input.sharedPolicyGroupToCreate())
                        .toBuilder()
                        .id(UuidString.generateRandom())
                        .createdAt(TimeProvider.now())
                        .lifecycleState(SharedPolicyGroup.SharedPolicyGroupLifecycleState.UNDEPLOYED)
                        .build()
                );
        createAuditLog(cratedsharedPolicyGroup, input.auditInfo());
        return new Output(cratedsharedPolicyGroup);
    }

    @Builder
    public record Input(CreateSharedPolicyGroup sharedPolicyGroupToCreate, AuditInfo auditInfo) {}

    public record Output(SharedPolicyGroup sharedPolicyGroup) {}

    private static void validateCreateSharedPolicyGroup(CreateSharedPolicyGroup sharedPolicyGroupToCreate) {
        if (sharedPolicyGroupToCreate.getName() == null || sharedPolicyGroupToCreate.getName().isEmpty()) {
            throw new InvalidDataException("Name is required.");
        }
        if (sharedPolicyGroupToCreate.getApiType() == null) {
            throw new InvalidDataException("ApiType is required.");
        }
        if (sharedPolicyGroupToCreate.getPhase() == null) {
            throw new InvalidDataException("Phase is required.");
        }
    }

    private void createAuditLog(SharedPolicyGroup sharedPolicyGroup, AuditInfo auditInfo) {
        auditService.createEnvironmentAuditLog(
            EnvironmentAuditLogEntity
                .builder()
                .organizationId(auditInfo.organizationId())
                .environmentId(auditInfo.environmentId())
                .event(SharedPolicyGroupAuditEvent.SHARED_POLICY_GROUP_CREATED)
                .actor(auditInfo.actor())
                .newValue(sharedPolicyGroup)
                .createdAt(sharedPolicyGroup.getCreatedAt())
                .properties(Map.of(AuditProperties.SHARED_POLICY_GROUP, sharedPolicyGroup.getId()))
                .build()
        );
    }
}