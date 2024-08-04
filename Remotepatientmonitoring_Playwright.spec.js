import { test, expect } from '@playwright/test';

test("Handle revenue calculator", async ({ page }) => {
    //Navigate to the FitPeo Homepage:
    await page.goto('https://www.fitpeo.com/');

    //Navigate to the Revenue Calculator Page:
    await page.goto('https://fitpeo.com/revenue-calculator');
    await page.waitForTimeout(2000);

    //Scroll Down to the Slider section:
    var eligiblePatientTxtField = await page.locator("//input[@id=':R57alklff9da:']");
    await eligiblePatientTxtField.scrollIntoViewIfNeeded();

    //Adjust the Slider
    var slider = await page.locator('(//span[@class="MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-duk49p"]//span)[3]');
    
    await page.waitForTimeout(2000);
    await slider.click();
    for(let i=1; i<=624; i++) {
        await page.keyboard.press('ArrowRight')[i];
        await page.waitForTimeout(100);
    }
        await page.waitForTimeout(2000);
   
    //Update the Text Field:
    //Validate Slider Value:
    eligiblePatientTxtField.clear()
    eligiblePatientTxtField.fill('560')
    await page.waitForTimeout(2000); 
    var slider = await page.locator('(//span[@class="MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeMedium css-duk49p"]//span)[3]');
    await slider.click();
    for(let i=1; i<=264; i++) {
        await page.keyboard.press('ArrowRight')[i];
        await page.waitForTimeout(100);
    }
  
    //Select CPT Codes:
    var checkBoxes = await page.$$('//input[@class="PrivateSwitchBase-input css-1m9pwf3"]');
    for(let i=0; i<=checkBoxes.length-10;i++) {
        await checkBoxes[i].click();
        await page.waitForTimeout(2000);
    }

    await page.locator('(//input[@class="PrivateSwitchBase-input css-1m9pwf3"])[8]').check();

    //Validate Total Recurring Reimbursement:
    var total = await page.locator('(//p[@class="MuiTypography-root MuiTypography-body1 inter css-12bch19"])[3]').textContent();
    console.log(total);
    //Verify that the header displaying Total Recurring Reimbursement for all Patients Per Month: shows the value $110700
    await expect(await total).toEqual("$110700");
 })
