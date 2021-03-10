import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BloodPressureUpdatePage {
  pageTitle: ElementFinder = element(by.id('healthPointsApp.bloodPressure.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  timestampInput: ElementFinder = element(by.css('input#blood-pressure-timestamp'));
  systolicInput: ElementFinder = element(by.css('input#blood-pressure-systolic'));
  diastolicInput: ElementFinder = element(by.css('input#blood-pressure-diastolic'));
  userSelect: ElementFinder = element(by.css('select#blood-pressure-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return this.timestampInput.getAttribute('value');
  }

  async setSystolicInput(systolic) {
    await this.systolicInput.sendKeys(systolic);
  }

  async getSystolicInput() {
    return this.systolicInput.getAttribute('value');
  }

  async setDiastolicInput(diastolic) {
    await this.diastolicInput.sendKeys(diastolic);
  }

  async getDiastolicInput() {
    return this.diastolicInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getTimestampInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setSystolicInput('5');
    expect(await this.getSystolicInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDiastolicInput('5');
    expect(await this.getDiastolicInput()).to.eq('5');
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
