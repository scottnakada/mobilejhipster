package org.jhipster.mobilejhipster;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("org.jhipster.mobilejhipster");

        noClasses()
            .that()
                .resideInAnyPackage("org.jhipster.mobilejhipster.service..")
            .or()
                .resideInAnyPackage("org.jhipster.mobilejhipster.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..org.jhipster.mobilejhipster.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
