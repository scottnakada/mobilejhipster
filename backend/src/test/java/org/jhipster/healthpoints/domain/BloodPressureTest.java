package org.jhipster.healthpoints.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.healthpoints.web.rest.TestUtil;

public class BloodPressureTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BloodPressure.class);
        BloodPressure bloodPressure1 = new BloodPressure();
        bloodPressure1.setId(1L);
        BloodPressure bloodPressure2 = new BloodPressure();
        bloodPressure2.setId(bloodPressure1.getId());
        assertThat(bloodPressure1).isEqualTo(bloodPressure2);
        bloodPressure2.setId(2L);
        assertThat(bloodPressure1).isNotEqualTo(bloodPressure2);
        bloodPressure1.setId(null);
        assertThat(bloodPressure1).isNotEqualTo(bloodPressure2);
    }
}
