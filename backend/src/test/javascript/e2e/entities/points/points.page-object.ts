import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PointsUpdatePage from './points-update.page-object';

const expect = chai.expect;
export class PointsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('healthPointsApp.points.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-points'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PointsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('points-heading'));
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
    await navBarPage.getEntityPage('points');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePoints() {
    await this.createButton.click();
    return new PointsUpdatePage();
  }

  async deletePoints() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const pointsDeleteDialog = new PointsDeleteDialog();
    await waitUntilDisplayed(pointsDeleteDialog.deleteModal);
    expect(await pointsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/healthPointsApp.points.delete.question/);
    await pointsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pointsDeleteDialog.deleteModal);

    expect(await isVisible(pointsDeleteDialog.deleteModal)).to.be.false;
  }
}
