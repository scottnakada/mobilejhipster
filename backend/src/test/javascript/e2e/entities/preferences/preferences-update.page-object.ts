import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PreferencesUpdatePage {
  pageTitle: ElementFinder = element(by.id('healthPointsApp.preferences.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  weeklyGoalInput: ElementFinder = element(by.css('input#preferences-weeklyGoal'));
  weightUnitsSelect: ElementFinder = element(by.css('select#preferences-weightUnits'));
  userSelect: ElementFinder = element(by.css('select#preferences-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWeeklyGoalInput(weeklyGoal) {
    await this.weeklyGoalInput.sendKeys(weeklyGoal);
  }

  async getWeeklyGoalInput() {
    return this.weeklyGoalInput.getAttribute('value');
  }

  async setWeightUnitsSelect(weightUnits) {
    await this.weightUnitsSelect.sendKeys(weightUnits);
  }

  async getWeightUnitsSelect() {
    return this.weightUnitsSelect.element(by.css('option:checked')).getText();
  }

  async weightUnitsSelectLastOption() {
    await this.weightUnitsSelect.all(by.tagName('option')).last().click();
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
    await this.setWeeklyGoalInput('5');
    expect(await this.getWeeklyGoalInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.weightUnitsSelectLastOption();
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
