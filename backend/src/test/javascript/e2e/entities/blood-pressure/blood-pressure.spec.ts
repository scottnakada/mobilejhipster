import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BloodPressureComponentsPage from './blood-pressure.page-object';
import BloodPressureUpdatePage from './blood-pressure-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('BloodPressure e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bloodPressureComponentsPage: BloodPressureComponentsPage;
  let bloodPressureUpdatePage: BloodPressureUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    bloodPressureComponentsPage = new BloodPressureComponentsPage();
    bloodPressureComponentsPage = await bloodPressureComponentsPage.goToPage(navBarPage);
  });

  it('should load BloodPressures', async () => {
    expect(await bloodPressureComponentsPage.title.getText()).to.match(/Blood Pressures/);
    expect(await bloodPressureComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BloodPressures', async () => {
    const beforeRecordsCount = (await isVisible(bloodPressureComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bloodPressureComponentsPage.table);
    bloodPressureUpdatePage = await bloodPressureComponentsPage.goToCreateBloodPressure();
    await bloodPressureUpdatePage.enterData();

    expect(await bloodPressureComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bloodPressureComponentsPage.table);
    await waitUntilCount(bloodPressureComponentsPage.records, beforeRecordsCount + 1);
    expect(await bloodPressureComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bloodPressureComponentsPage.deleteBloodPressure();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bloodPressureComponentsPage.records, beforeRecordsCount);
      expect(await bloodPressureComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bloodPressureComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
