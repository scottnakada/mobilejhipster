import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PreferencesUpdatePage from './preferences-update.page-object';

const expect = chai.expect;
export class PreferencesDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('healthPointsApp.preferences.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-preferences'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PreferencesComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('preferences-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('preferences');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePreferences() {
    await this.createButton.click();
    return new PreferencesUpdatePage();
  }

  async deletePreferences() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const preferencesDeleteDialog = new PreferencesDeleteDialog();
    await waitUntilDisplayed(preferencesDeleteDialog.deleteModal);
    expect(await preferencesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/healthPointsApp.preferences.delete.question/);
    await preferencesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(preferencesDeleteDialog.deleteModal);

    expect(await isVisible(preferencesDeleteDialog.deleteModal)).to.be.false;
  }
}
