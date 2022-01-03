const Page = require('../lib/base_page');

class PricingCalculatorPage extends Page {
  get searchField() {
    return $('.devsite-search-field');
  }
  get searchResultPricingCalculator() {
    return $(
      '//div[@class="gs-title"]//*[text()="Google Cloud Platform Pricing Calculator"]'
    );
  }
  get numberOfInstancesLocator() {
    return $('//input[@id="input_75"]');
  }
  get instanceSeriesDropdown() {
    return $('//*[@id="select_value_label_70"]/span[@class="md-select-icon"]');
  }
  get instanceMachineTypeDropdown() {
    return $('//*[@id="select_value_label_71"]/span[@class="md-select-icon"]');
  }
  get checkboxAddGPUs() {
    return $('(//div[@class="md-container md-ink-ripple"])[2]');
  }
  get gpuTypeDropdown() {
    return $('//*[@id="select_451"]');
  }
  get numberOfGPUsDropdown() {
    return $('//*[@id="select_value_label_450"]/span[@class="md-select-icon"]');
  }
  get localSSDDropdown() {
    return $('//*[@id="select_value_label_412"]/span[@class="md-select-icon"]');
  }
  get datacenterLocationDropdown() {
    return $('//*[@id="select_value_label_73"]/span[@class="md-select-icon"]');
  }
  get commitedUsageDropdown() {
    return $('//*[@id="select_value_label_74"]/span[@class="md-select-icon"]');
  }
  get addToEstimateBtn() {
    return $(
      '//form[contains(@class, "ng-scope ng-valid-min ng-valid-max ng-dirty")]//button[@aria-label="Add to Estimate"]'
    );
  }
  get emailAdressInput() {
    return $('//input[@id="input_529"]');
  }
  get cookiesWindow() {
    return $('//button[@class="devsite-snackbar-action"]');
  }
  get actualVMClass() {
    return $('//md-list-item/div[contains(text(), "VM class")]');
  }
  get actualInstanceType() {
    return $('//md-list-item/div[contains(text(), "Instance type")]');
  }
  get actualRegion() {
    return $('//md-list-item/div[contains(text(), "Region")]');
  }
  get actualLocalSSD() {
    return $('//md-list-item/div[contains(text(), "Local SSD")]');
  }
  get actualCommitmentTerm() {
    return $('//md-list-item/div[contains(text(), "Commitment term")]');
  }
  get actualEstimatedCost() {
    return $('//h2[@class="md-title"]//b[@class="ng-binding"]');
  }
  get emailEstimateBtn() {
    return $('#email_quote');
  }
  get sendEmailBtn() {
    return $('//button[contains(text(), "Send Email")]');
  }
  async open() {
    await super.open('https://cloud.google.com/');
  }
  async enterSearchQuery(searchQuery) {
    await this.write(this.searchField, searchQuery);
    await browser.keys(['Enter']);
  }
  async choosePricingCalculator() {
    await this.searchResultPricingCalculator.click();
  }
  async confirmCookies() {
    await this.cookiesWindow.waitForClickable();
    await this.cookiesWindow.click();
  }
  async switchToIFrame() {
    const frame1 = await browser.$('#cloud-site > devsite-iframe > iframe');
    await browser.switchToFrame(frame1);
    const frame2 = await browser.$('#myFrame');
    await browser.switchToFrame(frame2);
  }
  async enterNumberOfInstances(numberOfInstances) {
    await this.numberOfInstancesLocator.waitForExist();
    await this.numberOfInstancesLocator.click();
    await this.write(this.numberOfInstancesLocator, numberOfInstances);
  }
  async selectInstanceSeries(instanceSeries) {
    await this.instanceSeriesDropdown.click();
    await browser.$(
        `//md-option[contains(@id, "select_option")]/div[contains(text(), '${instanceSeries}')]`).waitForExist();
    await browser.$(
        `//md-option[contains(@id, "select_option")]/div[contains(text(), '${instanceSeries}')]`).click();
  }
  async selectInstanceMachineType(instanceMachineType) {
    await this.instanceMachineTypeDropdown.click();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${instanceMachineType}")]`
    ).waitForExist();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${instanceMachineType}")]`
    ).click();
  }
  async scrollTo(element) {
    await element.scrollIntoView(false);
  }
  async selectCheckboxAddGPUs() {
    await this.checkboxAddGPUs.click();
  }
  async selectGPUType(gpuType) {
    await this.gpuTypeDropdown.click();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${gpuType}")]`
    ).waitForExist();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${gpuType}")]`
    ).click();
  }
  async selectNumberOfGPUs(numberOfGPUs) {
    await this.numberOfGPUsDropdown.click();
    await browser.$(
      `//md-option[contains(@id, "select_option_46")]/div[contains(text(), "${numberOfGPUs}")]`).waitForExist();
    await browser.$(
      `//md-option[contains(@id, "select_option_46")]/div[contains(text(), "${numberOfGPUs}")]`).click();
  }
  async selectLocalSSD(localSSD) {
    await this.localSSDDropdown.click();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${localSSD}")]`
    ).waitForExist();
    await browser.$(
      `//md-option[contains(@id, "select_option")]/div[contains(text(), "${localSSD}")]`
    ).click();
  }
  async selectDatacenterLocation(datacenterLocation) {
    await this.datacenterLocationDropdown.click();
    await browser.$(`//div[@id="select_container_109"]//div[contains(text(), "${datacenterLocation}")]`
    ).waitForExist();
    await browser.$(`//div[@id="select_container_109"]//div[contains(text(), "${datacenterLocation}")]`
    ).click();
  }
  async selectCommitedUsage(commitedUsage) {
    await this.commitedUsageDropdown.click();
    await browser.$(
      `//md-option[contains(@id, "select_option_11")]/div[contains(text(), "${commitedUsage}")]`
    ).waitForExist();
    await browser.$(
      `//md-option[contains(@id, "select_option_11")]/div[contains(text(), "${commitedUsage}")]`
    ).click();
  }
  async clickAddToEstimateBtn() {
    await this.addToEstimateBtn.click();
  }
  async getActualVMClass() {
    return await this.actualVMClass.getText();
  }
  async getActualInstanceType() {
    return await this.actualInstanceType.getText();
  }
  async getActualRegion() {
    return await this.actualRegion.getText();
  }
  async getActualLocalSSD() {
    return await this.actualLocalSSD.getText();
  }
  async getActualCommitmentTerm() {
    return await this.actualCommitmentTerm.getText();
  }
  async getActualEstimatedCost() {
    return await this.actualEstimatedCost.getText();
  }
  async switchToNewTab() {
    await browser.newWindow('https://yopmail.com/', { windowName: 'yopmail'});
  }
  async clickEmailEstimateBtn() {
    await this.emailEstimateBtn.click();
  }
  async enterEmailAdress(email) {
    await this.emailAdressInput.waitForExist();
    await this.write(this.emailAdressInput, email);
  }
  async sendEmail() {
    await this.sendEmailBtn.click();
  }
}
module.exports = PricingCalculatorPage;
