import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PreferencesComponentsPage from './preferences.page-object';
import PreferencesUpdatePage from './preferences-update.page-object';
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

describe('Preferences e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let preferencesComponentsPage: PreferencesComponentsPage;
  let preferencesUpdatePage: PreferencesUpdatePage;

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
    preferencesComponentsPage = new PreferencesComponentsPage();
    preferencesComponentsPage = await preferencesComponentsPage.goToPage(navBarPage);
  });

  it('should load Preferences', async () => {
    expect(await preferencesComponentsPage.title.getText()).to.match(/Preferences/);
    expect(await preferencesComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Preferences', async () => {
    const beforeRecordsCount = (await isVisible(preferencesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(preferencesComponentsPage.table);
    preferencesUpdatePage = await preferencesComponentsPage.goToCreatePreferences();
    await preferencesUpdatePage.enterData();

    expect(await preferencesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(preferencesComponentsPage.table);
    await waitUntilCount(preferencesComponentsPage.records, beforeRecordsCount + 1);
    expect(await preferencesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await preferencesComponentsPage.deletePreferences();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(preferencesComponentsPage.records, beforeRecordsCount);
      expect(await preferencesComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(preferencesComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
