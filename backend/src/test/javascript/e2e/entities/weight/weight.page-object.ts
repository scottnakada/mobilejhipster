import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WeightUpdatePage from './weight-update.page-object';

const expect = chai.expect;
export class WeightDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('healthPointsApp.weight.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-weight'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WeightComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('weight-heading'));
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
    await navBarPage.getEntityPage('weight');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWeight() {
    await this.createButton.click();
    return new WeightUpdatePage();
  }

  async deleteWeight() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const weightDeleteDialog = new WeightDeleteDialog();
    await waitUntilDisplayed(weightDeleteDialog.deleteModal);
    expect(await weightDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/healthPointsApp.weight.delete.question/);
    await weightDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(weightDeleteDialog.deleteModal);

    expect(await isVisible(weightDeleteDialog.deleteModal)).to.be.false;
  }
}
