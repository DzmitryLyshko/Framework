expect = require('chai').expect;
const yargs = require('yargs').argv;

const PricingCalculatorPage = require('../../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
const YopmailPage = require('../../lib/yopmail_page');
const yopmailPage = new YopmailPage();
const instance = require('../../config/instance');

describe('pricing calculator page scenarios', function () {
  const searchQuery = 'Google Cloud Platform Pricing Calculator';
  let emailAdress;
  let savedRecievedBill;
  let savedActualEstimatedCost;
  const regexpGetPriceInDollarsFromText = /\bUSD\s\d*\,\d*\.\d*/;

  before(async function () {
    await pricingCalculatorPage.open();
    await pricingCalculatorPage.maximizeWindow();
    await pricingCalculatorPage.enterSearchQuery(searchQuery);
    await pricingCalculatorPage.choosePricingCalculator();
    await pricingCalculatorPage.confirmCookies();
    await pricingCalculatorPage.switchToIFrame();
    await pricingCalculatorPage.enterNumberOfInstances(instance.numberOfInstances);
    await pricingCalculatorPage.selectInstanceSeries(instance.instanceSeries);
    await pricingCalculatorPage.selectInstanceMachineType(instance.instanceMachineType);
    await pricingCalculatorPage.scrollTo(
      pricingCalculatorPage.addToEstimateBtn
    );
    await pricingCalculatorPage.selectCheckboxAddGPUs();
    await pricingCalculatorPage.scrollTo(
      pricingCalculatorPage.addToEstimateBtn
    );
    await pricingCalculatorPage.selectGPUType(instance.gpuType);
    await pricingCalculatorPage.selectNumberOfGPUs(instance.numberOfGPUs);
    await pricingCalculatorPage.selectLocalSSD(instance.localSSD);
    await pricingCalculatorPage.selectDatacenterLocation(instance.datacenterLocation);
    await pricingCalculatorPage.selectCommitedUsage(instance.commitedUsage);
    await pricingCalculatorPage.clickAddToEstimateBtn();
    savedActualEstimatedCost =
      await pricingCalculatorPage.getActualEstimatedCost();
    await pricingCalculatorPage.switchToNewTab();
    await yopmailPage.acceptCookies();
    await yopmailPage.generateRandomEmail();
    emailAdress = await yopmailPage.getGeneratedEmail();
    await browser.switchWindow('Google Cloud Pricing Calculator');
    await pricingCalculatorPage.switchToIFrame();
    await pricingCalculatorPage.clickEmailEstimateBtn();
    await pricingCalculatorPage.scrollTo(pricingCalculatorPage.sendEmailBtn);
    await pricingCalculatorPage.enterEmailAdress(emailAdress);
    await pricingCalculatorPage.sendEmail();
    await browser.switchWindow('yopmail');
    await browser.pause(3000);
    await yopmailPage.checkEmail();
    await yopmailPage.switchToMailIFrame();
    savedRecievedBill = await yopmailPage.getRecievedBill();
  });

  it('Verify that Total Estimated Monthly Cost in the letter equals to the cost in the calculator', async function () {
    const estimatedCost = String(savedActualEstimatedCost.match(regexpGetPriceInDollarsFromText));
    const recievedBill = String(savedRecievedBill.match(regexpGetPriceInDollarsFromText));
    expect(estimatedCost).to.equal(recievedBill);
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
