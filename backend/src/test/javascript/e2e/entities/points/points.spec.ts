import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PointsComponentsPage from './points.page-object';
import PointsUpdatePage from './points-update.page-object';
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

describe('Points e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pointsComponentsPage: PointsComponentsPage;
  let pointsUpdatePage: PointsUpdatePage;

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
    pointsComponentsPage = new PointsComponentsPage();
    pointsComponentsPage = await pointsComponentsPage.goToPage(navBarPage);
  });

  it('should load Points', async () => {
    expect(await pointsComponentsPage.title.getText()).to.match(/Points/);
    expect(await pointsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Points', async () => {
    const beforeRecordsCount = (await isVisible(pointsComponentsPage.noRecords)) ? 0 : await getRecordsCount(pointsComponentsPage.table);
    pointsUpdatePage = await pointsComponentsPage.goToCreatePoints();
    await pointsUpdatePage.enterData();

    expect(await pointsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(pointsComponentsPage.table);
    await waitUntilCount(pointsComponentsPage.records, beforeRecordsCount + 1);
    expect(await pointsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await pointsComponentsPage.deletePoints();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(pointsComponentsPage.records, beforeRecordsCount);
      expect(await pointsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(pointsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
