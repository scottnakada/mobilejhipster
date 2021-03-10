import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WeightComponentsPage from './weight.page-object';
import WeightUpdatePage from './weight-update.page-object';
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

describe('Weight e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let weightComponentsPage: WeightComponentsPage;
  let weightUpdatePage: WeightUpdatePage;

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
    weightComponentsPage = new WeightComponentsPage();
    weightComponentsPage = await weightComponentsPage.goToPage(navBarPage);
  });

  it('should load Weights', async () => {
    expect(await weightComponentsPage.title.getText()).to.match(/Weights/);
    expect(await weightComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Weights', async () => {
    const beforeRecordsCount = (await isVisible(weightComponentsPage.noRecords)) ? 0 : await getRecordsCount(weightComponentsPage.table);
    weightUpdatePage = await weightComponentsPage.goToCreateWeight();
    await weightUpdatePage.enterData();

    expect(await weightComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(weightComponentsPage.table);
    await waitUntilCount(weightComponentsPage.records, beforeRecordsCount + 1);
    expect(await weightComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await weightComponentsPage.deleteWeight();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(weightComponentsPage.records, beforeRecordsCount);
      expect(await weightComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(weightComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
