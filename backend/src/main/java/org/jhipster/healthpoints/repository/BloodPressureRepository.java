package org.jhipster.healthpoints.repository;

import org.jhipster.healthpoints.domain.BloodPressure;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the BloodPressure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {

    @Query("select bloodPressure from BloodPressure bloodPressure where bloodPressure.user.login = ?#{principal.username}")
    List<BloodPressure> findByUserIsCurrentUser();
}
